import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    //console.log(msgError);

    const [ formValues, handleInputChange ] = useForm({
        name: 'Benito',
        email: 'elver@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()){
            //console.log('Formulario Correcto')
            dispatch( startRegisterWithEmailPasswordName(email,password,name))
        };
        //console.log(name, email, password, password2)
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name required') )
            //console.log('Name required')
            return false
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email not valid') )
            //console.log('Email not valid ')
            return false
        } else if ( password !== password2 || password2.length < 5 ) {
            dispatch( setError('Password shoud be at least 6 characters and match each other') )
            //console.log('Password shoud be at least 6 characters and match each other')
            return false
        } else 

        dispatch( removeError() )
        return true
    }



    return (
        <>
         <h3 className='auth__title'>Register</h3>   
         <form 
            onSubmit={ handleRegister }
            class="animate__animated animate__bounce animate__fadeIn animate__faster"
        >
            
            {
                msgError && (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )
            }


            <input
                type="text"
                placeholder="Name"
                name="name"
                className="auth__input"
                autoComplete="off"
                value = { name }
                onChange={ handleInputChange }
             />
             <input
                type="text"
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete="off"
                value = { email }
                onChange={ handleInputChange }
             />
            <input
                type="password"
                placeholder="Password"
                name="password"
                className="auth__input"
                value = { password }
                onChange={ handleInputChange }
             />
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                className="auth__input"
                value = { password2 }
                onChange={ handleInputChange }
             />

             <button
                type="submit"
                className="btn btn-primary btn-block mb-5"
                >
                    Register
            </button>

            <Link 
                to="/auth/login"
                className="link"
            >
                Already Registered?
            </Link>

         </form>
        </>
    )
}
