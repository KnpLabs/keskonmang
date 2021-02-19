import { append } from 'ramda'
import { createReducer } from '../../Util'
import uniqid from 'uniqid'

// Toast initial state
export const INITIAL_STATE = {
  toasts: [],
}

// Toast action types
export const ADD_TOAST = '@knp-keskonmang/Toast/ADD_TOAST'
export const REMOVE_TOAST = '@knp-keskonmang/Toast/REMOVE_TOAST'

// @type Toast = {
//   id :: Int,
//   duration :: Int,
//   level :: String,
//   message :: String,
// }
//
// addToast :: Toast -> Action
export const addToast = toast => ({
  type: ADD_TOAST,
  toast: {
    ...toast,
    id: uniqid(),
    duration: toast.duration || 5000,
    level: toast.level || 'info',
  }
})

// removeToast :: String -> Action
export const removeToast = id => ({
  type: REMOVE_TOAST,
  id,
})

// Toast :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [ADD_TOAST]: (state, { toast }) => ({
    ...state,
    toasts: append(toast, state.toasts),
  }),
  [REMOVE_TOAST]: (state, { id }) => ({
    ...state,
    toasts: state.toasts.filter(toast => toast.id !== id),
  }),
})
