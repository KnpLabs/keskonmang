import { ifElse, isNil } from 'ramda'

// createFetchApi :: Fetcher -> (String, Object, String) -> Object -> Promise
export const createFetchApi = fetcher => (url, options = {}, token = null) =>
  fetcher(
    `${process.env.REACT_APP_API_BASE_URL}${url}`,
    generateOptions(options, token),
  ).then(response => response.status < 400
    ? response.json()
    : Promise.reject('An error occured')
  )

// generateOptions :: (Array, String) -> Object
const generateOptions = (options, token = null) => ifElse(
  () => isNil(token),
  () => ({
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  () => ({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  }),
)()
