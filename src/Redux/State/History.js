import { createReducer } from './../../Util'
import { always, find, findIndex, propEq, update } from 'ramda'

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
export const GET_HISTORY_RESTAURANT = '@knp-keskonmang/History/GET_HISTORY_RESTAURANT'
export const HISTORY_RESTAURANT_RECEIVED = '@knp-keskonmang/History/HISTORY_RESTAURANT_RECEIVED'
export const CLEAR = '@knp-keskonmang/History/CLEAR'

// addHistory :: () -> Action
export const addHistory = always({ type: ADD_HISTORY })

// getHistories :: Number -> Action
export const getHistories = always({ type: GET_HISTORIES })

// getNextHistories :: () -> Action
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

// getHistoryRestaurant :: (Number, Number) -> Action
export const getHistoryRestaurant = (historyId, restaurantId) => ({
  type: GET_HISTORY_RESTAURANT,
  historyId,
  restaurantId,
})

// historyRestaurantReceived :: (Number, Object) -> Action
export const historyRestaurantReceived = (historyId, restaurant) => ({
  type: HISTORY_RESTAURANT_RECEIVED,
  historyId,
  restaurant,
})

// clear :: () -> Action
export const clear = always({ type: CLEAR })

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

  [HISTORY_RESTAURANT_RECEIVED]: (state, { historyId, restaurant }) => ({
    ...state,
    histories: update(
      findIndex(propEq('id', historyId), state.histories), 
      {
        ...find(propEq('id', historyId), state.histories),
        restaurant,
      },
      state.histories,
    ),
  }),

  [CLEAR]: state => INITIAL_STATE,
})
