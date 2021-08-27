import {
  INITIAL_STATE,
  default as reducer,
  fetchError,
  getRestaurant,
  handleAddress,
  noRestaurants,
} from './RestaurantWheel'

describe('Redux :: State :: RestaurantWheel', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces handleAddress action', () => {
    expect(
      reducer(INITIAL_STATE, handleAddress('11, rue Kervegan'))
    ).toEqual({
      ...INITIAL_STATE,
      address: '11, rue Kervegan',
    })
  })

  it('reduces getRestaurant action', () => {
    const s1 = {
      ...INITIAL_STATE,
      fetchError: true,
    }

    expect(
      reducer(INITIAL_STATE, getRestaurant())
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      fetchError: false,
    })
  })

  it('reduces fetchError action', () => {
    const s1 = {
      ...INITIAL_STATE,
      loading: true,
    }

    expect(
      reducer(s1, fetchError())
    ).toEqual({
      ...s1,
      fetchError: true,
      loading: false,
    })
  })

  it('reduces noRestaurants action', () => {
    expect(
      reducer(INITIAL_STATE, noRestaurants())
    ).toEqual({
      ...INITIAL_STATE,
      noRestaurants: true,
      loading: false,
    })
  })
})
