import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantWheel'
import * as reducer from './../Redux/State/RestaurantWheel'
import { createStateObservable } from './../TestUtil'
import { includes } from 'ramda'

describe('Epic :: RestaurantWheel :: getCoordinatesEpic', () => {
  it('dispatches COORDINATES_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getCoordinates())
    const state$ = createStateObservable({
      RestaurantWheel: {
        address: '11, rue Kervegan, 44100 NANTES'
      }
    })
    const geocoderResponseMock = {
      Response: {
        View: [
          {
            Result: [
              {
                Location: {
                  DisplayPosition: {
                    Latitude: 12.5,
                    Longitude: -40.3,
                  },
                },
              },
            ],
          },
        ],
      },
    }

    const deps = {
      getHerePlatform: () => ({
        getGeocodingService: () => ({
          geocode: (options, onSuccess, onFailure) => onSuccess(geocoderResponseMock)
        })
      })
    }

    epic.getCoordinatesEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action).toEqual({
          type: reducer.COORDINATES_RECEIVED,
          latitude: 12.5,
          longitude: -40.3,
        })
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})

describe('Epic :: RestaurantWheel :: coordinatesToRestaurantEpic', () => {
  it('dispatches GET_RESTAURANT action', done => {
    const action$ = ActionsObservable.of(reducer.coordinatesReceived(12.5, 11.3))

    epic.coordinatesToRestaurantEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.GET_RESTAURANT)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches INVALID_ADDRESS action', done => {
    const action$ = ActionsObservable.of(reducer.coordinatesReceived(undefined, 12.5))

    epic.coordinatesToRestaurantEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.INVALID_ADDRESS)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantWheel :: getRestaurantEpic', () => {
  it('dispatches RESTAURANT_RECEIVED epic', done => {
    const action$ = ActionsObservable.of(reducer.getRestaurant())
    const state$ = createStateObservable({
      RestaurantWheel: {
        latitude: 12.5,
        longitude: 12.3,
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
        expect(fetchApiCalls[0][0]).toBe('/venues/search?latitude=12.5&longitude=12.3')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantWheel :: getRestaurantDetailsEpic', () => {
  it('dispatches RESTAURANT_DETAILS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.restaurantReceived('DLKJG-21048'))
    const restaurantMock = {
      id: 1,
      name: 'The Shelter'
    }
    const fetchApiCalls = []
    const deps = {
      fetchApi: (url, options) => {
        fetchApiCalls.push([url, options])
        return Promise.resolve(restaurantMock)
      },
      premiumEndpointsDisabled: false,
    }

    epic.getRestaurantDetailsEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.RESTAURANT_DETAILS_RECEIVED)
        expect(action.restaurant).toEqual(restaurantMock)
        expect(fetchApiCalls[0][0]).toBe('/venues/DLKJG-21048')
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
