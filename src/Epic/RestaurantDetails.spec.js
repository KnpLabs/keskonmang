import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantDetails'
import * as reducer from './../Redux/State/RestaurantDetails'
import { restaurantReceived } from './../Redux/State/RestaurantWheel'
import { createStateObservable, createFetchApiMock } from './../TestUtil'

const createMockRestaurant = id => ({
  id,
  name: 'Restaurant name'
})

describe('Epic :: RestaurantDetails :: getRestaurantEpic', () => {
  it('dispatches GET_RESTAURANT_DETAILS action', done => {
    const action$ = ActionsObservable.of(restaurantReceived('restaurant-id'))

    epic.getRestaurantEpic(action$, null, null)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.GET_RESTAURANT_DETAILS)
        expect(action.restaurantId).toEqual('restaurant-id')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantDetails :: getRestaurantDetailsEpic', () => {
  it('dispatches RESTAURANT_DETAILS_RECEIVED action when no previous fetched restaurant', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurantDetails('restaurant-id'))
    const state$ = createStateObservable({
      RestaurantDetails: {
        restaurant: null,
      }
    })
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(createMockRestaurant('restaurant-id'), fetchApiUrl)
    }

    epic.getRestaurantDetailsEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(createMockRestaurant('restaurant-id'))
        expect(fetchApiUrl[0]).toBe('/restaurants/restaurant-id')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches RESTAURANT_DETAILS_RECEIVED action when different restaurant fetched', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurantDetails('restaurant-id'))
    const state$ = createStateObservable({
      RestaurantDetails: {
        restaurant: createMockRestaurant('anotherId'),
      }
    })
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(createMockRestaurant('restaurant-id'), fetchApiUrl)
    }

    epic.getRestaurantDetailsEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(createMockRestaurant('restaurant-id'))
        expect(fetchApiUrl[0]).toBe('/restaurants/restaurant-id')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches RESTAURANT_DETAILS_RECEIVED action when already fetched restaurant', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurantDetails('restaurant-id'))
    const state$ = createStateObservable({
      RestaurantDetails: {
        restaurant: createMockRestaurant('restaurant-id'),
      }
    })
    const deps = {
      fetchApi: () => ({}),
    }

    epic.getRestaurantDetailsEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(createMockRestaurant('restaurant-id'))
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
