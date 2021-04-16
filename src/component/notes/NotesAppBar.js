import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { saveNoteActive, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:noteActive} = useSelector(state => state.notes)
    const noteDate = moment( noteActive.date )    

    const handleSaveNote = (  ) => {
        dispatch ( saveNoteActive ( noteActive ));
    }

    const handleButtonPicture = () => {
        document.querySelector('#inputFile').click()
    }

    const handleInputFile = ( e ) => {
        const file = e.target.files[0];
        if (file) {
            dispatch( startUploading ( file ))
        }
    }

    return (
        <div className="notes__appbar">
            <i class="far fa-calendar-alt">
            <span>  { noteDate.format("dddd, MMMM Do YYYY, h:mm a")}</span>
            </i>
            <input
                type='file'
                style={{ display: 'none '}}
                id='inputFile'
                name='file'
                onChange= { handleInputFile }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handleButtonPicture }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick= { handleSaveNote }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
