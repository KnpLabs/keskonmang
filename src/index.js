import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './Epic'
import { default as mainReducer, debug } from './Redux/State'
import { createFetchApi } from './FetchApi'

const getGoogleApi = () => window.gapi

// getHerePlatform :: () -> Here.Platform
const getHerePlatform = () => new window.H.service.Platform({
  'apikey': process.env.REACT_APP_HERE_API_KEY,
});

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    fetchApi: createFetchApi(fetch, getGoogleApi),
    getGoogleApi,
    getHerePlatform,
  },
})

const middleware = applyMiddleware(epicMiddleware);
const reducer = Number(process.env.REACT_APP_DEBUG_STATE)
  ? debug(mainReducer)
  : mainReducer

const store = createStore(reducer, reducer(), middleware)

epicMiddleware.run(rootEpic);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
