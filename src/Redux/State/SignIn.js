import { always } from 'ramda'
import { createReducer } from './../../Util'

// initial state
export const INITIAL_STATE = {
  isSignedIn: false,
  signInError: false,
  signOutError: false,
}

// action types
export const SIGN_IN = '@knp-keskonmang/SignIn/SIGN_IN'
export const SIGN_IN_SUCCESS = '@knp-keskonmang/SignIn/SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = '@knp-keskonmang/SignIn/SIGN_IN_FAILURE'
export const SIGN_OUT = '@knp-keskonmang/SignIn/SIGN_OUT'
export const SIGN_OUT_SUCCESS = '@knp-keskonmang/SignIn/SIGN_OUT_SUCCESS'
export const SIGN_OUT_FAILURE = '@knp-keskonmang/SignIn/SIGN_OUT_FAILURE'

// signOut :: String -> Action
export const signIn = token => ({
  type: SIGN_IN,
  token,
})

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
})
