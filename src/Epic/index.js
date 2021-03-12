import History from './History'
import RestaurantDetails from './RestaurantDetails'
import RestaurantFilters from './RestaurantFilters'
import RestaurantWheel from './RestaurantWheel'
import Session from './Session'
import SignIn from './SignIn'
import Toast from './Toast'
import { combineEpics } from 'redux-observable'

// Epic :: (Observable Action, Observable State) -> Observable Action Error
export default combineEpics(
  History,
  RestaurantDetails,
  RestaurantFilters,
  RestaurantWheel,
  Session,
  SignIn,
  Toast,
)
