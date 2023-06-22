import React from 'react';
import './App.css';
import {Navbar} from "./componets/Navbar/Navbar";
import {ProfileContainer} from "./componets/Profile/ProfileClassContainer";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {DialogsContainer} from "./componets/Dialogs/DialogsContainer";
import {UsersContainer} from "./componets/Users/UsersContainer";
import {HeaderContainer} from "./componets/Header/HeaderContainerClass";

const App: React.FC = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/Profile/:userID?' render={() => <ProfileContainer/>}/>
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

