import {
  always,
  identity,
  join,
  length,
  multiply,
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

// getRandomElementFromArray :: [Any] -> Any
export const getRandomElementFromArray = array => pipe(
  length,
  multiply(Math.random()),
  Math.floor,
  key => array[key],
)(array)

// @see https://developer.foursquare.com/docs/api/venues/photos
//
// getImageUrl :: Photo -> String
export const getImageUrl = photo => join('', [
  photo.prefix,
  'original',
  photo.suffix,
])
