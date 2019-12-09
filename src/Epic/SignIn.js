import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, map, filter } from 'rxjs/operators'
import { 
  apply,
  complement,
  isNil,
  pipe,
  prop,
} from 'ramda'
import { 
  logObservableErrorAndTriggerAction,
  logObservableError,
  jsonStringify,
} from './../Util'
import {
  SIGN_IN_BUTTON_MOUNTED,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  profileReceived,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  PROFILE_RECEIVED,
  userCreated,
  userAlreadyExists,
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

// formatProfile :: (GoogleBasicProfile, GoogleAuthResponse) -> User
const formatProfile = (gprofile, gresponse) => ({
  token: gresponse.id_token,
  name: gprofile.getName(),
  giveName: gprofile.getGivenName(),
  familyName: gprofile.getFamilyName(),
  imageUrl: gprofile.getImageUrl(),
  email: gprofile.getEmail(),
})

// https://developers.google.com/identity/sign-in/web/people
// https://developers.google.com/identity/sign-in/web/backend-auth
//
// getBasicProfileEpic :: Epic -> Observable Action 
export const getBasicProfileEpic = action$ =>
  action$.pipe(
    ofType(SIGN_IN_SUCCESS),
    map(pipe(
      prop('user'),
      user => [
        user.getBasicProfile(),
        user.getAuthResponse()
      ],
      apply(formatProfile),
      profileReceived,
    )),
    logObservableError(),
  )

// createUserEpic :: Epic -> Observable Action USER_CREATED USER_ALREADY_EXISTS
export const createUserEpic = (action$, state$, { fetchApi }) => 
  action$.pipe(
    ofType(PROFILE_RECEIVED),
    mergeMap(({ profile }) => fetchApi(
      `/users/create`,
      { 
        method: 'POST',
        body: jsonStringify({ id_token: profile.token })
      }
    )),
    map(userCreated),
    logObservableErrorAndTriggerAction(userAlreadyExists),
  )

export default combineEpics(
  createUserEpic,
  getBasicProfileEpic,
  signInEpic,
  signOutEpic,
)
