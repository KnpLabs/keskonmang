import { ofType, combineEpics } from 'redux-observable'
import { logObservableError } from './../Util'
import {
  map,
  mergeMap,
} from 'rxjs/operators'
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
    mergeMap(({ restaurantId }) => fetchApi(`/restaurants/${restaurantId}`)),
    map(response => restaurantDetailsReceived(response.body)),
    logObservableError(),
  )

export default combineEpics(
  getRestaurantEpic,
  getRestaurantDetailsEpic,
)
