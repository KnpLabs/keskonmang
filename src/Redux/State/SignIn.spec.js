import {
  default as reducer,
  INITIAL_STATE,
  profileReceived,
  signOutFailure,
  signOutSuccess,
  signInFailure,
  signInSuccess,
} from './SignIn'

describe('Redux :: State :: SignIn', () => {
  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces signInSuccess action', () => {
    const s1 = {
      ...INITIAL_STATE,
      signInError: true,
    }

    expect(
      reducer(s1, signInSuccess())
    ).toEqual({
      ...s1,
      isSignedIn: true,
      signInError: false,
    })
  })

  it('reduces signInFailure action', () => {
    expect(
      reducer(INITIAL_STATE, signInFailure())
    ).toEqual({
      ...INITIAL_STATE,
      signInError: true,
    })
  })

  it('reduces signOutSuccess action', () => {
    const s1 = {
      ...INITIAL_STATE,
      user: {
        name: 'knpeer',
      }
    }

    expect(
      reducer(s1, signOutSuccess())
    ).toEqual(
      INITIAL_STATE
    )
  })

  it('reduces signOutFailure action', () => {
    expect(
      reducer(INITIAL_STATE, signOutFailure())
    ).toEqual({
      ...INITIAL_STATE,
      signOutError: true,
    })
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
