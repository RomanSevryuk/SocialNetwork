import React from 'react';
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";

type HeaderContainerType = {
    setAuthUserData: (userData: ResponseDataType, isAuth: boolean) => void
    isAuth: boolean
    login: string | null
}
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

export type ResponseDataType = {
    id: number | null
    login: string | null
    email: string | null
}
export type ResponseAuthType = {
    data: ResponseDataType
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export class HeaderContainerClass extends React.Component<HeaderContainerType> {

    componentDidMount() {
        axios.get<ResponseAuthType>(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true})
            .then((response) => {
                if (response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data
                    this.props.setAuthUserData({id, login, email}, true)
                }
            })
    }

    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData})(HeaderContainerClass)