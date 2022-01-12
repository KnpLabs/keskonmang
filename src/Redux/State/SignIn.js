import { always } from 'ramda'
import { createReducer } from './../../Util'

// initial state
export const INITIAL_STATE = {
  initialized: false,
  isSignedIn: false,
  signInError: false,
  signOutError: false,
}

// action types
export const SIGN_IN_BUTTON_MOUNTED = '@knp-keskonmang/SignIn/SIGN_IN_BUTTON_MOUNTED'
export const INITIALIZE = '@knp-keskonmang/SignIn/INITIALIZE'
export const INITIALIZED = '@knp-keskonmang/SignIn/INITIALIZED'
export const SIGN_IN_SUCCESS = '@knp-keskonmang/SignIn/SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = '@knp-keskonmang/SignIn/SIGN_IN_FAILURE'
export const SIGN_OUT = '@knp-keskonmang/SignIn/SIGN_OUT'
export const SIGN_OUT_SUCCESS = '@knp-keskonmang/SignIn/SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = '@knp-keskonmang/SignIn/SIGN_OUT_FAILURE'

// signInButtonMounted :: () -> Action
export const signInButtonMounted = always({ type: SIGN_IN_BUTTON_MOUNTED })

// initialize :: () -> Action
export const initialize = always({ type: INITIALIZE })

// initialized :: () -> Action
export const initialized = always({ type: INITIALIZED })

// signInSuccess :: String -> Action
export const signInSuccess = token => ({
  type: SIGN_IN_SUCCESS,
  token,
})

// signInFailure :: () -> Action
export const signInFailure = always({ type: SIGN_IN_FAILURE })

// signOut :: () -> Action
export const signOut = always({ type: SIGN_OUT })

// signOutSuccess :: () -> Action
export const signOutSuccess = always({ type: SIGN_OUT_SUCCESS })

// signOutFailure :: () -> Action
export const signOutFailure = always({ type: SIGN_OUT_FAILURE })

// SignIn :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [INITIALIZED]: state => ({
    ...state,
    initialized: true,
  }),

  [SIGN_IN_SUCCESS]: state => ({
    ...state,
    isSignedIn: true,
    signInError: false,
  }),

  [SIGN_IN_FAILURE]: state => ({
    ...state,
    signInError: true,
  }),

  [SIGN_OUT_SUCCESS]: state => ({
    ...state,
    isSignedIn: false,
    signInError: false,
    signOutError: false,
  }),

  [SIGN_OUT_FAILURE]: state => ({
    ...state,
    signOutError: true,
  }),
})
