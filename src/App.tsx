import React from 'react';
import './App.css';
import {Navbar} from "./componets/Navbar/Navbar";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {DialogsContainer} from "./componets/Dialogs/DialogsContainer";
import {UsersContainer} from "./componets/Users/UsersContainer";
import {HeaderContainer} from "./componets/Header/HeaderContainerClass";
import {LoginPageContainer} from "./Login/Login";
import ProfileClassContainer from "./componets/Profile/ProfileClassContainer";


const App: React.FC = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='appWrapperContent'>
                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/Profile/:userID?' render={() => <ProfileClassContainer/>}/>
                    <Route path='/News' component={News}/>
                    <Route path='/Music' component={Music}/>
                    <Route path='/Settings' component={Settings}/>
                    <Route path={'/Users'} render={() => <UsersContainer/>}/>
                    <Route path={'/Login'} render={() => <LoginPageContainer/>}/>
                    <Route exact path="*"> <Redirect to='/Profile'/>
                    </Route>


                </div>
            </div>
        </BrowserRouter>
    );

}
export default App;

