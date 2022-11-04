import { ifElse, isNil } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { findPropertyById, logObservableError } from './../Util'
import { addToast } from './../Redux/State/Toast'
import {
  filter,
  ignoreElements,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  ADD_HISTORY,
  CLEAR,
  GET_HISTORIES,
  GET_HISTORY_RESTAURANT,
  GET_NEXT_HISTORIES,
  historiesReceived,
  historyRestaurantReceived,
  nextHistoriesReceived,
} from './../Redux/State/History'

// pageName :: String
const pageName = 'history-page'

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
    ofType(GET_HISTORIES, GET_NEXT_HISTORIES),
    withLatestFrom(state$),
    filter(([ action, state ]) => state.Session.user !== null),
    mergeMap(([ action, state ]) => Promise.all([
      fetchApi(
        `/history/list?page=${state.History.page}`, 
        { method: 'GET' },
        state.Session.user.token
      ),
      action.type
    ])),
    map(ifElse(
      ([_, type]) => type === GET_NEXT_HISTORIES,
      ([response, _]) => nextHistoriesReceived(response.body, Number(response.headers.get('Total-Pages'))),
      ([response, _]) => historiesReceived(response.body, Number(response.headers.get('Total-Pages'))),
    )),
    logObservableError(),
  )

// getHistoryRestaurantEpic :: Epic -> Observable Action HISTORY_RESTAURANT_RECEIVED
export const getHistoryRestaurantEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_HISTORY_RESTAURANT),
    withLatestFrom(state$),
    filter(([ { historyId }, state ]) =>
      isNil(findPropertyById('restaurant', historyId, state.History.histories))
    ),
    mergeMap(([{ historyId, restaurantId }]) => Promise.all([
      fetchApi(`/restaurants/${restaurantId}`),
      historyId
    ])),
    map(([response, historyId]) => historyRestaurantReceived(historyId, response.body)),
    logObservableError(),
  )

// applyHistoryPageBodyClass :: Epic -> Observable _
export const applyHistoryPageBodyClass =  (action$, state$, { window }) =>
  action$.pipe(
    ofType(GET_HISTORIES),
    filter(() => !window.document.querySelector('body').classList.contains(pageName)),
    map(() => window.document.querySelector('body').classList.add(pageName)),
    ignoreElements(),
    logObservableError(),
  )

// removeHistoryPageBodyClass :: Epic -> Observable _
export const removeHistoryPageBodyClass =  (action$, state$, { window }) =>
  action$.pipe(
    ofType(CLEAR),
    filter(() => window.document.querySelector('body').classList.contains(pageName)),
    map(() => window.document.querySelector('body').classList.remove(pageName)),
    ignoreElements(),
    logObservableError(),
  )

export default combineEpics(
  addHistoryEpic,
  applyHistoryPageBodyClass,
  getHistoriesEpic,
  getHistoryRestaurantEpic,
  removeHistoryPageBodyClass,
)
