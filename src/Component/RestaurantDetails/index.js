import RestaurantDetails from './RestaurantDetails'
import { connect } from 'react-redux'
import { clear } from './../../Redux/State/RestaurantDetails'
import { getRestaurant } from './../../Redux/State/RestaurantWheel'
import { addHistory } from './../../Redux/State/History'
import { compose } from 'ramda'
import { componentWillUnmount } from 'react-functional-lifecycle'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurant: state.RestaurantDetails.restaurant,
  loading: state.RestaurantDetails.loading,
  isLogged: state.Session.user !== null
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  getRestaurant: compose(dispatch, getRestaurant),
  addHistory: compose(dispatch, addHistory),
  clear: compose(dispatch, clear),
})

const willUnmount = ({ clear }) => clear()

const lifecycles = componentWillUnmount(willUnmount)(RestaurantDetails)

// RestaurantDetails :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
