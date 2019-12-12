import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, ignoreElements, tap, withLatestFrom, map } from 'rxjs/operators'
import { logObservableError } from './../Util'
import { GET_COORDINATES, GET_RESTAURANT, getRestaurant } from './../Redux/State/RestaurantWheel'

// getCoordinatesEpic :: Epic -> Observable Action GET_COORDINATES
export const getCoordinatesEpic = (action$, state$) => 
  action$.pipe(
    ofType(GET_COORDINATES),
    withLatestFrom(state$),
    mergeMap(([ action, state ]) => new Promise((resolve, reject) => {

      const platform = new window.H.service.Platform({
        'apikey': 'KL3MDPUafH1De195OTkPBApqmhkX-Y7i0OG7wgA4LTg'
      });
      const geocoder = platform.getGeocodingService();

      geocoder.geocode(
        {searchText: state.RestaurantWheel.address}, 
        function(result) {
          return resolve(result.Response.View[0].Result)
        }, 
        function(e) {
          return reject(e);
        }
      );
    })),
    map(addressData => addressData[0].Location.DisplayPosition),
    tap(coordinates => coordinates),
    map(coordinates => getRestaurant(coordinates)),
    logObservableError(),
  )

// getRestaurantEpic :: Epic -> Observable Action GET_RESTAURANT
export const getRestaurantEpic = (action$, state$, { fetchApi }) => 
  action$.pipe(
    ofType(GET_RESTAURANT),
    mergeMap(action => fetchApi(
      `/venues/search?latitude=${action.coordinates.Latitude}&longitude=${action.coordinates.Longitude}`,
      {
        method: 'GET',
      }
    )),
    map(restaurant => restaurant),
    ignoreElements(),
    logObservableError(),
  )
  export default combineEpics(
    getCoordinatesEpic,
    getRestaurantEpic,
  )
