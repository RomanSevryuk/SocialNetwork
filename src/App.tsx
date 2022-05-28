import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {Profile} from "./componets/Profile/Profile";
import {Dialogs} from "./componets/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {addPost, RootStateType} from "./redux/state";

type AppType = {
    state: RootStateType
    callbackAddPost: (message: string )=> void
}

const App: React.FC<AppType> = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={()=><Dialogs dialogsPage={props.state.dialogsPage}/>}/>
                    <Route path='/Profile' render={()=><Profile profilePage={props.state.profilePage} callbackAddPost={props.callbackAddPost}/>}/>
                    <Route path='/News' component={News}/>
                    <Route path='/Music' component={Music}/>
                    <Route path='/Settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );

}

export default App;
