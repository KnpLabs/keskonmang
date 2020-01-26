// createFetchApi :: (Fetcher, GoogleApi) -> String -> Object -> Promise
export const createFetchApi = (fetcher, googleApi) => (url, options) =>
  fetcher(
    `${process.env.REACT_APP_API_BASE_URL}${url}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json'
      },
    }
  ).then(response => response.status < 400
    ? response.json()
    : Promise.reject('An error occured')
  )
