import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';
import './index.css';
import './assets/animate/index.css';
import './assets/animsition/css/index.css';
import './assets/css-hamburgers/index.css';
//import './assets/jquery/index.min.js'
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import store from "./store/store";




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
