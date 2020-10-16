import RestaurantFilters from './RestaurantFilters'
import { connect } from 'react-redux'
import { 
  handleCuisineType,
  handleDiet,
  handlePrice,
  getCuisineTypes,
  getDiets,
  getPrices,
} from '../../Redux/State/RestaurantFilters'
import { compose, map, path, repeat } from 'ramda'
import { componentDidMount } from 'react-functional-lifecycle'

const formatFilters = cuisineTypeFilters => map(cuisineTypeFilter => ({
  value: cuisineTypeFilter, 
  label: cuisineTypeFilter
}))(cuisineTypeFilters)

const formatPriceFilters = priceFilters => map((priceFilter) => ({
  value: priceFilter, 
  label: repeat('$', priceFilter).join('')
}))(priceFilters)

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  cuisineTypes: formatFilters(state.RestaurantFilters.cuisineTypes),
  diets: formatFilters(state.RestaurantFilters.diets),
  prices: formatPriceFilters(state.RestaurantFilters.prices),
  cuisineTypeFilters: formatFilters(state.RestaurantFilters.cuisineTypeFilters),
  dietFilters: formatFilters(state.RestaurantFilters.dietFilters),
  priceFilters: formatPriceFilters(state.RestaurantFilters.priceFilters),
  cuisineTypeFiltersLoaded: state.RestaurantFilters.cuisineTypeFiltersLoaded,
  dietFiltersLoaded: state.RestaurantFilters.dietFiltersLoaded,
  priceFiltersLoaded: state.RestaurantFilters.priceFiltersLoaded,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  getCuisineTypes: compose(dispatch, getCuisineTypes),
  getDiets: compose(dispatch, getDiets),
  getPrices: compose(dispatch, getPrices),
  handleCuisineTypeChange: compose(dispatch, handleCuisineType),
  handleDietChange: compose(dispatch, handleDiet),
  handlePriceChange: compose(dispatch, handlePrice),
})

const lifecycles = compose(
  componentDidMount(({ getCuisineTypes }) => getCuisineTypes()),
  componentDidMount(({ getDiets }) => getDiets()),
  componentDidMount(({ getPrices }) => getPrices()),
)(RestaurantFilters)

// RestaurantFilters :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
