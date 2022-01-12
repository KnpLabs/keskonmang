import { Subject } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { 
  mergeMap,
  map,
  take,
  tap,
  ignoreElements,
 } from 'rxjs/operators'
import {
  logObservableErrorAndTriggerAction,
  logObservableError,
} from './../Util'
import {
  INITIALIZE,
  SIGN_IN_BUTTON_MOUNTED,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  initialized,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from './../Redux/State/SignIn'
import { profileReceived } from './../Redux/State/Session'
import jwt_decode from 'jwt-decode'

const signIn$ = new Subject('SignIn')

// formatProfile :: (Object, String) -> Profile
const formatProfile = (user, token) => ({
  token,
  name: user.name,
  giveName: user.given_name,
  familyName: user.family_name,
  imageUrl: user.picture,
  email: user.email,
})

// loadScriptEpic :: Epic -> Observable Action INITIALIZED
export const loadScriptEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(INITIALIZE),
    take(1),
    mergeMap(() => new Promise(resolve => {
      const script = window.document.createElement('script')
      script.async = true
      script.defer = true
      script.src = 'https://accounts.google.com/gsi/client'
      script.onload = () => resolve()

      window.document.querySelector('body').appendChild(script)
    })),
    tap(() => window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: credentialResponse => signIn$.next(credentialResponse.credential),
    })),
    map(initialized),
    logObservableError(),
  )

// renderSignInButtonEpic :: Epic -> Observable Action _
export const renderSignInButtonEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(SIGN_IN_BUTTON_MOUNTED),
    tap(() => window.google.accounts.id.renderButton(
      window.document.getElementById('sign-in-button'),
      {
        type: 'standard',
        size: 'medium',
        text: 'signin_with',
        shape: 'circle',
      },
    )),
    ignoreElements(),
  )

// signInEpic :: Epic -> Observable Action SIGN_IN_SUCCESS SIGN_IN_FAILURE
export const signInEpic = (action$, state$) =>
  signIn$.pipe(
    map(signInSuccess),
    logObservableErrorAndTriggerAction(signInFailure),
  )

// signOutEpic :: Epic -> Observable Action SIGN_OUT_SUCCESS SIGN_OUT_FAILURE
export const signOutEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(SIGN_OUT),
    tap(() => window.google.accounts.id.disableAutoSelect()),
    map(signOutSuccess),
    logObservableErrorAndTriggerAction(signOutFailure)
  )

// getProfileEpic :: Epic -> Observable Action
export const getProfileEpic = (action$, state$) =>
  action$.pipe(
    ofType(SIGN_IN_SUCCESS),
    map(({ token }) => profileReceived(
      formatProfile(jwt_decode(token), token)
    )),
    logObservableError(),
  )

export default combineEpics(
  loadScriptEpic,
  getProfileEpic,
  renderSignInButtonEpic,
  signInEpic,
  signOutEpic,
)
