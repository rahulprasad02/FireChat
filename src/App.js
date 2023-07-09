import { useState, useRef } from 'react';
import './App.css';
import Auth from './Components/Auth';

import Cookies from 'universal-cookie';
import Chat from './Components/Chat';

import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

// we div. our App component into 2 parts based on what to 
//show if the user is authenticated and when he is not authenticated

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); // this creates a bool type "isAuth" which is false 
  // when user is not authenticated
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  // signout function
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth")
    setIsAuth(false)
    setRoom(null)
  };

  if (!isAuth) { // executes when not authenticated
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  // else show below part i.e. ask them to enter chat-room number
  // this works as - if the room value is not NULL then show the user Chat component else show the label n etc wala part
  return (
    <>
      {room ? (< Chat room={room} />) :
        (<div className="room">
          <label>Enter Room Number: </label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}> Enter Chat </button>
          {/*above code makes ensure that user gets into a chat room inly when he presses the button - see video for proper logic*/}
        </div>)}

      {/* Sign Out Functionality */}
      <div className="sign-out">
        <button onClick={signUserOut}> Sign Out </button>
      </div>
    </>
  );

}

export default App;
