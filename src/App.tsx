import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {Profile} from "./componets/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {ActionsTypes, StateType} from "./redux/store";
import {Dialogs} from "./componets/Dialogs/Dialogs";


type AppType = {
    state: StateType
    dispatch: (action: ActionsTypes) => void
}

const App: React.FC<AppType> = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={() => <Dialogs state={props.state.dialogsPage}
                                                                  dispatch={props.dispatch}
                    />}/>
                    <Route path='/Profile' render={() => <Profile state={props.state.profilePage}
                                                                  dispatch={props.dispatch}
                    />}/>
                    <Route path='/News' component={News}/>
                    <Route path='/Music' component={Music}/>
                    <Route path='/Settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );

}
export default App;

