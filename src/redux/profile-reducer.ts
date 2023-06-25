import {Dispatch} from "redux";
import {toggleIsFetching} from "./users-reducer";
import {profileAPI} from "../api/profile-api";

const initialState: ProfilePageType = {
    newPostText: "" as string,
    posts: [
        {id: "1", message: 'Hi, how are you?', likeCounts: 15},
        {id: "2", message: 'It\'s my first post', likeCounts: 20},
        {id: "3", message: "It's my first post", likeCounts: 20},
    ] as Array<PostsType>,
    profile: null,
}

export const profilePageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostsType = {
                id: "5",
                message: state.newPostText,
                likeCounts: 0
            }
            state.newPostText = ''
            return {...state, posts: [...state.posts, newPost]}
        case "UPDATE-NEW-POST-TEXT":
            return {...state, newPostText: action.newText}
        case "SET-USER-PROFILE":
            return {...state, profile: action.profileData}
        default:
            return state
    }
}

//actions
export const addPost = () => ({type: 'ADD-POST'} as const)
export const updateNewPostText = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText} as const)
export const setUserProfile = (profileData: ProfileType) => ({type: 'SET-USER-PROFILE', profileData} as const)

//thunks
export const getProfileTC = (userID: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getProfile(userID)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUserProfile(data))
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
    newPostText: string
    posts: Array<PostsType>
    profile: ProfileType | null
}
type PostsType = {
    id: string
    message: string
    likeCounts: number
}
type ActionsTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof setUserProfile>

