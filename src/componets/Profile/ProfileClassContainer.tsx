import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getProfileTC, getUserStatusTC, ProfileType, updateUserStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type ProfileClassPropsType = {
    getProfileTC: (userID: string) => void
    getUserStatusTC: (userID: string) => void
    updateUserStatusTC: (status: string) => void
} & MapStateToPropsType

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: null | number
    isAuth: boolean
}
type PathParamsType = {
    userID: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileClassPropsType


class ProfileClassContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userID: string = this.props.match.params.userID
        if (!userID) {
            if (this.props.authorizedUserId)
                userID = this.props.authorizedUserId.toString()
        }
        this.props.getProfileTC(userID)
        this.props.getUserStatusTC(userID)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateUserStatusTC={this.props.updateUserStatusTC}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getProfileTC,
    getUserStatusTC,
    updateUserStatusTC
}), withRouter, withAuthRedirect)
(ProfileClassContainer)