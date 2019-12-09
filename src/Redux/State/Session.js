import { createReducer } from './../../Util'

// initial stare
export const INITIAL_STATE = {
  user: null,
  history: [],
}

// action types
export const PROFILE_RECEIVED = '@knp-keskonmange/Session/PROFILE_RECEIVED'
export const HISTORY_RECEIVED = '@knp-keskonmange/Session/HISTORY_RECEIVED'

// @type Profile = {
//   name :: String,
//   giveName :: String,
//   familyName :: String,
//   imageUrl :: String,
//   email :: String,
// }
//
// profileReceived :: Profile -> Action
export const profileReceived = profile => ({
  type: PROFILE_RECEIVED,
  profile,
})

// @type Restaurant = {
//   @TODO  
// }
// 
// historyReceived :: [Restaurant] -> Action
export const historyReceived = restaurants => ({
  type: HISTORY_RECEIVED,
  restaurants,
})

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [PROFILE_RECEIVED]: (state, { profile }) => ({
    ...state,
    user: profile,
  })
})
