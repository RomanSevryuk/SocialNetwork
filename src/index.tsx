import React from 'react';
import './index.css';
import {state, subscribe} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";
import {addMessage, addPost, RootStateType, updateNewMessageText, updateNewPostText} from "./redux/state";

const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state}
             callbackAddPost={addPost}
             updateNewPostText={updateNewPostText}
             callbackAddMessage={addMessage}
             callbackUpdateNewMessageText={updateNewMessageText}
        />, document.getElementById('root')
    );
}
rerenderEntireTree(state)

subscribe(rerenderEntireTree)

// new branch "dev"