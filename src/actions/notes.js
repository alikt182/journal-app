import { addDoc, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

//react-journal

export const startNewNote = () => {

    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',  
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
        //console.log(newNote )

        dispatch( activeNote( doc.id, newNote ));

        dispatch( addNewNote( doc.id, newNote ));

    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadinNotes = ( uid ) => {
    
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes(notes));

    }

}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth; 

        if ( !note.url ) {
            delete note.url
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore)
            Swal.fire('Saved', note.title,'success')
            dispatch( refreshNote(note.id, noteToFirestore));
        }
        catch (e){ 
            Swal.fire('Error', e.message ,'error')
        }
        

    }
}

export const refreshNote = ( id, note ) => ({
    
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }

})

export const startUploading = ( file ) => {
    
    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        //console.log(fileUrl);
        dispatch( startSaveNote( activeNote))
        Swal.close();   
    }

}

export const startDeleting = ( id ) => {
    return async ( dispatch , getState ) => {
        const uid = getState().auth.uid;
        //await db.doc(`${uid}/journal/notes/${id}`).delete();
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))

        dispatch( deleteNote(id) );

    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLogout = () => ({
    type: types.notesLogoutCleaning

})