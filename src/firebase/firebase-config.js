import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, ProviderId } from 'firebase/auth';

//console.log( process.env );

// // Optimizacion para usar las variables de entorno .env.development / .env.test
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID
// };



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEswP7dULYeQZtnTkm0JE5jMLbicxh79s",
    authDomain: "react-app-cursos-682f2.firebaseapp.com",
    projectId: "react-app-cursos-682f2",
    storageBucket: "react-app-cursos-682f2.appspot.com",
    messagingSenderId: "425341242703",
    appId: "1:425341242703:web:262a360d4ac2dccdee093a"
  };

  const firebaseConfigTesting = {
    apiKey: "AIzaSyAttqI9t0DODx7e-FicfSjyUk4suDVXW_U",
    authDomain: "dgil-rvr21.firebaseapp.com",
    databaseURL: "https://dgil-rvr21-default-rtdb.firebaseio.com",
    projectId: "dgil-rvr21",
    storageBucket: "dgil-rvr21.appspot.com",
    messagingSenderId: "1013117267462",
    appId: "1:1013117267462:web:0c4040fee1fa8fb4ad9d87",
    measurementId: "G-CRCBGRBFTC"
  };

  let app = {};

  if ( process.env.NODE_ENV === 'test') {

    app = initializeApp(firebaseConfigTesting);

  } else {
      
    app = initializeApp(firebaseConfig);

  }
  
  // Initialize Firebase

  const db = getFirestore();
  const googleAuthProvider = new GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      app
  }