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
  invalidAddress: state.RestaurantWheel.invalidAddress,
  loading: state.RestaurantWheel.loading,
  restaurantShown: state.RestaurantWheel.restaurantShown,
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
