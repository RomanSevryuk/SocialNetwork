import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import {StateType} from "./redux/store";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";

const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(<Provider store={store}>
            <App />
    </Provider>
        , document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())

store.subscribe(() => rerenderEntireTree)

// new branch "development"