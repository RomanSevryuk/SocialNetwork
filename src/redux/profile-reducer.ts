import {Dispatch} from "redux";
import {toggleIsFetching} from "./users-reducer";
import {profileAPI} from "../api/profile-api";

const initialState: ProfilePageType = {
    posts: [
        {id: "1", message: 'Hi, how are you?', likeCounts: 15},
        {id: "2", message: 'It\'s my first post', likeCounts: 20},
        {id: "3", message: "It's my first post", likeCounts: 20},
    ] as Array<PostsType>,
    profile: null,
    status: "",
}

export const profilePageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostsType = {
                id: "5",
                message: action.newPostText,
                likeCounts: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case "SET-USER-PROFILE":
            return {...state, profile: action.profileData}
        case "SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

//actions
export const addPost = (newPostText: string) => ({type: 'ADD-POST', newPostText} as const)
export const setUserProfile = (profileData: ProfileType) => ({type: 'SET-USER-PROFILE', profileData} as const)
export const setStatus = (status: string) => ({type: 'SET-STATUS', status} as const)

//thunks
export const getProfileTC = (userID: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getProfile(userID)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUserProfile(data))
        })
}
export const getUserStatusTC = (userID: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getStatus(userID)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setStatus(data.data))
        })
}

export const updateUserStatusTC = (status: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.updateStatus(status)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            if (data.data.resultCode === 0)
                dispatch(setStatus(status))
        })
}

//types
type InitialStateType = typeof initialState

export type ProfileType = {
    aboutMe: string
    contacts: ContactsProfileType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}
type ContactsProfileType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    status: string
}
export type PostsType = {
    id: string
    message: string
    likeCounts: number
}
type ActionsTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
