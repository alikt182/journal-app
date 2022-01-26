/**
 * @jest-environment node
 */
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; 

jest.mock('../../helpers/fileUpload', ()=>({
    fileUpload: jest.fn()
}));

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth',() => {

    beforeEach( () => {
        store = mockStore(initState);
        }
    )


    test('Login y Logout deben crear la acción respectiva', () => {
        
        const uid = 'ABC123';
        const displayName = 'Monserrate';
        
        const loginAction = login( uid , displayName );

        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName 
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout,
        });

    });


    test('debe realizar el startLogout', async () => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();
        //console.log( actions );

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
                
    });

    test('debe iniciar el startLoginEmailPassword', async () => {

        await store.dispatch( startLoginEmailPassword('test@testing.com','123456') )

        const actions = store.getActions();
        //console.log( actions );

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'R47FNR8ZcGWsbtVJgpwnuzAA7tx2',
                displayName: null
            }
        })


    });
    
    
    

})