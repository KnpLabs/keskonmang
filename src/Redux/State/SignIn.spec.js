import {
  default as reducer,
  INITIAL_STATE,
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
      isSignedIn: true,
      signInError: true,
      signOutError: true,
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
})
