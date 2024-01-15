import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import {AppContainer} from "./App";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";


ReactDOM.render(<Provider store={store}>
        <AppContainer/>
    </Provider>
    , document.getElementById('root')
);

// new branch "development"