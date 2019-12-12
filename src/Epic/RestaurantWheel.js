import { ofType, combineEpics } from 'redux-observable'
import { logObservableError, shuffle } from './../Util'
import {
  complement,
  isNil,
  pipe,
  pathOr,
  values,
  apply,
  join,
  defaultTo,
  head,
} from 'ramda'
import {
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  GET_COORDINATES,
  GET_RESTAURANT,
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
      apply(getRestaurant),
    )),
    logObservableError(),
  )

// getRestaurantEpic :: Epic -> Observable Action GET_RESTAURANT
export const getRestaurantEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_RESTAURANT),
    mergeMap(action => fetchApi(join('', [
        '/venues/search',
        `?latitude=${action.latitude}`,
        `&longitude=${action.longitude}`,
      ]),
      {
        method: 'GET',
      },
    )),
    map(pipe(
      defaultTo([]),
      shuffle,
      head,
      restaurantReceived,
    )),
    logObservableError(),
  )
  export default combineEpics(
    getCoordinatesEpic,
    getRestaurantEpic,
  )
