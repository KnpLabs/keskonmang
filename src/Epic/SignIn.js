import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, map, filter } from 'rxjs/operators'
import { complement, isNil, pipe } from 'ramda'
import { logObservableErrorAndTriggerAction } from './../Util'
import {
  SIGN_IN_BUTTON_MOUNTED,
  SIGN_OUT,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from './../Redux/State/SignIn'

// @see https://developers.google.com/identity/sign-in/web/build-button
// 
// signInEpic :: Epic -> Observable Action SIGN_IN_SUCCESS SIGN_IN_FAILURE
export const signInEpic = (action$, state$, { getGoogleApi }) => 
  action$.pipe(
    ofType(SIGN_IN_BUTTON_MOUNTED),
    map(() => getGoogleApi()),
    filter(complement(isNil)),
    mergeMap(gapi => new Promise((resolve, reject) => gapi.signin2.render(
      'gapi-signin', 
      {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': resolve,
        'onfailure': reject,
      }
    ))),
    map(signInSuccess),
    logObservableErrorAndTriggerAction(signInFailure),
  )

// signOutEpic :: Epic -> Observable Action SIGN_OUT_SUCCESS SIGN_OUT_FAILURE
export const signOutEpic = (action$, state$, { getGoogleApi }) =>
  action$.pipe(
    ofType(SIGN_OUT),
    map(() => getGoogleApi()),
    filter(complement(isNil)),
    mergeMap(pipe(
      gapi => gapi.auth2.getAuthInstance(),
      auth2 => auth2.signOut(),
    )),
    map(signOutSuccess),
    logObservableErrorAndTriggerAction(signOutFailure)
  )

export default combineEpics(
  signInEpic,
  signOutEpic,
)
