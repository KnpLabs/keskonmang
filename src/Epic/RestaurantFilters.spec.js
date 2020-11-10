import { ActionsObservable } from 'redux-observable'
import * as epic from './RestaurantFilters'
import * as reducer from './../Redux/State/RestaurantFilters'
import { createStateObservable, createFetchApiMock } from './../TestUtil'
import { includes } from 'ramda'

describe('Epic :: RestaurantFilters :: getCuisineTypeFiltersEpic', () => {
  it('dispatches CUISINE_TYPE_FILTERS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getCuisineTypes())
    const filters = ['pizza', 'burger', 'bistro']
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(filters, fetchApiUrl)
    }

    epic.getCuisineTypeFiltersEpic(action$, {}, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.CUISINE_TYPE_FILTERS_RECEIVED)
        expect(action.cuisineTypeFilters).toEqual(filters)
        expect(fetchApiUrl[0]).toBe('/restaurants/filters/cuisine-types')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantFilters :: getDietFiltersEpic', () => {
  it('dispatches DIET_FILTERS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getDiets())
    const filters = ['vegetarian', 'gluten_free', 'hallal']
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(filters, fetchApiUrl)
    }

    epic.getDietFiltersEpic(action$, {}, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.DIET_FILTERS_RECEIVED)
        expect(action.dietFilters).toEqual(filters)
        expect(fetchApiUrl[0]).toBe('/restaurants/filters/diets')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: RestaurantFilters :: getPriceFiltersEpic', () => {
  it('dispatches PRICE_FILTERS_RECEIVED action', done => {
    const action$ = ActionsObservable.of(reducer.getPrices())
    const filters = [1, 2, 3, 4]
    const fetchApiUrl = []
    const deps = {
      fetchApi: createFetchApiMock(filters, fetchApiUrl)
    }

    epic.getPriceFiltersEpic(action$, {}, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.PRICE_FILTERS_RECEIVED)
        expect(action.priceFilters).toEqual(filters)
        expect(fetchApiUrl[0]).toBe('/restaurants/filters/prices')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
