import React from 'react';
import './App.css';
import {Navbar} from "./componets/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {DialogsContainer} from "./componets/Dialogs/DialogsContainer";
import {UsersContainer} from "./componets/Users/UsersContainer";
import {HeaderContainer} from "./componets/Header/HeaderContainerClass";
import {LoginPageContainer} from "./Login/Login";
import ProfileClassContainer from "./componets/Profile/ProfileClassContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {setInitializedAppTC} from "./redux/app-reducer";
import {AppRootStateType} from "./redux/redux-store";
import {Preloader} from "./componets/common/Preloader/Preloader";

type AppPropsType = {
    setInitializedAppTC: () => void
} & MapStateToPropsType

type MapStateToPropsType = {
    initialized: boolean
}

export class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.setInitializedAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
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
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {setInitializedAppTC}))(App)

