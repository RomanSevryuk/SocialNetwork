import React from 'react';
import {MyPosts} from "./MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/store";

type ProfileType = {
    state: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state} dispatch={props.dispatch}/>
        </div>
    );
};