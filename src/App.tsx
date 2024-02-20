import React from 'react';
import './App.css';
import {Navbar} from "./componets/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {News} from "./componets/News/News";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {UsersContainer} from "./componets/Users/UsersContainer";
import {HeaderContainer} from "./componets/Header/HeaderContainerClass";
import {LoginPageContainer} from "./Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {setInitializedAppTC} from "./redux/app-reducer";
import {AppRootStateType} from "./redux/redux-store";
import {Preloader} from "./componets/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./componets/Dialogs/DialogsContainer')
    .then(({DialogsContainer}) => ({default: DialogsContainer})));
const ProfileClassContainer = React.lazy(() => import('./componets/Profile/ProfileClassContainer'));


type AppPropsType = {
    setInitializedAppTC: () => void
} & MapStateToPropsType

type MapStateToPropsType = {
    initialized: boolean
}

export class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.setInitializedAppTC()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={'/Profile'}/>}/>
                            <Route path='/Dialogs' render={withSuspense(DialogsContainer)}/>
                            <Route path='/Profile/:userID?' render={withSuspense(ProfileClassContainer)}/>
                            <Route path='/News' component={News}/>
                            <Route path='/Music' component={Music}/>
                            <Route path='/Settings' component={Settings}/>
                            <Route path={'/Users'} render={() => <UsersContainer/>}/>
                            <Route path={'/Login'} render={() => <LoginPageContainer/>}/>
                            <Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
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

