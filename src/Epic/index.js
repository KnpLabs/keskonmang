import SignIn from './SignIn'
import RestaurantWheel from './RestaurantWheel'
import RestaurantFilters from './RestaurantFilters'
import { combineEpics } from 'redux-observable'

// Epic :: (Observable Action, Observable State) -> Observable Action Error
export default combineEpics(
  SignIn,
  RestaurantWheel,
  RestaurantFilters,
)
