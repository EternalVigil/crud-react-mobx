import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';

import App from './components/App/';
import './index.css';
import * as serviceWorker from './serviceWorker';

import DataStore from './stores/DataStore';

ReactDOM.render(
	<Provider AppStore={DataStore}>
    	<App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
