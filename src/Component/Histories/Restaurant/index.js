import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { compose } from 'ramda'
import { getHistoryRestaurant } from './../../../Redux/State/History'

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
  null,
  mapDispatchToProps,
)(lifecycles)
