import { createReducer } from './../../Util'
import { always, map, prop } from 'ramda'

// initial stare
export const INITIAL_STATE = {
  cuisineTypes: [],
  diets: [],
  prices: [],
  cuisineTypeFilters: [],
  dietFilters: [],
  priceFilters: [],
  cuisineTypeFiltersLoaded: false,
  dietFiltersLoaded: false,
  priceFiltersLoaded: false,
}

// action types
export const HANDLE_CUISINE_TYPE = '@knp-keskonmang/RestaurantFilters/HANDLE_CUISINE_TYPE'
export const HANDLE_DIET = '@knp-keskonmang/RestaurantFilters/HANDLE_DIET'
export const HANDLE_PRICE = '@knp-keskonmang/RestaurantFilters/HANDLE_PRICE'
export const GET_CUISINE_TYPE_FILTERS = '@knp-keskonmang/RestaurantFilters/GET_CUISINE_TYPE_FILTERS'
export const GET_DIET_FILTERS = '@knp-keskonmang/RestaurantFilters/GET_DIET_FILTERS'
export const GET_PRICE_FILTERS = '@knp-keskonmang/RestaurantFilters/GET_PRICE_FILTERS'
export const CUISINE_TYPE_FILTERS_RECEIVED = '@knp-keskonmang/RestaurantFilters/CUISINE_TYPE_FILTERS_RECEIVED'
export const DIET_FILTERS_RECEIVED = '@knp-keskonmang/RestaurantFilters/DIET_FILTERS_RECEIVED'
export const PRICE_FILTERS_RECEIVED = '@knp-keskonmang/RestaurantFilters/PRICE_FILTERS_RECEIVED'

// handleCuisineType :: Array -> Action
export const handleCuisineType = cuisineTypes => ({
  type: HANDLE_CUISINE_TYPE,
  cuisineTypes: cuisineTypes ? map(prop('value'), cuisineTypes) : [],
})

// handleDiet :: Array -> Action
export const handleDiet = diets => ({
  type: HANDLE_DIET,
  diets: diets ? map(prop('value'), diets) : [],
})

// handlePrice :: Array -> Action
export const handlePrice = prices => ({
  type: HANDLE_PRICE,
  prices: prices ? map(prop('value'), prices) : [],
})

// getCuisineTypes :: () -> Action
export const getCuisineTypes = always({ type: GET_CUISINE_TYPE_FILTERS })

// cuisineTypeFiltersReceived :: RestaurantDetails -> Action
export const cuisineTypeFiltersReceived = cuisineTypeFilters => ({
  type: CUISINE_TYPE_FILTERS_RECEIVED,
  cuisineTypeFilters,
})

// getDiets :: () -> Action
export const getDiets = always({ type: GET_DIET_FILTERS })

// dietFiltersReceived :: RestaurantDetails -> Action
export const dietFiltersReceived = dietFilters => ({
  type: DIET_FILTERS_RECEIVED,
  dietFilters,
})

// getPrices :: () -> Action
export const getPrices = always({ type: GET_PRICE_FILTERS })

// priceFiltersReceived :: RestaurantDetails -> Action
export const priceFiltersReceived = priceFilters => ({
  type: PRICE_FILTERS_RECEIVED,
  priceFilters,
})

// Session :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [HANDLE_CUISINE_TYPE]: (state, { cuisineTypes }) => ({
    ...state,
    cuisineTypes: cuisineTypes,
  }),

  [HANDLE_DIET]: (state, { diets }) => ({
    ...state,
    diets: diets,
  }),

  [HANDLE_PRICE]: (state, { prices }) => ({
    ...state,
    prices: prices,
  }),

  [CUISINE_TYPE_FILTERS_RECEIVED]: (state, { cuisineTypeFilters }) => ({
    ...state,
    cuisineTypeFilters,
    cuisineTypeFiltersLoaded: true,
  }),

  [DIET_FILTERS_RECEIVED]: (state, { dietFilters }) => ({
    ...state,
    dietFilters,
    dietFiltersLoaded: true,
  }),

  [PRICE_FILTERS_RECEIVED]: (state, { priceFilters }) => ({
    ...state,
    priceFilters,
    priceFiltersLoaded: true,
  }),
})
