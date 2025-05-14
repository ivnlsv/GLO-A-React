import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';

import reducer from './reducer';
import App from './components/App';
import {Provider} from 'react-redux';

const store = createStore(reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//const update = () => {
//	document.getElementById('counter').textContent = getState().value;
//};

//const incDispatch = () => dispatch(inc());
//const decDispatch = () => dispatch(dec());
//const rndDispatch = (value) => dispatch(rnd(value));

//const bindActionCreator = (creator, dispatch) => (...args) => {
//  dispatch(creator(...args))
//}

//const incDispatch = bindActionCreator(inc, dispatch);
//const decDispatch = bindActionCreator(dec, dispatch);
//const rndDispatch = bindActionCreator(rnd, dispatch);

//const {incDispatch, decDispatch, rndDispatch} = bindActionCreators({
//  incDispatch: inc,
//  decDispatch: dec,
//  rndDispatch: rnd
//}, dispatch);

//const decDispatch = bindActionCreator(dec, dispatch);
//const rndDispatch = bindActionCreator(rnd, dispatch);

//document.getElementById('inc').addEventListener('click', inc);
//document.getElementById('dec').addEventListener('click', dec);
//document.getElementById('rnd').addEventListener('click', () => {
//	const value = Math.floor(Math.random() * 10);
//	rnd(value)
//});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
