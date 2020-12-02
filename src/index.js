import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './containers/App/App';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { setImgURL, setFaceBox, setAuth } from './reducers';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import './index.css'

const rootReducer = combineReducers({ setImgURL, setFaceBox, setAuth });

const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();