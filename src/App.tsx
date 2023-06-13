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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";
import {DialogsContainer} from "./componets/Dialogs/Message/DialogsContainer";


type AppType = {
 /*   state: StateType*/
}

const App: React.FC<AppType> = (props) => {
    const state = useSelector<AppRootStateType, StateType>((state)=>  state)
    const dispatch = useDispatch()
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={() => <DialogsContainer state={state} dispatch={dispatch}
                    />}/>
                    <Route path='/Profile' render={() => <Profile state={state} dispatch={dispatch}
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

