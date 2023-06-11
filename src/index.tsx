import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import {StateType, store} from "./redux/store";


/*ReactDOM.render(<TestFile />,  document.getElementById('root'));*/


const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App state={state}
             addPost={store.addPost.bind(store)}
             updateNewPostText={store.updateNewPostText.bind(store)}
             addMessage={store.addMessage.bind(store)}
             updateNewMessageText={store.updateNewMessageText.bind(store)}
            /*           addPost={addPost}
                         updateNewPostText={updateNewPostText}
                         addMessage={addMessage}
                         updateNewMessageText={updateNewMessageText}*/
        />, document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)


// new branch "development"