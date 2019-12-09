import { always } from 'ramda'
import { createReducer } from './../../Util'

// initial state
export const INITIAL_STATE = {
  isSignedIn: false,
  signInError: false,
  signOutError: false,
  user: null,
}

// action types
export const SIGN_IN_BUTTON_MOUNTED = '@knp-keskonmange/SignIn/SIGN_IN_BUTTON_MOUNTED'
export const SIGN_IN_SUCCESS = '@knp-keskonmange/SignIn/SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = '@knp-keskonmange/SignIn/SIGN_IN_FAILURE'
export const SIGN_OUT = '@knp-keskonmange/SignIn/SIGN_OUT'
export const SIGN_OUT_SUCCESS = '@knp-keskonmange/SignIn/SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = '@knp-keskonmange/SignIn/SIGN_OUT_FAILURE'
export const PROFILE_RECEIVED = '@knp-keskonmange/SignIn/PROFILE_RECEIVED'
export const CREATE_USER = '@knp-keskonmange/SignIn/CREATE_USER'
export const USER_CREATED = '@knp-keskonmange/SignIn/USER_CREATED'
export const USER_ALREADY_EXISTS = '@knp-keskonmange/SignIn/USER_ALREADY_EXISTS'

// signInButtonMounted :: () -> Action
export const signInButtonMounted = always({ type: SIGN_IN_BUTTON_MOUNTED })

// signInSuccess :: GoogleUser -> Action
export const signInSuccess = user => ({ 
  type: SIGN_IN_SUCCESS, 
  user,
})

// signInFailure :: () -> Action
export const signInFailure = always({ type: SIGN_IN_FAILURE })

// signOut :: () -> Action
export const signOut = always({ type: SIGN_OUT })

// signOutSuccess :: () -> Action
export const signOutSuccess = always({ type: SIGN_OUT_SUCCESS })

// signOutFailure :: () -> Action
export const signOutFailure = always({ type: SIGN_OUT_FAILURE })

// @type Profile = {
//   token :: String,
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

// createUser :: String -> Action
export const createUser = token => ({
  type: CREATE_USER,
  token,
})

// userCreated :: () -> Action
export const userCreated = always({ type: USER_CREATED })

// userAlreadyExists :: () -> Action
export const userAlreadyExists = always({ type: USER_ALREADY_EXISTS })

// SignIn :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [SIGN_IN_SUCCESS]: state => ({
    ...state,
    isSignedIn: true,
    signInError: false,
  }),

  [SIGN_IN_FAILURE]: state => ({
    ...state,
    signInError: true,
  }),

  [SIGN_OUT_SUCCESS]: always(INITIAL_STATE),

  [SIGN_OUT_FAILURE]: state => ({
    ...state,
    signOutError: true,
  }),

  [PROFILE_RECEIVED]: (state, { profile }) => ({
    ...state,
    user: profile,
  })
})
