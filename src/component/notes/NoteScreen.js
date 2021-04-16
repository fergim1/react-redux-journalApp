import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch( )

    const { active:noteToShow } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm(noteToShow);
    
    const { title, body, url, id } = formValues;

    const idNoteShowed = useRef( noteToShow.id);
    const urlNoteShowed = useRef( noteToShow.url);

    useEffect(() => {
        
        if ( noteToShow.id !== idNoteShowed.current ) {
            reset (noteToShow);
            idNoteShowed.current = noteToShow.id
        }
  
    }, [ noteToShow, reset ])

    useEffect(() => {        
        dispatch( activeNote ( formValues.id, {...formValues} ))
    }, [ formValues, dispatch ])

    useEffect(() => {
    if ( noteToShow.url !== urlNoteShowed.current) {
        reset (noteToShow);
        urlNoteShowed.current = noteToShow.url
    } 
    
    }, [ noteToShow, reset ])

    const handleDelete = ( ) => {
        dispatch( startDeleting ( id ))
        Swal.fire({
            icon: 'error',
            text: 'Note deleted successfully',
            timer: 2000 
        })

    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange}
                    name='title'
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange}
                    name='body'
                ></textarea>

                {
                    url &&
                    (
                        <div className="notes__image">
                            <img 
                                src={ url }
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>
            <button
                className='btn btn-danger'
                onClick= { handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
