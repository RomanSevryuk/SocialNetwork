import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import {AppRootStateType, store} from "./redux/redux-store";
import {Provider} from "react-redux";

const rerenderEntireTree = (state: AppRootStateType) => {
    ReactDOM.render(<Provider store={store}>
            <App />
    </Provider>
        , document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())

store.subscribe(() => rerenderEntireTree)

// new branch "development"