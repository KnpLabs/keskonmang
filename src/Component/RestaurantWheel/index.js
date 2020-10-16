import RestaurantWheel from './RestaurantWheel'
import { connect } from 'react-redux'
import { 
  handleAddress,
  getRestaurant,
} from '../../Redux/State/RestaurantWheel'
import { getCuisineTypes } from '../../Redux/State/RestaurantFilters'
import { compose, path, pipe, tap } from 'ramda'
import { componentDidMount } from 'react-functional-lifecycle'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  address: state.RestaurantWheel.address,
  cuisineTypes: state.RestaurantFilters.cuisineTypes,
  diets: state.RestaurantFilters.diets,
  prices: state.RestaurantFilters.prices,
  fetchError: state.RestaurantWheel.fetchError,
  invalidAddress: state.RestaurantWheel.invalidAddress,
  loading: state.RestaurantWheel.loading,
  restaurantShown: state.RestaurantWheel.restaurantShown,
  cuisineTypeFilters: state.RestaurantFilters.cuisineTypeFilters,
  isFiltersLoaded: state.RestaurantFilters.cuisineTypeFiltersLoaded
    // && state.RestaurantWheel.dietFiltersLoaded
    // && state.RestaurantWheel.priceFiltersLoaded
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  getCuisineTypes: compose(dispatch, getCuisineTypes),
  handleAddressChange: compose(dispatch, handleAddress, path(['target', 'value'])),
  submitForm: pipe(
    tap(e => e.preventDefault()),
    getRestaurant,
    dispatch,
  ),
})

const lifecycles = compose(
  componentDidMount(({ getCuisineTypes }) => getCuisineTypes()),
)(RestaurantWheel)

// RestaurantWheel :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
