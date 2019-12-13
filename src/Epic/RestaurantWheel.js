import { ofType, combineEpics } from 'redux-observable'
import { logObservableError, getRandomElementFromArray } from './../Util'
import {
  complement,
  isNil,
  pipe,
  pathOr,
  values,
  apply,
  join,
  defaultTo,
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
  coordinatesReceived,
  getRestaurant,
  restaurantReceived,
} from './../Redux/State/RestaurantWheel'

// getCoordinatesEpic :: Epic -> Observable Action GET_RESTAURANT
export const getCoordinatesEpic = (action$, state$, { getHerePlatform }) =>
  action$.pipe(
    ofType(GET_COORDINATES),
    map(() => getHerePlatform()),
    filter(complement(isNil)),
    map(platform => platform.getGeocodingService()),
    withLatestFrom(state$),
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
    logObservableError(),
  )

// pipeCoordinatesToRestaurantEpic :: Epic -> Observable Action GET_RESTAURANT
export const pipeCoordinatesToRestaurantEpic = action$ =>
  action$.pipe(
    ofType(COORDINATES_RECEIVED),
    map(getRestaurant),
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
      restaurantReceived,
    )),
    logObservableError(),
  )
  export default combineEpics(
    getCoordinatesEpic,
    pipeCoordinatesToRestaurantEpic,
    getRestaurantEpic,
  )
