import SignIn from './SignIn'
import { combineEpics } from 'redux-observable'

// Epic :: (Observable Action, Observable State) -> Observable Action Error
export default combineEpics(
  SignIn,
)
