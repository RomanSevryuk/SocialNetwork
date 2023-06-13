import React from 'react';
import {MyPosts} from "./MyPosts";
import {ActionsTypes, StateType} from "../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../redux/profile-reducer";

type MyPostsContainerType = {
    state: StateType
    dispatch: (action: ActionsTypes) => void
}

export const MyPostsContainer = (props: MyPostsContainerType) => {

    const state = props.state.profilePage

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    const updateNewPostText = (newText: string) => {
        props.dispatch(updateNewPostTextAC(newText))
    }

    return <MyPosts state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
};