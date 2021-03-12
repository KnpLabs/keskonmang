import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  loading: false,
  restaurant: null,
}

// action types
export const GET_RESTAURANT_DETAILS = '@knp-keskonmang/RestaurantWheel/GET_RESTAURANT_DETAILS'
export const RESTAURANT_DETAILS_RECEIVED = '@knp-keskonmang/RestaurantWheel/RESTAURANT_DETAILS_RECEIVED'
export const SHOW_RESTAURANT = '@knp-keskonmang/RestaurantWheel/SHOW_RESTAURANT'
export const REMOVE_RESTAURANT = '@knp-keskonmang/RestaurantWheel/REMOVE_RESTAURANT'

// restaurantDetailsReceived :: RestaurantDetails -> Action
export const restaurantDetailsReceived = restaurant => ({
  type: RESTAURANT_DETAILS_RECEIVED,
  restaurant,
})

// showRestaurant :: () -> Action
export const showRestaurant = always({ type: SHOW_RESTAURANT })

// removeRestaurant :: () -> Action
export const removeRestaurant = always({ type: REMOVE_RESTAURANT })

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

  [REMOVE_RESTAURANT]: state => INITIAL_STATE,
})
