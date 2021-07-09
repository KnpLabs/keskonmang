import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantDetails'
import * as reducer from './../Redux/State/RestaurantDetails'
import { restaurantReceived } from './../Redux/State/RestaurantWheel'
import { createFetchApiMock } from './../TestUtil'

describe('Epic :: RestaurantDetails :: getRestaurantDetailsEpic', () => {
  it('dispatches RESTAURANT_DETAILS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(restaurantReceived('b2trgkc2drvWDHDpakDLjQ'))
    const restaurantMock = {
      id: 1,
      name: 'The Shelter'
    }
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(restaurantMock, fetchApiUrl)
    }

    epic.getRestaurantDetailsEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(restaurantMock)
        expect(fetchApiUrl[0]).toBe('/restaurants/b2trgkc2drvWDHDpakDLjQ')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
