import Swal from 'sweetalert2';
import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from './ui';

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({    
    type: types.logout
});

export const startLoginWithEmailPassword = ( email, password ) => {
    
    return ( dispatch ) => {

        dispatch( startLoading() );
        Swal.showLoading();
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ( { user } ) => {
            dispatch( login( user.uid, user.email ));
            dispatch( finishLoading() );
            Swal.close();
            Swal.fire('Good job!', 'You logged in successfully', 'success');
        })
        .catch( e => {
            console.log( e );
            dispatch( finishLoading() );
            Swal.fire( 'Error', e.message, 'error' );
        })

    };

};

export const startGoogleLogin = () => {
    
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ( { user } ) => {
            dispatch( login( user.uid, user.displayName ) );
            Swal.fire('Good job!', 'You logged in successfully', 'success');
        });

    };

};

export const startRegisterWithEmailPasswordUsername = ( email, password, username ) => {
    
    return ( dispatch ) => {

        Swal.showLoading();

        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async( { user } ) => {
            await user.updateProfile( { displayName: username } );
            dispatch( login( user.uid, user.displayName ) );
            Swal.close();
            Swal.fire('Good job!', 'You registered in successfully', 'success');
        })
        .catch( e => {
            Swal.fire( 'Error', e.message, 'error' );
        });

    };

};

export const startLogout = () => {
    
    return async( dispatch ) => {
        Swal.showLoading();
        await firebase.auth().signOut();
        dispatch( logout() );
        Swal.close();
        Swal.fire('Bye', 'You logged out successfully', 'success');
    };

};