import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import validator  from "validator";
// import Swal from 'sweetalert2'
import { startGoogleLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import { startLoginEmailPassword } from '../../actions/auth'


export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formValues , handleInputChange] = useForm({
        email: '',
        password: ''
    })
    const [ loadingAndError, SetLoadingAndError] = useState( {
        loading: false,
        error: ''
    } )

    const { email, password } = formValues;
    const { loading, error } = loadingAndError;
    
    const handleSubmitLogin = ( e ) => {
        e.preventDefault();

        SetLoadingAndError ( {
            ...loadingAndError, 
            loading: true
        })
        if ( isFormValid() ){
            dispatch ( startLoginEmailPassword ( email, password ) );  
            
            SetLoadingAndError ( {
                ...loadingAndError, 
                loading: false
            })
        }
    }

    const isFormValid = () => {        
        if ( email.trim().length <= 0  || !validator.isEmail( email )) {
            SetLoadingAndError ( {
                ...loadingAndError, 
                error: 'Email is invalid!'
            } )
            return false
        }
       
        return true
    }
 
    const handleGoogleLogin = () => {
        dispatch ( startGoogleLogin() )
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit= { handleSubmitLogin }>
                {
                    error && 
                    (
                        <div className= 'auth__alert-error'>
                             {error}
                        </div>
                    )
                }
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={ email }
                    onChange= { handleInputChange }

                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange= { handleInputChange }

                />
                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled= { loading }
                
                >
                    Login
                </button>
                <hr/>
                <div className='auth__social-networks'>
                    {/* <p> Login with social networks</p> */}
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                    </div>
                </div>
                <Link
                    to='/auth/register'
                    className='link'
                >
                    Create new Account
                </Link>
            </form>
        </>
    )
}
