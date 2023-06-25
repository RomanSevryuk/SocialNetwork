import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getAuthUserDataTC} from "../../redux/auth-reducer";

type HeaderContainerType = {
    getAuthUserDataTC: () => void
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
        return <Header login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export const HeaderContainer = connect(mapStateToProps, {getAuthUserDataTC})(HeaderContainerClass)