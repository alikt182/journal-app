/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import { startLoadinNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { doc, deleteDoc, getDoc } from "@firebase/firestore";
import { types } from '../types';
import { disableNetwork } from 'firebase/firestore';



const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid:'uidTesting'
    }
}

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', ()=>{

    //afterAll(() => { disableNetwork(db);}) 
    beforeEach( () => {
        store = mockStore(initState);
    }

    )

    test('Debe crear una nueva nota startNewNote ',  async() => {

        await store.dispatch( startNewNote() );
 
        const actions = store.getActions();
 
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
 
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        const noteRef = doc(db, `/uidTesting/journal/notes/${docId}`);
        await deleteDoc(noteRef);

    })

    test('Debe cargar las notas startLoadingNotes ', async () => {

        await store.dispatch( startLoadinNotes( 'uidTesting' ));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
        
    })
    

    test('startSaveNote debe actualizar la nota', async () => {

        const note = {
            id:'qF0SiWo8sgRHg0DJELWH',
            title:'titulo test',
            body:'body test'
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        //console.log( actions );

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await getDoc(doc(db,`/uidTesting/journal/notes/${ note.id }`));

        expect( docRef.data().title).toBe( note.title );
        
    })
    
    
    

})