import RestaurantDetails from './RestaurantDetails'
import { connect } from 'react-redux'
import { removeRestaurant } from './../../Redux/State/RestaurantDetails'
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
  removeRestaurant: compose(dispatch, removeRestaurant),
})

const willUnmount = ({ removeRestaurant }) => removeRestaurant()

const lifecycles = compose(
  componentWillUnmount(willUnmount)
)(RestaurantDetails)

// RestaurantDetails :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
