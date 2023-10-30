import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getAuthUserDataTC, logout} from "../../redux/auth-reducer";

type HeaderContainerType = {
    getAuthUserDataTC: () => void
    logout: () => void
    isAuth: boolean
    login: string | null
}
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

export class HeaderContainerClass extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export const HeaderContainer = connect(mapStateToProps, {getAuthUserDataTC, logout})(HeaderContainerClass)