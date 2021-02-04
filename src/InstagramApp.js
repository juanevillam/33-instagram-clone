import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';

export const InstagramApp = () => {
    
    return (
        <Provider store={ store }>
        <AppRouter />   
        </Provider>
    )

};