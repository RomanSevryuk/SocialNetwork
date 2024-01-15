import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getProfileTC, getUserStatusTC, ProfileType, savePhoto, updateUserStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type ProfileClassPropsType = {
    getProfileTC: (userID: string) => void
    getUserStatusTC: (userID: string) => void
    updateUserStatusTC: (status: string) => void
    savePhoto: (e: File) => void
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

type ProfileClassContainerPropsType = RouteComponentProps<PathParamsType> & ProfileClassPropsType


class ProfileClassContainer extends React.Component<ProfileClassContainerPropsType> {

    refreshProfile() {
        let userID: string = this.props.match.params.userID
        if (!userID) {
            if (this.props.authorizedUserId)
                userID = this.props.authorizedUserId.toString()
        }
        this.props.getProfileTC(userID)
        this.props.getUserStatusTC(userID)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileClassContainerPropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile()
        }
        if (this.props.profile?.photos.large !== prevProps.profile?.photos.large) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                        updateUserStatusTC={this.props.updateUserStatusTC} isOwner={!this.props.match.params.userID}
                        savePhoto={this.props.savePhoto}/>
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
    updateUserStatusTC,
    savePhoto,
}), withRouter, withAuthRedirect)
(ProfileClassContainer)