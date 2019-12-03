import { always } from 'ramda'
import { createReducer } from './../../Util'

// initial state
export const INITIAL_STATE = {
  isSignedIn: false,
  error: false,
}

// action types
export const SIGN_IN_BUTTON_MOUNTED = '@knp-keskonmange/SignIn/SIGN_IN_BUTTON_MOUNTED'
export const SIGN_IN_SUCCESS = '@knp-keskonmange/SignIn/SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = '@knp-keskonmange/SignIn/SIGN_IN_FAILURE'

// signInButtonMounted :: () -> Action
export const signInButtonMounted = always({ type: SIGN_IN_BUTTON_MOUNTED })

// signInSuccess :: () -> Action
export const signInSuccess = always({ type: SIGN_IN_SUCCESS })

// signInFailure :: () -> Action
export const signInFailure = always({ type: SIGN_IN_FAILURE })

export default createReducer(INITIAL_STATE, {
  [SIGN_IN_SUCCESS]: state => ({
    ...state,
    isSignedIn: true,
  }),

  [SIGN_IN_FAILURE]: state => ({
    ...state,
    isSignedIn: false,
    error: true,
  })
})
