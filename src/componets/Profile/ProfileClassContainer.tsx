import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getProfileTC, ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type ProfileClassPropsType = {
    profile: ProfileType | null
    getProfileTC: (userID: string) => void
}
type MapStateToPropsType = {
    profile: ProfileType | null
}
type PathParamsType = {
    userID: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileClassPropsType


class ProfileClassContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userID: string = this.props.match.params.userID
        !userID ? userID = '2' : this.props.getProfileTC(userID)
        if (!userID) {
            userID = '2'
        }
        this.props.getProfileTC(userID)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(connect(mapStateToProps, {getProfileTC}), withRouter, withAuthRedirect)
(ProfileClassContainer)