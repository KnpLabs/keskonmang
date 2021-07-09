import {
  INITIAL_STATE,
  default as reducer,
  getHistories,
  historiesReceived,
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

    expect(
      reducer(INITIAL_STATE, getHistories(2))
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
      page: 2,
    })
  })

  it('reduces historiesReceived action', () => {
    expect(
      reducer(INITIAL_STATE, historiesReceived([{title: 'history 1'}, {title: 'History 2'}], 2))
    ).toEqual({
      ...INITIAL_STATE,
      histories: [{title: 'history 1'}, {title: 'History 2'}],
      totalPages: 2,
    })
  })
})
