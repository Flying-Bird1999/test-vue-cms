import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'antd/dist/antd.css';

import store from './store/index'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);