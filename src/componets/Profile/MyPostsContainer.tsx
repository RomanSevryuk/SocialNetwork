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

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => dispatch(addPostAC()),
        updateNewPostText: (newText: string) => dispatch(updateNewPostTextAC(newText)),
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)