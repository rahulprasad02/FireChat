// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// importing the authentication service from firebase along with its provider (Google in this case)
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// importing the firestore service from firebase for our database
import { getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgJtkzFruTsIpV8Wjj5dGAAXZWoeLu3zU",
    authDomain: "let-schat-8fe86.firebaseapp.com",
    projectId: "let-schat-8fe86",
    storageBucket: "let-schat-8fe86.appspot.com",
    messagingSenderId: "945683611818",
    appId: "1:945683611818:web:34ce1e48665b20de1490d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // "app" is the name of firebase instance

// export the imported Authentication service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export the imported Database service (Firestore)
export const db = getFirestore(app);