import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types';

describe('Pruebas en authReducer', ()=>{

    test('Debe realizar el login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Monse'
            }
        };

        const state = authReducer( initState, action );

        //console.log( state );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Monse'
        })
        
    })

    test('Debe realizar el logout', () => {

        const initState = {};

        const action = {
            type: types.logout
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({})
        
    })

    test('No debe realizar cambios en el state', () => {

        const initState = {
            uid: 'abcde54321',
            displayName: 'ErrorIntencional'
        };

        const action = {
            type: 'typeDesconocido' 
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState )
        
    })
    
})