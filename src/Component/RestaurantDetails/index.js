import RestaurantDetails from './RestaurantDetails'
import { connect } from 'react-redux'
import { getRestaurant, backToSearch } from './../../Redux/State/RestaurantWheel'
import { compose } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurant: state.RestaurantWheel.restaurant,
  loading: state.RestaurantWheel.loading,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  getRestaurant: compose(dispatch, getRestaurant),
  backToSearch: compose(dispatch, backToSearch),
})

// RestaurantDetails :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetails)
