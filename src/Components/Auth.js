import React from 'react'

// imoorting the 2 objects that we created in firebase-config.js
import { auth, provider } from "../firebase-config.js";
// this component from authn module of firebase, allows to sign in by poping the window
import { signInWithPopup } from 'firebase/auth';

// import Cookies to save user's data, for that we use universl-cookie
import Cookies from 'universal-cookie';
const cookies = new Cookies(); // initializes the cookies

const Auth = (props) => {

    // this function gets triggered when we click on below button
    // function is made "Asynchronous" type, why? - ChatGPT
    const signInWithGoogle = async () => {

        const { setIsAuth } = props;

        try {
            const result = await signInWithPopup(auth, provider); // this uses the imported objects and components
            cookies.set("auth-token", result.user.refreshToken); // used to set the cookies in the name of "auth-cookies"
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
        // try-catch block just for safety purpose
    };

    return (
        <div className='auth'>
            <p>Sign In with Google to continue...</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default Auth;


