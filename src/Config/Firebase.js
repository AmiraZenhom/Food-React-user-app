// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeAsxO6EAU_BZDY8Y4VG4GnDCRTvs9eD4",
  authDomain: "auth-47da2.firebaseapp.com",
  projectId: "auth-47da2",
  storageBucket: "auth-47da2.appspot.com",
  messagingSenderId: "1050210581451",
  appId: "1:1050210581451:web:6fcaf48be2823721ab944e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider
 const auth = getAuth(app);
export  {auth,provider}