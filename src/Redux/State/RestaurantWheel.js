import { createReducer } from './../../Util'

// initial stare
export const INITIAL_STATE = {
  address: null,
}

// action types
export const HANDLE_ADDRESS = '@knp-keskonmange/RestaurantWheel/HANDLE_ADDRESS'
export const GET_COORDINATES = '@knp-keskonmange/RestaurantWheel/GET_COORDINATES'
export const GET_RESTAURANT = '@knp-keskonmange/RestaurantWheel/GET_RESTAURANT'

// handleAddress :: String -> Action
export const handleAddress = address => ({
  type: HANDLE_ADDRESS,
  address,
})

// getCoordinates :: ()) -> Action
export const getCoordinates = () => ({
  type: GET_COORDINATES,
})
// getRestaurant :: ()) -> Action
export const getRestaurant = coordinates => ({
  type: GET_RESTAURANT,
  coordinates: coordinates
})

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_ADDRESS]: (state, { address }) => ({
    ...state,
    address: address,
  }),
})
