import History from './History'
import RestaurantWheel from './RestaurantWheel'
import RestaurantFilters from './RestaurantFilters'
import Session from './Session'
import SignIn from './SignIn'
import Toast from './Toast'
import { combineEpics } from 'redux-observable'

// Epic :: (Observable Action, Observable State) -> Observable Action Error
export default combineEpics(
  History,
  RestaurantWheel,
  RestaurantFilters,
  Session,
  SignIn,
  Toast,
)
