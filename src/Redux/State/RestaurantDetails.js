import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  loading: null,
  restaurant: null,
}

// action types
export const GET_RESTAURANT_DETAILS = '@knp-keskonmang/RestaurantWheel/GET_RESTAURANT_DETAILS'
export const RESTAURANT_DETAILS_RECEIVED = '@knp-keskonmang/RestaurantWheel/RESTAURANT_DETAILS_RECEIVED'
export const CLEAR = '@knp-keskonmang/RestaurantWheel/CLEAR'

// getRestaurantDetails :: String -> Action
export const getRestaurantDetails = restaurantId => ({
  type: GET_RESTAURANT_DETAILS,
  restaurantId,
})

// restaurantDetailsReceived :: RestaurantDetails -> Action
export const restaurantDetailsReceived = restaurant => ({
  type: RESTAURANT_DETAILS_RECEIVED,
  restaurant,
})

// clear :: () -> Action
export const clear = always({ type: CLEAR })

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [GET_RESTAURANT_DETAILS]: state => ({
    ...state,
    loading: true,
  }),

  [RESTAURANT_DETAILS_RECEIVED]: (state, { restaurant }) => ({
    ...state,
    loading: false,
    restaurant,
  }),

  [CLEAR]: state => INITIAL_STATE,
})
