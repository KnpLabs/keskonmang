import React from 'react'
import { Provider } from 'react-redux'
import Firewall from './Firewall'
import Menu from './Menu'
import RestaurantWheel from './RestaurantWheel'

export default ({
  store,
}) =>
  <Provider store={store}>
    <Firewall>
      <Menu/>
    </Firewall>
    <RestaurantWheel/>
  </Provider>
