import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

export const store = createStore( 
    reducers,
    applyMiddleware( thunk )
);