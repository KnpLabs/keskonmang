import {
  always,
  identity,
  length,
  multiply,
  pipe,
  prop,
  propOr,
  tap,
} from 'ramda'
import { merge, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

/**
 * Redux utils
 */

// createReducer :: (State, Object) -> (State, Action) -> State
export const createReducer = (initialState, handlers) =>
  (state = initialState, action = {}) =>
    propOr(identity, prop('type', action), handlers)(state, action)

/**
 * Observable utils
 */

// logObservableError :: Observable Error -> () -> Observable
export const logObservableError = () => catchError((err, source) => pipe(
  tap(console.error),
  always(source),
)(err))

// logObservableErrorAndTriggerAction :: Observable Error -> (() -> Action *) -> Observable
export const logObservableErrorAndTriggerAction = action => catchError(
  (err, source) => pipe(
    tap(console.error),
    () => of(action(err)).pipe(
      merge(source)
    ),
  )(err)
)

/**
 * String utils
 */

// jsonStringify :: Object -> String
export const jsonStringify = a => JSON.stringify(a)

/**
 * Array utils
 */

// getRandomElementFromArray :: [Any] -> Any
export const getRandomElementFromArray = array => pipe(
  length,
  multiply(Math.random()),
  Math.floor,
  key => array[key],
)(array)
