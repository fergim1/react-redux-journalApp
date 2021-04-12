import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginScreen } from '../component/auth/LoginScreen';
import { RegisterScreen } from '../component/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-container'>
                <Switch>
                    <Route
                        path='/auth/login'
                        exact
                        component={ LoginScreen }
                    />

                    <Route
                        path='/auth/register'
                        exact
                        component={ RegisterScreen }
                    />
                    
                    <Redirect to='/auth/register' />

                </Switch>
                
            </div>
            
        </div>
    )
}
