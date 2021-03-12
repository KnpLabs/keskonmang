import { isNil } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { logObservableError } from './../Util'
import { addToast } from './../Redux/State/Toast'
import {
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  ADD_HISTORY,
  GET_HISTORIES,
  historiesReceived,
} from './../Redux/State/History'

// addHistoryEpic :: Epic -> Observable Action ADD_TOAST
export const addHistoryEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(ADD_HISTORY),
    withLatestFrom(state$),
    filter(([ _, state ]) => !isNil(state.Session.user)),
    filter(([ _, state ]) => !isNil(state.RestaurantDetails.restaurant)),
    mergeMap(([ action, state ]) => fetchApi(
      `/history/create`, 
      {
        method: 'POST',
        body: JSON.stringify({ 
          restaurantId: state.RestaurantDetails.restaurant.id,
          restaurantName: state.RestaurantDetails.restaurant.name
        }),
      },
      state.Session.user.token
    )),
    map(() => addToast({ message: 'Ajouter à votre historique!', level: 'success'})),
    logObservableError(),
  )

// getHistoriesEpic :: Epic -> Observable Action HISTORIES_RECEIVED
export const getHistoriesEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_HISTORIES),
    withLatestFrom(state$),
    filter(([ action, state ]) => state.Session.user !== null),
    mergeMap(([ action, state ]) => fetchApi(
      `/history/list?page=${state.History.page}`, 
      { method: 'GET' },
      state.Session.user.token
    )),
    map(response => historiesReceived(response.body, parseInt(response.headers.get('Total-Pages')))),
    logObservableError(),
  )

export default combineEpics(
  addHistoryEpic,
  getHistoriesEpic,
)
