import {
  INITIAL_STATE,
  default as reducer,
  removeRestaurant,
  restaurantDetailsReceived,
} from './RestaurantDetails'

describe('Redux :: State :: RestaurantWheel', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces restaurantDetailsReceived action', () => {
    const state = {
      ...INITIAL_STATE,
      loading: true,
    }

    expect(
      reducer(state, restaurantDetailsReceived({ id: 12345 }))
    ).toEqual({
      ...INITIAL_STATE,
      loading: false,
      restaurant: {
        id: 12345,
      },
    })
  })

  it('reduces removeRestaurant action', () => {
    const state = {
      ...INITIAL_STATE,
      restaurant: {title: 'Restaurant'},
    }

    expect(reducer(state, removeRestaurant())).toEqual(INITIAL_STATE)
  })
})
