import React from 'react'
import { Provider } from 'react-redux'
import Firewall from './Firewall'
import Menu from './Menu'

export default ({
  store,
}) =>
  <Provider store={store}>
    <Firewall>
      <Menu/>
    </Firewall>
  </Provider>
