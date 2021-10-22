import { tap, pipe } from 'ramda'
import { combineReducers } from 'redux'
import History from './History'
import RestaurantDetails from './RestaurantDetails'
import RestaurantFilters from './RestaurantFilters'
import RestaurantWheel from './RestaurantWheel'
import Session from './Session'
import SignIn from './SignIn'
import Toast from './Toast'

// debug :: ((State, Action *) -> State) -> State -> Action * -> State
export const debug = reducer => (state = reducer(), action = {}) => pipe(
  tap(({ type }) => console.log(`Action :: ${type || 'NONE'}`)),
  tap(({ type, ...payload }) => console.log('Payload ::', payload)),
  action => reducer(state, action),
  tap(newState => console.log('NewState ::', newState)),
  tap(() => console.log('')),
)(action)

// State :: (State, Action *) -> State
export default combineReducers({
  History,
  RestaurantDetails,
  RestaurantFilters,
  RestaurantWheel,
  Session,
  SignIn,
  Toast,
})
