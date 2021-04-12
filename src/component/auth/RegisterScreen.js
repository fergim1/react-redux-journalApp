import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import  validator from "validator";
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {


    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm( {
        name: '', 
        email: '',
        password: '',
        password2: ''
    })

    const [error, setError] = useState ('')
    
    const { name, email, password, password2 } = formValues

    const handleRegister = ( e ) => {
        e.preventDefault(); 
        
        if ( isFormValid() ){
            // Si isFormValid retorna true entra aca, si retorna un false no!
            // console.log('Formulario Correcto')
            dispatch (startRegisterWithEmailPasswordName ( email, password, name ))
            setError('')
        }
    }

    const isFormValid = () => {
        if( name.trim().length === 0) {
            setError('Name es required')
            console.log( error)
            return false
        }
        else if ( !validator.isEmail( email )) {
            setError('Email is invalid')
            console.log('Email is invalid')
            return false
        }
        else if ( password !== password2 || password.length < 5) {
            setError('Password should be at least 6 characters and match each other')
            console.log('Password should be at least 6 characters and match each other')
            return false
        }

        return true
    }

    return (
        <div>
       <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit= { handleRegister }>
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
                        placeholder='Name'
                        name='name'
                        className='auth__input'
                        autoComplete='off'
                        value= { name }
                        onChange= { handleInputChange }
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        className='auth__input'
                        autoComplete='off'
                        value= { email }
                        onChange= { handleInputChange }
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='auth__input'
                        value= { password }
                        onChange= { handleInputChange }
                    />

                    <input
                        type='password'
                        placeholder='Confirm password'
                        name='password2'
                        className='auth__input'
                        value= { password2 }
                        onChange= { handleInputChange }


                    />
                    <button
                        type='submit'
                        className='btn btn-primary btn-block mb-5'
                    
                    >
                        Register
                    </button>

                    <Link
                        to='/auth/login'
                        className='link'
                    >
                        Already registered ?
                    </Link>
            </form>
        </>
        </div>
    )
}
