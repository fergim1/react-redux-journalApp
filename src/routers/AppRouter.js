import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from '../component/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { loadNotes } from '../actions/notes';


export const AppRouter = () => {
    
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [cheking, setCheking] = useState( true )

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(  ( user ) => {
            
            if( user?.uid ) {
               dispatch( login( user.uid, user.displayName) )
                
               dispatch( loadNotes( user.uid ) )
                               
               setIsAuthenticated(true)
            }
            else {
                setIsAuthenticated(false)
            }
            setCheking( false )
        })

    }, [dispatch])

    if ( cheking ) {
        return(
            <h1> Please wait... </h1>
        )         
    }
    // el cheking lo pongo porque apenas se reenderiza, no va a hacer el useEffect , por lo tanto no voy a saber 
    // si esta autenticado o no. Entonces, primero que espere la app con ese "Please wait..." y luego cuando 
    // corrobora si esta o no authenticado decide que mostrar 

    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoutes                        
                        isAuthenticated = { isAuthenticated }
                        path='/auth'
                        component={ AuthRouter }
                    />

                    <PrivateRoute   
                        exact
                        isAuthenticated = { isAuthenticated }                      
                        path='/'
                        component={ JournalScreen }
                    />

                    <Redirect to='/auth/login' />

                </Switch>

            </Router>
            
        </div>
    )
}
