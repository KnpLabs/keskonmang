import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import { propOr } from 'ramda'
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
          <Route exact path="/restaurant/:id" render={({match}) => (
            <RestaurantDetails 
              restaurantId={match.params.id}
              isAlreadyLoaded={propOr(
                null,
                'id',
                store.getState().RestaurantDetails.restaurant
              ) === match.params.id}
            />
          )} />
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
