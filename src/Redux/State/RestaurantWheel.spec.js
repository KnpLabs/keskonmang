import {
  default as reducer,
  INITIAL_STATE,
  handleAddress,
  getCoordinates,
  coordinatesReceived,
  getRestaurant,
  restaurantDetailsReceived,
  showRestaurant,
  backToSearch,
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

  it('reduces getCoordinates action', () => {
    expect(
      reducer(INITIAL_STATE, getCoordinates())
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
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
    expect(
      reducer(INITIAL_STATE, getRestaurant())
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
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
})
