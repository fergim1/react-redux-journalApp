import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";
import { retornarDocumentos } from "../helpers/retornarDocumentos";

export const startNewNote = () => {
  // Como es una tarea asincrona, voy a traajar con el midelware thunk y creo un
  // nuevo callback, que se va a disparar gracias a thunk que me va a disponer lo que es el dispath
  // uso el async await porque firebase/firestore me va a devolver una promesa
  return async (dispatch, getState) => {
    // Obtengo el uid del usuario que esta autenticado para grabar sus notas con su uid
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    // el path : `${ uid }/journal/notes` es el path donde quiero agregar mi newNote

    dispatch(activeNote(doc.id, newNote));
    //doc.id es el id del la nueva nota, no del usuario logueado
    dispatch ( addNewNote ( doc.id , newNote ))
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (idNote, newNote ) => ({
  type: types.notesAddNew,
  payload: {
    id: idNote, 
    ...newNote
  }

})

export const loadNotes = (uid) => {
  return async (dispatch) => {
    const notesFirestore = await db.collection(`${uid}/journal/notes`).orderBy('date', 'desc').get();
    const notes=  retornarDocumentos ( notesFirestore )
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const saveNoteActive = (noteActive) => {
  return async (dispatch, getState) => {

    const uid = getState().auth.uid;

    if (!noteActive.url) {
      delete noteActive.url;
    }
    const noteFirestore = { ...noteActive };
    
    delete noteFirestore.id;
    
    await db.doc(`${uid}/journal/notes/${noteActive.id}`).update(noteFirestore);

    dispatch ( loadNotes ( uid ))
    Swal.fire({
      icon: 'success',
      title: 'Saved',
      text: noteActive.title, 
      timer: 2000
    })

  };
};


export const startUploading = ( file ) => {
  return async ( dispatch , getState) => {

    const { active:activeNote } = getState().notes
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      showConfirmButton: false,
      onBeforeOpen: ()=>{
        Swal.showLoading()
      }
    })

    const fileUrl = await fileUpload( file );
    activeNote.url = fileUrl;
    dispatch ( saveNoteActive ( activeNote ))
    console.log(fileUrl)

    Swal.close();
     
  }
}

export const startDeleting = ( idNote ) => {

  return async ( dispatch, getState ) =>{

    const uid = getState().auth.uid

    await db.doc(`${ uid }/journal/notes/${ idNote }`).delete();

    dispatch( deleteNote ( idNote ))
 
  }
}

 const deleteNote = ( idNote ) => ({
  type: types.notesDelete,
  payload: idNote
})

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
})