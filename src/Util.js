import {
  always,
  identity,
  pipe,
  prop,
  propOr,
  tap,
} from 'ramda'
import { merge, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

// createReducer :: (State, Object) -> (State, Action) -> State
export const createReducer = (initialState, handlers) =>
  (state = initialState, action = {}) =>
    propOr(identity, prop('type', action), handlers)(state, action)

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

// jsonStringify :: Object -> String
export const jsonStringify = a => JSON.stringify(a)

// this fn use the Fisher-Yates algorithm
//
// @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
//
// shuffle :: [Any] -> [Any]
export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
