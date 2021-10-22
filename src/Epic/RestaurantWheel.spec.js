import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantWheel'
import * as reducer from './../Redux/State/RestaurantWheel'
import { restaurantReceived } from './../Redux/State/RestaurantWheel'
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

describe('Epic :: RestaurantWheel :: getRestaurantEpic', () => {
  it('dispatches GET_RESTAURANT_DETAILS action', done => {
    const action$ = ActionsObservable.of(restaurantReceived('restaurant-id'))
    let newLocation = null
    const deps = {
      location: {
        replace: location => {
          newLocation = location
        }
      }
    }

    epic.redirectToRestaurantDetailsEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action).toEqual(undefined)
        expect(newLocation).toEqual('/restaurant/restaurant-id')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
