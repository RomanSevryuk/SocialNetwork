import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {addPost, ProfilePageType} from "../../redux/state";

type ProfileType = {
    profilePage: ProfilePageType
    callbackAddPost: (message: string )=> void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts} callbackAddPost={props.callbackAddPost}/>
        </div>
    );
};