import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  loading: false,
  address: '',
  restaurant: null,
  restaurantShown: false,
  fetchError: false,
  invalidAddress: false,
}

// action types
export const HANDLE_ADDRESS = '@knp-keskonmang/RestaurantWheel/HANDLE_ADDRESS'
export const GET_RESTAURANT = '@knp-keskonmang/RestaurantWheel/GET_RESTAURANT'
export const RESTAURANT_RECEIVED = '@knp-keskonmang/RestaurantWheel/RESTAURANT_RECEIVED'
export const RESTAURANT_DETAILS_RECEIVED = '@knp-keskonmang/RestaurantWheel/RESTAURANT_DETAILS_RECEIVED'
export const SHOW_RESTAURANT = '@knp-keskonmang/RestaurantWheel/SHOW_RESTAURANT'
export const BACK_TO_SEARCH = '@knp-keskonmang/RestaurantWheel/BACK_TO_SEARCH'
export const FETCH_ERROR = '@knp-keskonmang/RestaurantWheel/FETCH_ERROR'
export const INVALID_ADDRESS = '@knp-keskonmang/RestaurantWheel/INVALID_ADDRESS'

// handleAddress :: String -> Action
export const handleAddress = address => ({
  type: HANDLE_ADDRESS,
  address,
})

// getRestaurant :: () -> Action
export const getRestaurant = always({ type: GET_RESTAURANT })

// restaurantReceived :: String -> Action
export const restaurantReceived = id => ({
  type: RESTAURANT_RECEIVED,
  id,
})

// @type RestaurantDetails = {
//  categories :: [Category],
//  hasPerk :: Boolean,
//  id :: String,
//  location :: Location,
//  name :: String,
//  referralId :: String,
// }
//
// restaurantDetailsReceived :: RestaurantDetails -> Action
export const restaurantDetailsReceived = restaurant => ({
  type: RESTAURANT_DETAILS_RECEIVED,
  restaurant,
})

// showRestaurant :: () -> Action
export const showRestaurant = always({ type: SHOW_RESTAURANT })

// backToSearch :: () -> Action
export const backToSearch = always({ type: BACK_TO_SEARCH })

// fetchError :: () -> Action
export const fetchError = always({ type: FETCH_ERROR })

// invalidAddress :: () -> Action
export const invalidAddress = always({ type: INVALID_ADDRESS })

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_ADDRESS]: (state, { address }) => ({
    ...state,
    address: address,
    invalidAddress: false,
  }),

  [GET_RESTAURANT]: state => ({
    ...state,
    loading: true,
    fetchError: false,
  }),

  [RESTAURANT_DETAILS_RECEIVED]: (state, { restaurant }) => ({
    ...state,
    loading: false,
    restaurant,
  }),

  [SHOW_RESTAURANT]: state => ({
    ...state,
    restaurantShown: true,
  }),

  [BACK_TO_SEARCH]: state => ({
    ...state,
    restaurantShown: false,
  }),

  [FETCH_ERROR]: state => ({
    ...state,
    fetchError: true,
    loading: false,
  }),

  [INVALID_ADDRESS]: state => ({
    ...state,
    invalidAddress: true,
  }),
})
