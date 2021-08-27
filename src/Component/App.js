import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import Histories from './Histories'
import Logo from './Logo'
import Menu from './Menu'
import RestaurantWheel from './RestaurantWheel'
import RestaurantDetails from './RestaurantDetails'
import Toast from './Toast'
import '../Style/App.css'

export default ({
  store,
}) =>
  <BrowserRouter>
    <Provider store={store}>
      <div className="container main-container">
        <Logo/>
        <Toast/>
        <Menu/>

        <Switch>
          <Route exact path="/restaurant/:id">
            <RestaurantDetails/>
          </Route>
          <Route path="/history">
            <Histories />
          </Route>
          <Route path="/">
            <RestaurantWheel/>
          </Route>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
