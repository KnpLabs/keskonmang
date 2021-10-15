import { ofType, combineEpics } from 'redux-observable'
import { logObservableError } from './../Util'
import {
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators'
import { ifElse, prop } from 'ramda'
import { RESTAURANT_RECEIVED } from './../Redux/State/RestaurantWheel'
import {
  GET_RESTAURANT_DETAILS,
  restaurantDetailsReceived,
  getRestaurantDetails
} from './../Redux/State/RestaurantDetails'

// getRestaurantEpic :: Epic -> Observable Action GET_RESTAURANT_DETAILS
export const getRestaurantEpic = (action$, state$) =>
  action$.pipe(
    ofType(RESTAURANT_RECEIVED),
    map(restaurant => getRestaurantDetails(restaurant.id)),
    logObservableError(),
  )

// getRestaurantDetailsEpic :: Epic -> Observable Action RESTAURANT_DETAILS_RECEIVED
export const getRestaurantDetailsEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_RESTAURANT_DETAILS),
    withLatestFrom(state$),
    mergeMap(([{ restaurantId }, state]) => ifElse(
      stateRestaurant => !stateRestaurant || restaurantId !== stateRestaurant.id,
      () => fetchApi(`/restaurants/${restaurantId}`).then(prop('body')),
      stateRestaurant => Promise.resolve(stateRestaurant),
    )(state.RestaurantDetails.restaurant)),
    map(restaurantDetailsReceived),
    logObservableError(),
  )

export default combineEpics(
  getRestaurantEpic,
  getRestaurantDetailsEpic,
)
