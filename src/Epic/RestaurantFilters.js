import { ofType, combineEpics } from 'redux-observable'
import {
  logObservableError,
} from './../Util'
import {
  map,
  mergeMap,
} from 'rxjs/operators'
import {
  GET_CUISINE_TYPE_FILTERS,
  GET_DIET_FILTERS,
  GET_PRICE_FILTERS,
  cuisineTypeFiltersReceived,
  dietFiltersReceived,
  priceFiltersReceived,
} from './../Redux/State/RestaurantFilters'

// getCuisineTypeFiltersEpic :: Epic -> Observable Action CUISINE_TYPE_FILTERS_RECEIVED
export const getCuisineTypeFiltersEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_CUISINE_TYPE_FILTERS),
    mergeMap(() => fetchApi(
      '/restaurants/filters/cuisine-types',
      { method: 'GET' },
    )),
    map(response => cuisineTypeFiltersReceived(response.body)),
    logObservableError(),
  )

// getDietFiltersEpic :: Epic -> Observable Action DIET_FILTERS_RECEIVED
export const getDietFiltersEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_DIET_FILTERS),
    mergeMap(() => fetchApi(
      '/restaurants/filters/diets',
      { method: 'GET' },
    )),
    map(response => dietFiltersReceived(response.body)),
    logObservableError(),
  )

// getPriceFiltersEpic :: Epic -> Observable Action PRICE_FILTERS_RECEIVED
export const getPriceFiltersEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(GET_PRICE_FILTERS),
    mergeMap(() => fetchApi(
      '/restaurants/filters/prices',
      { method: 'GET' },
    )),
    map(response => priceFiltersReceived(response.body)),
    logObservableError(),
  )

export default combineEpics(
  getCuisineTypeFiltersEpic,
  getDietFiltersEpic,
  getPriceFiltersEpic,
)
