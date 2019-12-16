import { StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'

// createStateObservable :: Object -> Observale State
export const createStateObservable = state => new StateObservable(
  new Subject(),
  state
)
