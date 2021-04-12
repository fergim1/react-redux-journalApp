import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// lo de arriba es para manejar el developer tolls de redux


const reducers = combineReducers ( {
    auth: authReducer,
} )


export const store = createStore ( 
    reducers,
    composeEnhancers(
        applyMiddleware ( thunk )
        // lo de arriba es para manejar tareas asincronas , entonces tengo que usar un middelware como que es thunk
    )
)