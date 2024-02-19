import React from 'react';
import {FormDataType, ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (e: File) => void
    saveProfile: (e: FormDataType) => Promise<any>
}

export const Profile = ({profile, status, updateUserStatusTC, isOwner, savePhoto, saveProfile}: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateUserStatusTC={updateUserStatusTC} isOwner={isOwner}
                         savePhoto={savePhoto} saveProfile={saveProfile}/>
            <MyPostsContainer/>
        </div>
    );
};