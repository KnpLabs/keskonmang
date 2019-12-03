import React from 'react'
import { Provider } from 'react-redux'
import Firewall from './Firewall'

export default ({
  store,
}) =>
  <Provider store={store}>
    <Firewall>
      coucou
    </Firewall>
  </Provider>
