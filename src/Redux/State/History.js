import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  loading: false,
  histories: [],
  page: 1,
  totalPages: 1,
}

// action types
export const ADD_HISTORY = '@knp-keskonmang/History/ADD_HISTORY'
export const GET_HISTORIES = '@knp-keskonmang/History/GET_HISTORIES'
export const HISTORIES_RECEIVED = '@knp-keskonmang/History/HISTORIES_RECEIVED'

// addHistory :: () -> Action
export const addHistory = always({ type: ADD_HISTORY })

// getHistories :: () -> Action
export const getHistories = (page = 1) => ({ 
  type: GET_HISTORIES,
  page
})

// historiesReceived :: (Array, Number) -> Action
export const historiesReceived = (histories, totalPages) => ({ 
    type: HISTORIES_RECEIVED,
    histories,
    totalPages,
})

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [GET_HISTORIES]: (state, { page }) => ({
    ...state,
    loading: true,
    page,
  }),

  [HISTORIES_RECEIVED]: (state, { histories, totalPages }) => ({
    ...state,
    loading: false,
    histories,
    totalPages,
  }),
})
