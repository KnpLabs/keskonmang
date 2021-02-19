import { ofType, combineEpics } from 'redux-observable'
import { map } from 'rxjs/operators'
import { logObservableError } from './../Util'
import { removeProfile } from './../Redux/State/Session'
import { SIGN_OUT_SUCCESS } from './../Redux/State/SignIn'

// removeProfileEpic :: Epic -> Observable Action REMOVE_PROFILE
export const removeProfileEpic = (action$, state$) =>
  action$.pipe(
    ofType(SIGN_OUT_SUCCESS),
    map(removeProfile),
    logObservableError(),
  )

export default combineEpics(
  removeProfileEpic,
)
