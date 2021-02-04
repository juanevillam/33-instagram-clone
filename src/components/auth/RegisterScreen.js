import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordUsername } from '../../actions/auth';

import '../../assets/css/util.css';
import '../../assets/css/main.css';
import '../../assets/vendor/animate/animate.css';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const { name, email, username, password, password2 } = formValues;

    const handleRegister = ( e ) => {
        
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordUsername( email, password, username ) );
        };

    };

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError( 'Name is required' ) );
            return false;

        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError( 'Email is not valid' ) );
            return false;

        } else if ( password.trim().length < 6 ){
            dispatch( setError( 'Passwords must be at least 6 letters' ) );
            return false;

        } else if ( password !== password2 ) {
            dispatch( setError( 'Passwords must match each other' ) );
            return false;

        }

        dispatch( removeError() );

        return true;

    };
    
    return (
        <div>
            <div className="limiter animated fadeInLeft">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <form onSubmit={ handleRegister } className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-51">Create new account</span>
                            { msgError && (
                                <div className="container-loginError-form-btn m-b-16 animated fadeIn">
                                    <p className="container-loginError-form-btn">{ msgError }</p>
                                </div> 
                                )
                            }
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="email" name="email" value={ email } onChange={ handleInputChange } required placeholder="Email" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="text" name="name" value={ name } onChange={ handleInputChange } minLength="2" required placeholder="Full name" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="text" name="username" value={ username } onChange={ handleInputChange } minLength="2" required placeholder="Username" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="password" name="password" value={ password } onChange={ handleInputChange } minLength="6" required placeholder="Password" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <input className="input100" type="password" name="password2" value={ password2 } onChange={ handleInputChange } minLength="6" required placeholder="Confirm Password" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100" htmlFor="ckb1">Remember my username</label>
                                </div>
                                <div>
                                    <Link to="/auth/login" className="txt1">Already register? / Login</Link>
                                </div>
                            </div>
                            <div className="container-login100-form-btn m-t-17">
                                <button onClick={ handleRegister } className="login100-form-btn" type="submit">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};