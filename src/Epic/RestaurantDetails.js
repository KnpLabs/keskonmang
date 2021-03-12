import { ofType, combineEpics } from 'redux-observable'
import { logObservableError } from './../Util'
import {
  map,
  mergeMap,
} from 'rxjs/operators'
import { RESTAURANT_RECEIVED } from './../Redux/State/RestaurantWheel'
import { restaurantDetailsReceived } from './../Redux/State/RestaurantDetails'

// getRestaurantDetailsEpic :: Epic -> Observable Action RESTAURANT_DETAILS_RECEIVED
export const getRestaurantDetailsEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(RESTAURANT_RECEIVED),
    mergeMap((restaurant => fetchApi(`/restaurants/${restaurant.id}`))),
    map(response => restaurantDetailsReceived(response.body)),
    logObservableError(),
  )

export default combineEpics(
  getRestaurantDetailsEpic,
)
