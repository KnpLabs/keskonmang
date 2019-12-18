import {
  default as reducer,
  INITIAL_STATE,
  profileReceived,
} from './Session'

describe('Redux :: State :: SignIn', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces profileReceived action', () => {
    expect(
      reducer(INITIAL_STATE, profileReceived({ name: 'knpeer' }))
    ).toEqual({
      ...INITIAL_STATE,
      user: {
        name: 'knpeer',
      },
    })
  })
})
