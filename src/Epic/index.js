import SignIn from './SignIn'
import Session from './Session'
import RestaurantWheel from './RestaurantWheel'
import { combineEpics } from 'redux-observable'

// Epic :: (Observable Action, Observable State) -> Observable Action Error
export default combineEpics(
  Session,
  SignIn,
  RestaurantWheel,
)
