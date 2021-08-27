import RestaurantWheel from './RestaurantWheel'
import { connect } from 'react-redux'
import { 
  handleAddress,
  getRestaurant,
} from '../../Redux/State/RestaurantWheel'
import { compose, path, pipe, tap } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  address: state.RestaurantWheel.address,
  fetchError: state.RestaurantWheel.fetchError,
  loading: state.RestaurantWheel.loading,
  noRestaurants: state.RestaurantWheel.noRestaurants,
  restaurant: state.RestaurantDetails.restaurant,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  handleAddressChange: compose(dispatch, handleAddress, path(['target', 'value'])),
  submitForm: pipe(
    tap(e => e.preventDefault()),
    getRestaurant,
    dispatch,
  ),
})

// RestaurantWheel :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantWheel)
