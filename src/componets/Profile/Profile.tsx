import React from 'react';
import {MyPosts} from "./MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType, StateType} from "../../redux/store";
import {MyPostsContainer} from "./MyPostsContainer";

type ProfileType = {
    state: StateType
    dispatch: (action: ActionsTypes) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer state={props.state} dispatch={props.dispatch}/>
        </div>
    );
};