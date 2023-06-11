import React from 'react';
import {MyPosts} from "./MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/stateOld";

type ProfileType = {
    /*    profilePage: ProfilePageType
        callbackAddPost: () => void
        newPostText: string
        updateNewPostText: (newText: string) => void*/
    state: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
        </div>
    );
};