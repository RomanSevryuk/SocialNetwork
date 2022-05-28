import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import {addMessage, addPost, RootStateType, updateNewMessageText, updateNewPostText} from "./redux/state";

    export const rerenderEntireTree = (state:RootStateType) => {
        ReactDOM.render(
            <App state={state}
                 callbackAddPost={addPost}
                 updateNewPostText={updateNewPostText}
                 callbackAddMessage={addMessage}
                 callbackUpdateNewMessageText={updateNewMessageText}
            />, document.getElementById('root')
        );
    }
