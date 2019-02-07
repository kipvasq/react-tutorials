import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import { Provider } from 'react-redux';
import App from './js/components/App';
import store, { history } from "./js/store/index";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

