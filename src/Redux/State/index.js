import { tap, pipe } from 'ramda'
import { combineReducers } from 'redux'
import History from './History'
import RestaurantWheel from './RestaurantWheel'
import RestaurantFilters from './RestaurantFilters'
import Session from './Session'
import SignIn from './SignIn'
import Toast from './Toast'

// debug :: ((State, Action *) -> State) -> State -> Action * -> State
export const debug = reducer => (state = reducer(), action = {}) => pipe(
  tap(() => console.log(':: DEBUG ::')),
  tap(({ type }) => console.log(`Action :: ${type || 'NONE'}`)),
  tap(({ type, ...payload }) => console.log('Payload ::', payload)),
  tap(() => console.log('InitialState ::', state)),
  tap(() => console.time('Reducer :: Timer :')),
  action => reducer(state, action),
  tap(newState => console.log('NewState ::', newState)),
  tap(() => console.timeEnd('Reducer :: Timer :')),
  tap(() => console.log(':: END DEBUG ::')),
  tap(() => console.log('')),
)(action)

// State :: (State, Action *) -> State
export default combineReducers({
  History,
  RestaurantWheel,
  RestaurantFilters,
  Session,
  SignIn,
  Toast,
})
