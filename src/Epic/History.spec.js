import { ActionsObservable } from 'redux-observable'
import * as epic from './History'
import * as reducer from './../Redux/State/History'
import { ADD_TOAST } from './../Redux/State/Toast'
import { createStateObservable, createFetchApiMock } from './../TestUtil'

describe('Epic :: History :: addHistoryEpic', () => {
  it('dispatches ADD_TOAST action', done => {
    const action$ = ActionsObservable.of(reducer.addHistory())
    const state$ = createStateObservable({
      Session: {
        user: {name: 'name'}
      },
      RestaurantDetails: {
        restaurant: {title: 'Restaurant'}
      }
    })
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock({}, fetchApiUrl)
    }

    epic.addHistoryEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(ADD_TOAST)
        expect(fetchApiUrl[0]).toBe('/history/create')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: History :: getHistoriesEpic', () => {
  it('dispatches HISTORIES_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getHistories(2))
    const state$ = createStateObservable({
      Session: {
        user: {token: 'token'}
      },
      History: {
        page: 2
      }
    })
    const fetchApiUrl = []
    const historiesMock = [{title: 'History 1'}, {title: 'History 2'}]
    const deps = {
      fetchApi: createFetchApiMock(historiesMock, fetchApiUrl)
    }

    epic.getHistoriesEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.HISTORIES_RECEIVED)
        expect(action.histories).toEqual(historiesMock)
        expect(action.totalPages).toEqual(1)
        expect(fetchApiUrl[0]).toBe('/history/list?page=2')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: History :: getHistoryRestaurantEpic', () => {
  it('dispatches HISTORIES_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getHistoryRestaurant(1, 2))
    const state$ = createStateObservable({
      History: {
        histories: [],
      }
    })

    const fetchApiUrl = []
    const restaurantMock = { name: 'restaurant' }
    const deps = {
      fetchApi: createFetchApiMock(restaurantMock, fetchApiUrl)
    }

    epic.getHistoryRestaurantEpic(action$, state$, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.HISTORY_RESTAURANT_RECEIVED)
        expect(action.restaurant).toEqual(restaurantMock)
        expect(action.historyId).toEqual(1)
        expect(fetchApiUrl[0]).toBe('/restaurants/2')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('does not nothing if the restaurant is already fetched for an history', done => {
    const action$ = ActionsObservable.of(reducer.getHistoryRestaurant(1, 2))
    const state$ = createStateObservable({
      History: {
        histories: [{ id: 1, restaurant: {} }],
      }
    })

    epic.getHistoryRestaurantEpic(action$, state$, {})
      .toPromise(Promise)
      .then(action => {
        expect(action).toEqual(undefined)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
