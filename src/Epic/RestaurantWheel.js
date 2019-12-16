import { ofType, combineEpics } from 'redux-observable'
import {
  getRandomElementFromArray,
  logObservableError,
  logObservableErrorAndTriggerAction,
} from './../Util'
import {
  apply,
  complement,
  compose,
  defaultTo,
  filter as rfilter,
  ifElse,
  isEmpty,
  isNil,
  join,
  pathOr,
  pick,
  pipe,
  prop,
  values,
} from 'ramda'
import {
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  COORDINATES_RECEIVED,
  GET_COORDINATES,
  GET_RESTAURANT,
  RESTAURANT_DETAILS_RECEIVED,
  RESTAURANT_RECEIVED,
  coordinatesReceived,
  fetchError,
  getRestaurant,
  restaurantDetailsReceived,
  restaurantReceived,
  showRestaurant,
  invalidAddress,
} from './../Redux/State/RestaurantWheel'
import RestaurantMock from './RestaurantMock'

// getCoordinatesEpic :: Epic -> Observable Action GET_RESTAURANT
export const getCoordinatesEpic = (action$, state$, { getHerePlatform }) =>
  action$.pipe(
    ofType(GET_COORDINATES),
    map(() => getHerePlatform()),
    filter(complement(isNil)),
    map(platform => platform.getGeocodingService()),
    withLatestFrom(state$),
    filter(([ _, state ]) => state.RestaurantWheel.address.length > 3),
    mergeMap(([ geoCoder, state ]) => new Promise((resolve, reject) => geoCoder.geocode(
      {
        searchText: state.RestaurantWheel.address
      },
      // geo coding success
      result => resolve(result),
      // geo coding failure
      e => reject(e),
    ))),
    map(pipe(
      pathOr({}, ['Response', 'View', 0, 'Result', 0, 'Location', 'DisplayPosition']),
      values,
      apply(coordinatesReceived),
    )),
    logObservableErrorAndTriggerAction(fetchError),
  )

// containsUndefinedCoordinate :: Coordinates -> Boolean
const hasValidCoordinates = compose(isEmpty, rfilter(isNil), values)

// coordinatesToRestaurantEpic :: Epic -> Observable Action GET_RESTAURANT
export const coordinatesToRestaurantEpic = action$ =>
  action$.pipe(
    ofType(COORDINATES_RECEIVED),
    map(pipe(
      pick(['latitude', 'longitude']),
      ifElse(
        hasValidCoordinates,
        getRestaurant,
        invalidAddress,
      )
    )),
    logObservableError(),
  )

// getRestaurantEpic :: Epic -> Observable Action RESTAURANT_RECEIVED
export const getRestaurantEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_RESTAURANT),
    withLatestFrom(state$),
    mergeMap(([ action, state ]) => fetchApi(join('', [
        '/venues/search',
        `?latitude=${state.RestaurantWheel.latitude}`,
        `&longitude=${state.RestaurantWheel.longitude}`,
      ]),
      {
        method: 'GET',
      },
    )),
    map(pipe(
      defaultTo([]),
      getRandomElementFromArray,
      prop('id'),
      restaurantReceived,
    )),
    logObservableErrorAndTriggerAction(fetchError),
  )

// getRestaurantDetailsEpic :: Epic -> Observable Action RESTAURANT_DETAILS_RECEIVED
export const getRestaurantDetailsEpic = (action$, state$, { fetchApi, premiumEndpointsDisabled = true }) =>
  action$.pipe(
    ofType(RESTAURANT_RECEIVED),
    mergeMap(action => premiumEndpointsDisabled
      ? Promise.resolve(RestaurantMock)
      : fetchApi(`/venues/${action.id}`, { method: 'GET' })
    ),
    map(restaurantDetailsReceived),
    logObservableError(),
  )

// showRestaurantEpic :: Epic -> Observable Action SHOW_RESTAURANT
export const showRestaurantEpic = action$ =>
  action$.pipe(
    ofType(RESTAURANT_DETAILS_RECEIVED),
    map(showRestaurant),
    logObservableError(),
  )

export default combineEpics(
  getCoordinatesEpic,
  coordinatesToRestaurantEpic,
  getRestaurantEpic,
  getRestaurantDetailsEpic,
  showRestaurantEpic,
)
