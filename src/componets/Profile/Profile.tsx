import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatusTC: (status: string) => void
}

export const Profile = ({profile, status, updateUserStatusTC}: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateUserStatusTC={updateUserStatusTC}/>
            <MyPostsContainer/>
        </div>
    );
};