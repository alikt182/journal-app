import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

 
jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid:'ABC123',
        name: 'Monserrate'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Testing Prueba Activa',
            body: 'Esto es una prueba',
            date: 0
        },
        notes: []
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();
 
const wrapper = mount( 
    <Provider store={ store }>
            <NoteScreen /> 
    </Provider>
)

describe('Pruebas en <NoteScreen/>', ()=>{

    test('debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe disparar el activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name: 'title',
                value: 'Hola de Nuevo'
            }
        });

        //expect( activeNote ).toHaveBeenCalled();
        //Cómo sabemos si la acción fue llamada con los argumentos?????
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'Esto es una prueba',
                title: 'Hola de Nuevo',
                id: 1234,
                date: 0
            }
        );

    });
    
    

})