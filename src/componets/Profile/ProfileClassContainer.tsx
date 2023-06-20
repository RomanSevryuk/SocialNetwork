import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type ResponseType = ProfileType

type ProfileClassPropsType = {
    profile: ProfileType | null
    setUserProfile: (profileData: ProfileType) => void
}
type MapStateToPropsType = {
    profile: ProfileType | null
}
type PathParamsType = {
    userID: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileClassPropsType


export class ProfileClassContainer extends React.Component<PropsType> {
    componentDidMount() {
        debugger
        let userID: string = this.props.match.params.userID
        if (!userID) {
            userID = '2'
        }
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
            .then((response) => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

const WithURIDataContainerComponent = withRouter(ProfileClassContainer)

export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(WithURIDataContainerComponent)