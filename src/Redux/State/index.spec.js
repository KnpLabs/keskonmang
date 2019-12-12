import * as Module from './index'

describe('Redux :: Module', () => {
  it('contains the SignIn state', () => {
    const state = Module.default()

    expect(state.SignIn).toBeDefined()
  })

  it('contains the Session state', () => {
    const state = Module.default()

    expect(state.Session).toBeDefined()
  })  
})
