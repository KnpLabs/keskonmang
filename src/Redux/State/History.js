import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  loading: null,
  histories: [],
  page: 1,
  totalPages: 1,
}

// action types
export const ADD_HISTORY = '@knp-keskonmang/History/ADD_HISTORY'
export const GET_HISTORIES = '@knp-keskonmang/History/GET_HISTORIES'
export const GET_NEXT_HISTORIES = '@knp-keskonmang/History/GET_NEXT_HISTORIES'
export const HISTORIES_RECEIVED = '@knp-keskonmang/History/HISTORIES_RECEIVED'
export const NEXT_HISTORIES_RECEIVED = '@knp-keskonmang/History/NEXT_HISTORIES_RECEIVED'

// addHistory :: () -> Action
export const addHistory = always({ type: ADD_HISTORY })

// getHistories :: Number -> Action
export const getHistories = always({ type: GET_HISTORIES })

// addHistory :: () -> Action
export const getNextHistories = always({ type: GET_NEXT_HISTORIES })

// historiesReceived :: (Array, Number) -> Action
export const historiesReceived = (histories, totalPages) => ({ 
    type: HISTORIES_RECEIVED,
    histories,
    totalPages,
})

// nextHistoriesReceived :: (Array, Number) -> Action
export const nextHistoriesReceived = (nextHistories, totalPages) => ({ 
    type: NEXT_HISTORIES_RECEIVED,
    nextHistories,
    totalPages,
})

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [GET_HISTORIES]: state => ({
    ...state,
    loading: true,
  }),

  [GET_NEXT_HISTORIES]: state => ({
    ...state,
    loading: true,
    page: state.page + 1,
  }),

  [HISTORIES_RECEIVED]: (state, { histories, totalPages }) => ({
    ...state,
    loading: false,
    histories,
    totalPages,
  }),

  [NEXT_HISTORIES_RECEIVED]: (state, { nextHistories, totalPages }) => ({
    ...state,
    loading: false,
    histories: [
      ...state.histories,
      ...nextHistories
    ],
    totalPages,
  }),
})
