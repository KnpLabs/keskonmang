import { createReducer } from './../../Util'
import { always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  histories: [],
}

// action types
export const ADD_HISTORY = '@knp-keskonmang/History/ADD_HISTORY'

// addHistory :: () -> Action
export const addHistory = always({ type: ADD_HISTORY })

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
})
