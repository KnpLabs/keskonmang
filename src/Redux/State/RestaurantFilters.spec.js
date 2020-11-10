import {
  INITIAL_STATE,
  cuisineTypeFiltersReceived,
  default as reducer,
  dietFiltersReceived,
  priceFiltersReceived,
  handleCuisineType,
  handleDiet,
  handlePrice,
} from './RestaurantFilters'

describe('Redux :: State :: RestaurantFilters', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces handleCuisineType action', () => {
    expect(
      reducer(INITIAL_STATE, handleCuisineType([{value: 'pizza', label: 'pizza'}, {value: 'wok', label: 'wok'}]))
    ).toEqual({
      ...INITIAL_STATE,
      cuisineTypes: ['pizza', 'wok'],
    })
  })

  it('reduces handleDiet action', () => {
    expect(
      reducer(INITIAL_STATE, handleDiet([{value: 'vegetarian', label: 'vegetarian'}]))
    ).toEqual({
      ...INITIAL_STATE,
      diets: ['vegetarian'],
    })
  })

  it('reduces handlePrice action', () => {
    expect(
      reducer(INITIAL_STATE, handlePrice([{value: 1, label: '$'}, {value: 2, label: '$$'}, {value: 3, label: '$$$'}]))
    ).toEqual({
      ...INITIAL_STATE,
      prices: [1, 2, 3],
    })
  })

  it('reduces cuisineTypeFiltersReceived action', () => {
    expect(
      reducer(INITIAL_STATE, cuisineTypeFiltersReceived(['pizza', 'burger', 'wrap']))
    ).toEqual({
      ...INITIAL_STATE,
      cuisineTypeFiltersLoaded: true,
      cuisineTypeFilters: ['pizza', 'burger', 'wrap']
    })
  })

  it('reduces dietFiltersReceived action', () => {
    expect(
      reducer(INITIAL_STATE, dietFiltersReceived(['vegetarian', 'gluten_free', 'hallal']))
    ).toEqual({
      ...INITIAL_STATE,
      dietFiltersLoaded: true,
      dietFilters: ['vegetarian', 'gluten_free', 'hallal']
    })
  })

  it('reduces priceFiltersReceived action', () => {
    expect(
      reducer(INITIAL_STATE, priceFiltersReceived([1, 2, 3, 4]))
    ).toEqual({
      ...INITIAL_STATE,
      priceFiltersLoaded: true,
      priceFilters: [1, 2, 3, 4]
    })
  })
})
