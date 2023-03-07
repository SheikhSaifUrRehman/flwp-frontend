import React, { useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';
import { ToastContainer } from 'react-toastify';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import { SocketProvider } from './contexts/socketContext';
import 'simplebar/src/simplebar.css';

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnchancer(applyMiddleware(Thunk))
);
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={4000}>
      <Provider store={store}>
        <SocketProvider>
          <App />
          <ToastContainer />
        </SocketProvider>
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
