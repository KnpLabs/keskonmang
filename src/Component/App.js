import React from 'react'
import { Provider } from 'react-redux'
import Firewall from './Firewall'
import Menu from './Menu'
import RestaurantWheel from './RestaurantWheel'
import RestaurantDetails from './RestaurantDetails'
import Logo from './Logo'
import '../Style/App.css';

export default ({
  store,
}) =>
  <Provider store={store}>
    <Logo/>
    <Firewall>
      <Menu/>
    </Firewall>
    <RestaurantWheel/>
    <RestaurantDetails/>
  </Provider>
