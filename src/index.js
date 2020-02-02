import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import coverReducer from './store/reducers/CoverBuilder'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(coverReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store} >
      <App />
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



// #4F60FD
// #5061FF
// #272937
// #1B1C21
// #B5C1FF
// #7D84C1




// https://accounts.spotify.com/authorize