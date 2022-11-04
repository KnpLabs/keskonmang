import { ofType, combineEpics } from 'redux-observable'
import { logObservableError } from './../Util'
import {
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators'
import { ifElse, prop } from 'ramda'
import {
  GET_RESTAURANT_DETAILS,
  restaurantDetailsReceived,
} from './../Redux/State/RestaurantDetails'

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
  getRestaurantDetailsEpic,
)
