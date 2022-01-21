import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { compose, find, propEq, propOr } from 'ramda'
import { getHistoryRestaurant } from './../../../Redux/State/History'
import { findPropertyById } from './../../../Util'

// mapStateToProps :: (State, Props) -> Props
const mapStateToProps = (state, { history }) => ({
  restaurant: findPropertyById('restaurant', history.id, state.History.histories),
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = (dispatch, { history }) => ({
  getHistoryRestaurant: compose(dispatch, () => getHistoryRestaurant(
    history.id,
    history.restaurantId
  )),
})

const lifecycles = componentDidMount(
  ({ getHistoryRestaurant }) => getHistoryRestaurant(),
)(Restaurant)

// Restaurant :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
