import RestaurantDetails from './RestaurantDetails'
import { connect } from 'react-redux'
import { clear, getRestaurantDetails } from './../../Redux/State/RestaurantDetails'
import { getRestaurant } from './../../Redux/State/RestaurantWheel'
import { addHistory } from './../../Redux/State/History'
import { compose } from 'ramda'
import { componentDidMount, componentWillUnmount } from 'react-functional-lifecycle'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurant: state.RestaurantDetails.restaurant,
  loading: state.RestaurantDetails.loading,
  isLogged: state.Session.user !== null,
  searchAddress: state.RestaurantWheel.address,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = (dispatch, { restaurantId, isAlreadyLoaded }) => ({
  getRestaurantDetails: !isAlreadyLoaded 
    ? compose(dispatch, getRestaurantDetails, () => restaurantId) 
    : () => {},
  getRestaurant: compose(dispatch, getRestaurant),
  addHistory: compose(dispatch, addHistory),
  clear: compose(dispatch, clear),
})

const lifecycles = compose(
  componentDidMount(({ getRestaurantDetails }) => getRestaurantDetails()),
  componentWillUnmount(({ clear }) => clear()),
)(RestaurantDetails)

// RestaurantDetails :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
