import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  loading: false,
  address: '',
  latitude: 0,
  longitude: 0,
  restaurant: null,
  restaurantShown: false,
}

// action types
export const HANDLE_ADDRESS = '@knp-keskonmange/RestaurantWheel/HANDLE_ADDRESS'
export const GET_COORDINATES = '@knp-keskonmange/RestaurantWheel/GET_COORDINATES'
export const COORDINATES_RECEIVED = '@knp-keskonmange/RestaurantWheel/COORDINATES_RECEIVED'
export const GET_RESTAURANT = '@knp-keskonmange/RestaurantWheel/GET_RESTAURANT'
export const RESTAURANT_RECEIVED = '@knp-keskonmange/RestaurantWheel/RESTAURANT_RECEIVED'
export const RESTAURANT_DETAILS_RECEIVED = '@knp-keskonmange/RestaurantWheel/RESTAURANT_DETAILS_RECEIVED'
export const SHOW_RESTAURANT = '@knp-keskonmange/RestaurantWheel/SHOW_RESTAURANT'
export const BACK_TO_SEARCH = '@knp-keskonmange/RestaurantWheel/BACK_TO_SEARCH'

// handleAddress :: String -> Action
export const handleAddress = address => ({
  type: HANDLE_ADDRESS,
  address,
})

// getCoordinates :: () -> Action
export const getCoordinates = always({ type: GET_COORDINATES })

// coordinatesReceived :: (Double, Double) -> Action
export const coordinatesReceived = (latitude, longitude) => ({
  type: COORDINATES_RECEIVED,
  latitude,
  longitude,
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

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_ADDRESS]: (state, { address }) => ({
    ...state,
    address: address,
  }),

  [COORDINATES_RECEIVED]: (state, { latitude, longitude }) => ({
    ...state,
    latitude,
    longitude,
  }),

  [GET_RESTAURANT]: state => ({
    ...state,
    loading: true,
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
  })
})
