import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";

type ResponseType = ProfileType

type ProfileClassPropsType = {
    profile: ProfileType | null
    setUserProfile: (profileData: ProfileType) => void
}

type MapStateToPropsType = {
    profile: ProfileType | null
}

export class ProfileClassContainer extends React.Component<ProfileClassPropsType> {
    componentDidMount() {
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(ProfileClassContainer)