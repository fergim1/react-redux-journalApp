import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch()
    
    const state = useSelector(state => state)
    const { name } = state.auth
    // lo dejo asi para que se entienda lo del state
    // Mas corto se podria hacer:
    // const { name } = useSelector( state => state.auth)


    const handleLogOut = ( ) => {
        dispatch( startLogOut () )
       
     }

     const handleNewNote = ( ) => {
         dispatch ( startNewNote() )
     }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick= { handleLogOut }
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick= { handleNewNote}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New note
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
