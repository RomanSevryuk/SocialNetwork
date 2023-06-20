import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {ProfileClassContainer, ProfileContainer} from "./componets/Profile/ProfileClassContainer";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {DialogsContainer} from "./componets/Dialogs/DialogsContainer";
import {UsersContainer} from "./componets/Users/UsersContainer";

const App: React.FC = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/Profile' render={() => <ProfileContainer/>}/>
                    <Route path='/News' component={News}/>
                    <Route path='/Music' component={Music}/>
                    <Route path='/Settings' component={Settings}/>
                    <Route path={'/Users'} render={() => <UsersContainer/>}/>
                    <Route exact path="*"> <Redirect to='/Profile'/>
                    </Route>


                </div>
            </div>
        </BrowserRouter>
    );

}
export default App;

