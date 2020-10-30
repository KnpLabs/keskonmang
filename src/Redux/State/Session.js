import { createReducer } from './../../Util'

// initial stare
export const INITIAL_STATE = {
  user: null,
}

// action types
export const PROFILE_RECEIVED = '@knp-keskonmang/Session/PROFILE_RECEIVED'

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

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [PROFILE_RECEIVED]: (state, { profile }) => ({
    ...state,
    user: profile,
  })
})
