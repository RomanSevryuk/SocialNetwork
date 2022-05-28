import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileType = {
    profilePage: ProfilePageType
    callbackAddPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     callbackAddPost={props.callbackAddPost}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    );
};