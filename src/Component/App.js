import React from 'react'
import { Provider } from 'react-redux'
import RestaurantWheel from './RestaurantWheel'
import RestaurantDetails from './RestaurantDetails'
import Logo from './Logo'
import '../Style/App.css';

export default ({
  store,
}) =>
  <Provider store={store}>
    <div className="container main-container">
      <Logo/>
      <RestaurantWheel/>
      <RestaurantDetails/>
    </div>
  </Provider>
