import RestaurantWheel from './RestaurantWheel'
import { connect } from 'react-redux'
import { handleAddress, getCoordinates } from '../../Redux/State/RestaurantWheel'
import { compose, path, pipe, tap } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  address: state.RestaurantWheel.address,
  restaurant: state.RestaurantWheel.restaurant,
  loading: state.RestaurantWheel.loading,
  restaurantShown: state.RestaurantWheel.restaurantShown,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  handleChange: compose(dispatch, handleAddress, path(['target', 'value'])),
  submitForm: pipe(
    tap(e => e.preventDefault()),
    getCoordinates,
    dispatch,
  ),
})

// RestaurantWheel :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantWheel)
