import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import userReducer from './reducers/userReducer';
import todoReducer from './reducers/todoReducers';
const masterReducer=combineReducers({
  users:userReducer,
  todos:todoReducer 
})


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store =createStore(masterReducer,{users:[{name:'Mahtab',email:'ask2mahtab@gmail.com'},
{name:'sunil',email:'ravi@gmail.com'}
],todos:[{task:'Edit',date:'12-11-2020',status:'ToDo'}]},composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
