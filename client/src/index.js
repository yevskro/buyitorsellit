import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import itemsReducer from './reducers/Items'
import itemReducer from './reducers/Item'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    items: itemsReducer,
    item: itemReducer
})

const store = createStore(rootReducer,  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    document.getElementById('root')
    );




