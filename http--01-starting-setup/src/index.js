import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// default configuration used application-wide
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var reqInt = axios.interceptors.request.use(request => {
    console.log('[Request Interceptor]', request);
    // edit the request config
    return request;
}, error => {
    console.log('[Request Interceptor]', error);
    return Promise.reject(error);
});

var resInt = axios.interceptors.response.use(response => {
    console.log('[Response Interceptor]', response);
    // edit the response config
    return response;
}, error => {
    console.log('[Response Interceptor]', error);
    return Promise.reject(error);
});

// eject interceptors
axios.interceptors.request.eject(reqInt);
axios.interceptors.request.eject(resInt);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
