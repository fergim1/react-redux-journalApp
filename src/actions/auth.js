
import { types } from '../types/types';
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        firebase.auth().signInWithEmailAndPassword ( email, password )
        .then( ( { user }) => {
            dispatch ( 
                login ( user.uid , user.displayName )
            )

        })
        .catch( e => { 
            console.log( e );            
        })
    }

}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        // El dispatch lo tengo que disparar una vez que tenga el usuario grabado en firebase
        firebase.auth().createUserWithEmailAndPassword( email, password )
        // cuando llamamos a la funcion createUserWithEmailAndPassword , crea el usuario en firebase y tambien 
        // queda logueado el usuario
            .then ( async ({ user }) => {

                // como el displayNAme viene en null, le agrego el name con user.updateProfile 
               await user.updateProfile ( { displayName: name})

                dispatch ( 
                    login ( user.uid , user.displayName )
                )
            })

            .catch ( e => { 
                console.log( e ) 
                
            })
    }
}


export const startGoogleLogin = ( ) => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then ( ({ user }) => {
            dispatch ( login  ( user.uid , user.displayName ))
        })
    }
}

export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid, 
            displayName
        }
    }
}

export const startLogOut = () => {
    return async ( dispatch ) => {

        await firebase.auth().signOut();

        dispatch( logout() )        
    }
}

export const logout = () => ({

    type: types.logout
})