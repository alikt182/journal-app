import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthRouter } from './AuthRouter';
import {
    Route,
    BrowserRouter,
    Routes
  } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadinNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking , setChecking ] = useState( true );

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
    
        const auth = getAuth();
        onAuthStateChanged(auth,  async  (user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName) );
                setIsLoggedIn( true );

               
               dispatch( startLoadinNotes( user.uid ));

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);     


        })
    
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            <h1>Please Wait...</h1>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <PublicRoute isAuth={ isLoggedIn }>
                            <AuthRouter />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuth={ isLoggedIn }>
                            <JournalScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
