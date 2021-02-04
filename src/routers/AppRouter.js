import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebaseConfig';
import { InstagramScreen } from '../components/instagram/InstagramScreen';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect( () => {
        firebase.auth().onAuthStateChanged( ( user ) => {
            
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            };

            setChecking( false );

        });
    }, [ dispatch, setChecking, setIsLoggedIn ] );

    if ( checking ) {
        return (
            <h1>WAIT</h1>
        )
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={ isLoggedIn } path="/auth" component={ AuthRouter }/>
                    <PrivateRoute isAuthenticated={ isLoggedIn } path="/" component={ InstagramScreen } exact/>
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    );

};