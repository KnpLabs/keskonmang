import { isNil } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { logObservableError } from './../Util'
import {
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import { ADD_HISTORY } from './../Redux/State/History'
import { addToast } from './../Redux/State/Toast'

// addHistoryEpic :: Epic -> Observable Action ADD_TOAST
export const addHistoryEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(ADD_HISTORY),
    withLatestFrom(state$),
    filter(([ _, state ]) => !isNil(state.Session.user)),
    filter(([ _, state ]) => !isNil(state.RestaurantWheel.restaurant)),
    mergeMap(([ action, state ]) => fetchApi(
      `/history/create`, 
      {
        method: 'POST',
        body: JSON.stringify({ restaurantId: state.RestaurantWheel.restaurant.id }),
      },
      state.Session.user.token
    )),
    map(() => addToast({ message: 'Ajouter à votre historique!', level: 'success'})),
    logObservableError(),
  )

export default combineEpics(
  addHistoryEpic,
)
