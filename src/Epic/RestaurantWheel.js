import { ofType, combineEpics } from 'redux-observable'
import {
  getRandomElementFromArray,
  logObservableError,
  logObservableErrorAndTriggerAction,
} from './../Util'
import {
  defaultTo,
  ifElse,
  isEmpty,
  join,
  prop,
  pipe,
} from 'ramda'
import {
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  GET_RESTAURANT,
  RESTAURANT_DETAILS_RECEIVED,
  RESTAURANT_RECEIVED,
  fetchError,
  noRestaurants,
  restaurantDetailsReceived,
  restaurantReceived,
  showRestaurant,
} from './../Redux/State/RestaurantWheel'

// getRestaurantEpic :: Epic -> Observable Action RESTAURANT_RECEIVED
export const getRestaurantEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_RESTAURANT),
    withLatestFrom(state$),
    mergeMap(([ action, state ]) => fetchApi(
      join('', [
        '/restaurants/search',
        `?location=${state.RestaurantWheel.address}`,
        join('', state.RestaurantFilters.cuisineTypes.map(value => `&categories[]=${value}`)),
        join('', state.RestaurantFilters.diets.map(value => `&categories[]=${value}`)),
        join('', state.RestaurantFilters.prices.map(value => `&prices[]=${value}`)),
      ]),
      { method: 'GET' },
    )),
    map(pipe(
      defaultTo([]),
      ifElse(
        isEmpty, 
        noRestaurants,
        pipe(
          getRandomElementFromArray,
          prop('id'),
          restaurantReceived,
        ), 
      )
    )),
    logObservableErrorAndTriggerAction(fetchError),
  )

// getRestaurantDetailsEpic :: Epic -> Observable Action RESTAURANT_DETAILS_RECEIVED
export const getRestaurantDetailsEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(RESTAURANT_RECEIVED),
    mergeMap((action => fetchApi(
      `/restaurants/${action.id}`, 
      { method: 'GET' }
    ))),
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
  getRestaurantEpic,
  getRestaurantDetailsEpic,
  showRestaurantEpic,
)
