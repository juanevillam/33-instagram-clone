import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';

import '../../assets/css/util.css';
import '../../assets/css/main.css';
import '../../assets/css/google-btn.scss';
import '../../assets/vendor/animate/animate.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = ( e ) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startLoginWithEmailPassword( email, password ) );
        };

    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {
        
        if ( !validator.isEmail( email ) ) {
            dispatch( setError( 'Email is not valid') );
            return false;

        } else if ( password.trim().length < 6 ){
            dispatch( setError( 'Password must be at least 6 letters') );
            return false;
        } else {
            dispatch( removeError() );
            
            return true;
        };

    };
    
    return (
        <div>
            <div className="limiter animated fadeInLeft">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <form onSubmit={ handleLogin } className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-51">Login</span>
                            { msgError && (
                                <div className="container-loginError-form-btn m-b-16 animated fadeIn">
                                    <p className="container-loginError-form-btn">{ msgError }</p>
                                </div> 
                                )
                            }
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="text" name="email" value={ email } onChange={ handleInputChange } required placeholder="Email" autoComplete="off"/>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16" data-validate = "Password is required">
                                <input className="input100" type="password" name="password" value={ password } onChange={ handleInputChange } required minLength="6" placeholder="Password" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100" htmlFor="ckb1">Remember my username</label>
                                </div>
                                <div>
                                    <Link to="/auth/register" className="txt1">You do not have an account?</Link>
                                </div>
                            </div>
                            <div className="container-login100-form-btn m-t-17">
                                <button onClick={ handleLogin } className="login100-form-btn" type="submit" disabled={ loading }>Log In</button>
                            </div>
                            <div className="auth__socialNetworks">
                                <div className="google-btn" onClick={ handleGoogleLogin }>
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon btn-block" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    </div>
                                    <p className="btn-text"><b>Sign in with google</b></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};