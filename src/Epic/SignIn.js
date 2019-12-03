import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, map, filter } from 'rxjs/operators'
import { complement, isNil } from 'ramda'
import { logObservableErrorAndTriggerAction } from './../Util'
import {
  SIGN_IN_BUTTON_MOUNTED,
  signInSuccess,
  signInFailure,
} from './../Redux/State/SignIn'

// @see https://developers.google.com/identity/sign-in/web/build-button
// 
// signInWithGoogleEpic :: Epic -> Observable Action SIGN_IN_SUCCESS SIGN_IN_FAILURE
export const signInWithGoogleEpic = (action$, state$, { getGoogleApi }) => 
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

export default combineEpics(
  signInWithGoogleEpic,
)
