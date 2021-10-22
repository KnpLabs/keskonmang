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
  ignoreElements,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  GET_RESTAURANT,
  RESTAURANT_RECEIVED,
  fetchError,
  noRestaurants,
  restaurantReceived,
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
    )),
    map(pipe(
      response => response.body,
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

// redirectToRestaurantDetailsEpic :: Epic -> Observable Action _
export const redirectToRestaurantDetailsEpic = (action$, state$, { location }) =>
  action$.pipe(
    ofType(RESTAURANT_RECEIVED),
    map(restaurant => location.replace(`/restaurant/${restaurant.id}`)),
    ignoreElements(),
    logObservableError(),
  )

export default combineEpics(
  getRestaurantEpic,
  redirectToRestaurantDetailsEpic,
)
