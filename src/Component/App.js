import React from 'react'
import { Provider } from 'react-redux'
import SignIn from './SignIn'

export default ({
  store,
}) =>
  <Provider store={store}>
    <div>
      <SignIn/>
    </div>
  </Provider>
