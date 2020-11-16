import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantWheel'
import * as reducer from './../Redux/State/RestaurantWheel'
import { createStateObservable, createFetchApiMock } from './../TestUtil'
import { includes } from 'ramda'

describe('Epic :: RestaurantWheel :: getRestaurantEpic', () => {
  it('dispatches RESTAURANT_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurant())
    const state$ = createStateObservable({
      RestaurantWheel: {
        address: 'Nantes'
      },
      RestaurantFilters: {
        cuisineTypes: ['pizza', 'salad'],
        diets: ['vegetarian'],
        prices: [1, 2, 3],
      }
    })
    const restaurantCollection = [
      {id: 1 },
      {id: 2 },
      {id: 3 },
    ]
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(restaurantCollection, fetchApiUrl)
    }

    epic.getRestaurantEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_RECEIVED)
        expect(includes(action.id, [1,2,3])).toBe(true)
        expect(fetchApiUrl[0]).toBe(
          '/restaurants/search'
          +'?location=Nantes'
          +'&categories[]=pizza'
          +'&categories[]=salad'
          +'&categories[]=vegetarian'
          +'&prices[]=1'
          +'&prices[]=2'
          +'&prices[]=3'
        )
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches NO_RESTAURANTS action', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurant())
    const state$ = createStateObservable({
      RestaurantWheel: {
        address: 'Nowhere'
      },
      RestaurantFilters: {
        cuisineTypes: [],
        diets: [],
        prices: [],
      }
    })
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock([], fetchApiUrl)
    }

    epic.getRestaurantEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.NO_RESTAURANTS)
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
