import { StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'

// createStateObservable :: Object -> Observale State
export const createStateObservable = state => new StateObservable(
  new Subject(),
  state
)

// createFetchApiMock :: any -> () -> Promise<any>
export const createFetchApiMock = (body, fetchApiUrl) =>
  (url, options) => {
    fetchApiUrl.push(url)
    return Promise.resolve(body)
  }
