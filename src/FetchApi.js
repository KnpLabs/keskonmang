import { pipe, propOr } from 'ramda'

// getToken :: GoogleApi -> String
const getToken = pipe(
  googleApi => googleApi()
    .auth2
    .getAuthInstance()
    .currentUser
    .get()
    .getAuthResponse(true)
  ,
  propOr(null, 'id_token'),
)

const defaultHeaders = {
  'Content-Type': 'application/json'
}

// createFetchApi :: (Fetcher, GoogleApi) -> String -> Object -> Promise
export const createFetchApi = (fetcher, googleApi) => (url, options) =>
  fetcher(
    `${process.env.REACT_APP_API_BASE_URL}${url}`,
    {
      ...options,
      headers: getToken(googleApi) !== null
        ? {
          'Authorization': `Bearer ${getToken(googleApi)}`,
          ...defaultHeaders,
        }
        : defaultHeaders
    }
  ).then(response => response.status < 400
    ? response.json()
    : Promise.reject('An error occured')
  )
