import { timer } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import { logObservableError } from '../Util'
import {
  delayWhen,
  filter,
  map,
} from 'rxjs/operators'
import {
  equals,
  isNil,
} from 'ramda'
import {
  ADD_TOAST,
  removeToast,
} from '../Redux/State/Toast'

// autoRemoveToastEpic :: Epic -> Action REMOVE_TOAST
export const autoRemoveToastEpic = (action$, state$, { logger }) =>
  action$.pipe(
    ofType(ADD_TOAST),
    delayWhen(({ toast }) => timer(Number(toast.duration))),
    filter(({ toast }) => !isNil(document.querySelector(`.toasts #toast-${toast.id}`))),
    filter(({ toast }) => !equals('danger')(toast.level)),
    map(({ toast }) => removeToast(toast.id)),
    logObservableError('Toast :: autoRemoveToastEpic', logger),
  )

export default combineEpics(
  autoRemoveToastEpic,
)
