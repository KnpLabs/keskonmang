import React from 'react'
import { Provider } from 'react-redux'
import Firewall from './Firewall'
import Menu from './Menu'
import RestaurantWheel from './RestaurantWheel'
import RestaurantDetails from './RestaurantDetails'

export default ({
  store,
}) =>
  <Provider store={store}>
    <Firewall>
      <Menu/>
    </Firewall>
    <RestaurantWheel/>
    <RestaurantDetails/>
  </Provider>
