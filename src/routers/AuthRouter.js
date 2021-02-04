import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    
    return (
        <div>
            <Switch>
                <Route path="/auth/login" component={ LoginScreen } exact />
                <Route path="/auth/register" component={ RegisterScreen } exact />
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    );

};