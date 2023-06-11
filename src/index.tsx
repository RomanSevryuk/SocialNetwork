import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import {StateType, store} from "./redux/store";

const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <App state={state} dispatch={store.dispatch.bind(store)}
        />, document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)

// new branch "development"