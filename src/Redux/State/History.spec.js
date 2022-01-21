import {
  INITIAL_STATE,
  clear,
  default as reducer,
  getHistories,
  getNextHistories,
  nextHistoriesReceived,
  historiesReceived,
  historyRestaurantReceived,
} from './History'

describe('Redux :: State :: History', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces getHistories action', () => {
    expect(
      reducer(INITIAL_STATE, getHistories())
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      page: 1,
    })
  })

  it('reduces getNextHistories action', () => {
    expect(
      reducer(INITIAL_STATE, getNextHistories())
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      page: 2,
    })

    const nextState = {
      ...INITIAL_STATE,
      page: 2,
    }

    expect(
      reducer(nextState, getNextHistories())
    ).toEqual({
      ...nextState,
      loading: true,
      page: 3,
    })
  })

  it('reduces historiesReceived action', () => {
    expect(
      reducer(INITIAL_STATE, historiesReceived([{title: 'history 1'}, {title: 'History 2'}], 2))
    ).toEqual({
      ...INITIAL_STATE,
      histories: [{title: 'history 1'}, {title: 'History 2'}],
      totalPages: 2,
      loading: false,
    })
  })

  it('reduces nextHistoriesReceived action', () => {
    const state = {
      ...INITIAL_STATE,
      histories: [{title: 'history 1'}, {title: 'History 2'}],
    }

    expect(
      reducer(state, nextHistoriesReceived([{title: 'history 3'}, {title: 'History 4'}], 4))
    ).toEqual({
      ...state,
      histories: [
        {title: 'history 1'},
        {title: 'History 2'},
        {title: 'history 3'},
        {title: 'History 4'},
      ],
      totalPages: 4,
      loading: false,
    })
  })

  it('reduces historyRestaurantReceived action', () => {
    const state = {
      ...INITIAL_STATE,
      histories: [{
        id: 1,
      }],
    }

    expect(
      reducer(state, historyRestaurantReceived(1, { name:'restaurant' }))
    ).toEqual({
      ...INITIAL_STATE,
      histories: [{
        id: 1,
        restaurant: { name: 'restaurant' },
      }],
    })
  })

  it('reduces clear action', () => {
    const state = {
      ...INITIAL_STATE,
      histories: [{
        id: 1,
      }],
    }

    expect(
      reducer(state, clear())
    ).toEqual(INITIAL_STATE)
  })
})
