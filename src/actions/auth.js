import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = ( email, password )=> {

    return ( dispatch ) => {

        const auth = getAuth(app);

        dispatch(startLoading());

        signInWithEmailAndPassword( auth, email,password )
            .then( ({user}) => {
                
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(
                (err)=> {
                
                console.error(err)
                dispatch(finishLoading())
                Swal.fire('Error', 'Invalid User or Password ' , 'error')
                })

            .finally(()=>{
                dispatch(finishLoading());
                
            })

    }
}

export const startRegisterWithEmailPasswordName =  (email, password, name) =>{
 
    return ( dispatch ) => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth,email,password )
            .then( async ({user}) => {
                await updateProfile(user,{displayName:name})
                //console.log(user)
                dispatch(
                    login(user.uid, user.displayName)
                )
                
            })
            .catch((err)=> console.error(err));
    }
 
}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) =>{
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = ( uid, displayName ) => ({        
        type: types.login,
        payload: {
            uid,
            displayName
    }
});

export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );

        dispatch( noteLogout() );

    }
}

export const logout = () => ({
    type: types.logout
})