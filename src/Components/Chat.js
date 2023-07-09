import React, { useEffect, useState } from 'react'
// this import the "adding document" service in a collection; serverTimestamp organizes the msg according to their timestamp
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config"

import "../Styles/Chat.css";

const Chat = (props) => {

    const { room } = props

    // creating newMessage to handle the typed msg and do some kind of action work on it
    const [newMessage, setNewMessage] = useState(""); // we tend to send this newMessage(by user) to our firestore collection

    const messageRef = collection(db, "messages"); // this creates a msg reference to the collection where we have to store the msg

    const [messages, setMessages] = useState([]);

    // useEffect to see the msg of the same rooms
    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"));
        const unsuscribe =  onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages);
        });

        return () => unsuscribe();

    }, []);

    // this functions gets called when below form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault(); // it stops the default behavior associated with the event from occurring

        // ensuring empty messages does no function
        if (newMessage === "") return;

        // since we have to send the message to firestore, we need to add the message to a doc in an existing collection
        await addDoc(messageRef, {
            // store below information from the message sent by user
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room // store to which room the msg belongs to
        });

        setNewMessage(""); // empties the msg once sent
    };

    return (
        <div className='chat-app'>
            <div className="header">
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className='messages'>
                {messages.map(message => (
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className='new-message-form'>
                <input
                    className='new-message-input'
                    placeholder='Type your messages here...'
                    onChange={(event) => setNewMessage(event.target.value)}
                    value={newMessage}
                />
                <button type='submit' className='send-button'>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat
