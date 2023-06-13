import React from 'react';
import {MyPosts} from "./MyPosts";
import {addPostAC, ProfilePageType, updateNewPostTextAC} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

export type MapStateToPropsType = {
    profilePage: ProfilePageType
}

export type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
}
/*export const MyPostsContainer = (props: MyPostsContainerType) => {

    const state = props.state.profilePage

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    const updateNewPostText = (newText: string) => {
        props.dispatch(updateNewPostTextAC(newText))
    }

    return <MyPosts state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
};*/

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostTextAC(newText))
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)