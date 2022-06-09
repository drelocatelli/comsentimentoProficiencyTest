import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import './basic.css';
import { Provider } from 'react-redux';
import { store } from './store/storeConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <Provider store={store}>
        <App /> 
    </Provider>
);