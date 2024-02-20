import {Dispatch} from "redux";
import {toggleIsFetching} from "./users-reducer";
import {profileAPI} from "../api/profile-api";
import {AppRootStateType, AppThunkDispatch} from "./redux-store";
import {FormDataType} from "../componets/Profile/ProfileInfo/ProfileInfo";
import {stopSubmit} from "redux-form";

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
        case 'profile/ADD-POST':
            const newPost: PostsType = {
                id: "5",
                message: action.newPostText,
                likeCounts: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case "profile/SET-USER-PROFILE":
            return {...state, profile: action.profileData}
        case "profile/SET-STATUS":
            return {...state, status: action.status}
        case "profile/SAVE-PHOTO-SUCCESS":
            return state.profile !== null ?
                {
                    ...state, profile: {...state.profile, photos: {...state.profile.photos, large: action.photos}}
                } : state
        default:
            return state
    }
}

//actions
export const addPost = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const)
export const setUserProfile = (profileData: ProfileType) => ({type: 'profile/SET-USER-PROFILE', profileData} as const)
export const setStatus = (status: string) => ({type: 'profile/SET-STATUS', status} as const)
export const savePhotoSuccess = (photos: string) => ({type: 'profile/SAVE-PHOTO-SUCCESS', photos} as const)

//thunks
export const getProfileTC = (userID: string) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await profileAPI.getProfile(userID)
    dispatch(toggleIsFetching(false))
    dispatch(setUserProfile(data))
}
export const getUserStatusTC = (userID: string) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await profileAPI.getStatus(userID)
    dispatch(toggleIsFetching(false))
    dispatch(setStatus(data.data))
}

export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        const data = await profileAPI.updateStatus(status)
        dispatch(toggleIsFetching(false))
        if (data.data.resultCode === 0)
            dispatch(setStatus(status))
    } catch (error) {
        console.log(error)
    }

}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await profileAPI.savePhoto(file)
    dispatch(toggleIsFetching(false))

    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos))
}

export const saveProfile = (profile: FormDataType) => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    const userId = getState().auth.id
    dispatch(toggleIsFetching(true))
    const response = await profileAPI.saveProfile(profile)
    dispatch(toggleIsFetching(false))
    if (response.data.resultCode === 0) {
        if (userId !== null)
            dispatch(getProfileTC(userId.toString()))
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
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
        small?: string
        large?: string
    }
}
export type ContactsProfileType = {
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
    | ReturnType<typeof savePhotoSuccess>
