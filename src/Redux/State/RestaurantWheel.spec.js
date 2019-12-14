import {
  INITIAL_STATE,
  backToSearch,
  coordinatesReceived,
  default as reducer,
  fetchError,
  getCoordinates,
  getRestaurant,
  handleAddress,
  invalidAddress,
  restaurantDetailsReceived,
  showRestaurant,
} from './RestaurantWheel'

describe('Redux :: State :: RestaurantWheel', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces handleAddress action', () => {
    const s1 = {
      ...INITIAL_STATE,
      invalidAddress: true,
    }

    expect(
      reducer(s1, handleAddress('11, rue Kervegan'))
    ).toEqual({
      ...s1,
      address: '11, rue Kervegan',
      invalidAddress: false,
    })
  })

  it('reduces getCoordinates action', () => {
    const s1 = {
      ...INITIAL_STATE,
      fetchError: true,
    }

    expect(
      reducer(INITIAL_STATE, getCoordinates())
    ).toEqual({
      ...INITIAL_STATE,
      fetchError: false,
    })
  })

  it('reduces coordinatesReceived action', () => {
    expect(
      reducer(INITIAL_STATE, coordinatesReceived(12.5, -12.3))
    ).toEqual({
      ...INITIAL_STATE,
      latitude: 12.5,
      longitude: -12.3,
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

  it('reduces restaurantDetailsReceived action', () => {
    const s1 = {
      ...INITIAL_STATE,
      loading: true,
    }

    expect(
      reducer(INITIAL_STATE, restaurantDetailsReceived({ id: 12345 }))
    ).toEqual({
      ...s1,
      loading: false,
      restaurant: {
        id: 12345,
      },
    })
  })

  it('reduces showRestaurant action', () => {
    expect(
      reducer(INITIAL_STATE, showRestaurant())
    ).toEqual({
      ...INITIAL_STATE,
      restaurantShown: true,
    })
  })

  it('reduces backToSearch action', () => {
    const s1 = {
      ...INITIAL_STATE,
      restaurantShown: true,
    }

    expect(
      reducer(s1, backToSearch())
    ).toEqual({
      ...s1,
      restaurantShown: false,
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

  it('reduces invalidAddress action', () => {
    expect(
      reducer(INITIAL_STATE, invalidAddress())
    ).toEqual({
      ...INITIAL_STATE,
      invalidAddress: true,
    })
  })
})
