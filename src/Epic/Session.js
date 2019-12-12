import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { logObservableError } from './../Util'
import {
  SIGN_IN_SUCCESS,
} from './../Redux/State/SignIn'
import {
  historyReceived
} from './../Redux/State/Session'

// getHistoryEpic :: Epic -> Observable Action USER_CREATED USER_ALREADY_EXISTS
export const getHistoryEpic = (action$, state$, { fetchApi }) => 
  action$.pipe(
    ofType(SIGN_IN_SUCCESS),
    mergeMap(() => fetchApi(
      `/users/me`,
      {
        method: 'GET',
      }
    )),   
    map(historyReceived),
    logObservableError(),
  )

  export default combineEpics(
    getHistoryEpic,
  )
