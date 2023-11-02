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
import {connect} from "react-redux";
import {compose} from "redux";
import {setInitializedAppTC} from "./redux/app-reducer";
import {AppRootStateType} from "./redux/redux-store";
import {Preloader} from "./componets/common/Preloader/Preloader";
import {useLocation, useNavigate, useParams} from 'react-router-dom';


type AppPropsType = {
    setInitializedAppTC: () => void
} & MapStateToPropsType

type MapStateToPropsType = {
    initialized: boolean
}

type PathParamsType = {
    path: string
}

/*type PropsType = RouteComponentProps<PathParamsType> & AppPropsType*/

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
                        <Route exact path="*"> <Redirect to='/Profile'/>
                        </Route>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export type WithRouterProps = {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

export const withRouter = <Props extends WithRouterProps>(
    Component: React.ComponentType<Props>
) => {
    return (props: Omit<Props, keyof WithRouterProps>) => {
        const location = useLocation();
        const params = useParams();
        const navigate = useNavigate();

        return (
            <Component
                {...(props as Props)}
                location={location}
                params={params}
                navigate={navigate}
            />
        );
    };
};


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

export const AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, {setInitializedAppTC}))(App)

