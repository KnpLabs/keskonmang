import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantWheel'
import * as reducer from './../Redux/State/RestaurantWheel'
import { createStateObservable } from './../TestUtil'
import { includes } from 'ramda'

describe('Epic :: RestaurantWheel :: getRestaurantEpic', () => {
  it('dispatches RESTAURANT_RECEIVED epic', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurant())
    const state$ = createStateObservable({
      RestaurantWheel: {
        address: 'Nantes'
      }
    })
    const restaurantCollection = [
      {id: 1 },
      {id: 2 },
      {id: 3 },
    ]
    const fetchApiCalls = []
    const deps = {
      fetchApi: (url, options) => {
        fetchApiCalls.push([url, options])
        return Promise.resolve(restaurantCollection)
      }
    }

    epic.getRestaurantEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_RECEIVED)
        expect(includes(action.id, [1,2,3])).toBe(true)
        expect(fetchApiCalls[0][0]).toBe('/restaurants/search?location=Nantes')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantWheel :: getRestaurantDetailsEpic', () => {
  it('dispatches RESTAURANT_DETAILS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.restaurantReceived('b2trgkc2drvWDHDpakDLjQ'))
    const restaurantMock = {
      id: 1,
      name: 'The Shelter'
    }
    const fetchApiCalls = []
    const deps = {
      fetchApi: (url, options) => {
        fetchApiCalls.push([url, options])
        return Promise.resolve(restaurantMock)
      }
    }

    epic.getRestaurantDetailsEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(restaurantMock)
        expect(fetchApiCalls[0][0]).toBe('/restaurants/b2trgkc2drvWDHDpakDLjQ')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantWheel :: showRestaurantEpic', () => {
  it('dispatches SHOW_RESTAURANT action', done => {
    const action$ = ActionsObservable.of(reducer.restaurantDetailsReceived())

    epic.showRestaurantEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.SHOW_RESTAURANT)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
