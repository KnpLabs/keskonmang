import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  loading: null,
  address: '',
  fetchError: false,
  noRestaurants: false,
}

// action types
export const HANDLE_ADDRESS = '@knp-keskonmang/RestaurantWheel/HANDLE_ADDRESS'
export const GET_RESTAURANT = '@knp-keskonmang/RestaurantWheel/GET_RESTAURANT'
export const RESTAURANT_RECEIVED = '@knp-keskonmang/RestaurantWheel/RESTAURANT_RECEIVED'
export const FETCH_ERROR = '@knp-keskonmang/RestaurantWheel/FETCH_ERROR'
export const NO_RESTAURANTS = '@knp-keskonmang/RestaurantWheel/NO_RESTAURANTS'

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

// fetchError :: () -> Action
export const fetchError = always({ type: FETCH_ERROR })

// noRestaurants :: () -> Action
export const noRestaurants = always({ type: NO_RESTAURANTS })

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_ADDRESS]: (state, { address }) => ({
    ...state,
    address: address,
  }),

  [GET_RESTAURANT]: state => ({
    ...state,
    loading: true,
    fetchError: false,
    noRestaurants: false,
  }),

  [RESTAURANT_RECEIVED]: state => ({
    ...state,
    loading: false,
  }),

  [FETCH_ERROR]: state => ({
    ...state,
    fetchError: true,
    loading: false,
  }),

  [NO_RESTAURANTS]: state => ({
    ...state,
    loading: false,
    noRestaurants: true,
  }),
})
