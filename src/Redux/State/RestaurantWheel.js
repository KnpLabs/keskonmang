import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  address: '',
  restaurant: null,
}

// action types
export const HANDLE_ADDRESS = '@knp-keskonmange/RestaurantWheel/HANDLE_ADDRESS'
export const GET_COORDINATES = '@knp-keskonmange/RestaurantWheel/GET_COORDINATES'
export const GET_RESTAURANT = '@knp-keskonmange/RestaurantWheel/GET_RESTAURANT'
export const RESTAURANT_RECEIVED = '@knp-keskonmange/RestaurantWheel/RESTAURANT_RECEIVED'
export const BACK_TO_SEARCH = '@knp-keskonmange/RestaurantWheel/BACK_TO_SEARCH'

// handleAddress :: String -> Action
export const handleAddress = address => ({
  type: HANDLE_ADDRESS,
  address,
})

// getCoordinates :: () -> Action
export const getCoordinates = always({ type: GET_COORDINATES })

// getRestaurant :: (Double, Double) -> Action
export const getRestaurant = (latitude, longitude) => ({
  type: GET_RESTAURANT,
  latitude,
  longitude,
})

// @type Restaurant = {
//  categories :: [Category],
//  hasPerk :: Boolean,
//  id :: String,
//  location :: Location,
//  name :: String,
//  referralId :: String,
// }
//
// restaurantReceived :: Restaurant -> Action
export const restaurantReceived = restaurant => ({
  type: RESTAURANT_RECEIVED,
  restaurant,
})

// backToSearch :: () -> Action
export const backToSearch = always({ type: BACK_TO_SEARCH })

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_ADDRESS]: (state, { address }) => ({
    ...state,
    address: address,
  }),

  [RESTAURANT_RECEIVED]: (state, { restaurant }) => ({
    ...state,
    restaurant,
  })
})
