// createFetchApi :: ((String, Object) -> Promise) -> String -> Object -> Promise
export const createFetchApi = fetcher => (url, options) =>
  fetcher(
    `${process.env.REACT_APP_API_BASE_URL}${url}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json'
      },
    }
  ).then(response => response.status < 400
    ? console.warn(response)
    : Promise.reject('An error occured')
  )
