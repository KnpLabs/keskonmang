import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantDetails'
import * as reducer from './../Redux/State/RestaurantDetails'
import { restaurantReceived } from './../Redux/State/RestaurantWheel'
import { createFetchApiMock } from './../TestUtil'

describe('Epic :: RestaurantDetails :: getRestaurantEpic', () => {
  it('dispatches GET_RESTAURANT_DETAILS action', done => {
    const action$ = ActionsObservable.of(restaurantReceived('b2trgkc2drvWDHDpakDLjQ'))

    epic.getRestaurantEpic(action$, null, null)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.GET_RESTAURANT_DETAILS)
        expect(action.restaurantId).toEqual('b2trgkc2drvWDHDpakDLjQ')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantDetails :: getRestaurantDetailsEpic', () => {
  it('dispatches RESTAURANT_DETAILS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurantDetails('b2trgkc2drvWDHDpakDLjQ'))
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
