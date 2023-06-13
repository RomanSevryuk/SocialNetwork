import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPostsContainer";

type ProfileType = {
    /*    state: StateType
        dispatch: (action: ActionsTypes) => void*/
    //store: AppRootStateType
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};