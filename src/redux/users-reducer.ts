import {usersAPI} from "../api/users-api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";

let initialState: UsersPageType = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

export const usersPageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        //return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})}
        case 'users/UNFOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        //return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})}
        case "users/SET-USERS":
            return {...state, users: [...action.users]}
        case "users/SET-CURRENT-PAGE":
            return {...state, currentPage: action.pageNumber}
        case "users/SET-TOTAL-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "users/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "users/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(el => el !== action.id)
            }
        default:
            return state
    }
}

//actions
export const followSuccess = (userID: number) => ({type: 'users/FOLLOW', userID} as const)
export const unfollowSuccess = (userID: number) => ({type: 'users/UNFOLLOW', userID} as const)
export const setUsers = (users: Array<UsersType>) => ({type: 'users/SET-USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'users/SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'users/SET-TOTAL-COUNT', totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'users/TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingInProgress = (isFetching: boolean, id: number) => ({
    type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching,
    id
} as const)

//thunks
export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, id))
    const data = await apiMethod(id)
    if (data.resultCode === 0)
        dispatch(actionCreator(id))
    dispatch(toggleFollowingInProgress(false, id))
}

export const followTC = (id: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.followUser, followSuccess)
}
export const unfollowTC = (id: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.unfollowUser, unfollowSuccess)
}

//types
type InitialStateType = typeof initialState
export type UsersPageType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type UsersType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: { small: string, large: string }
    status: string
    followed: boolean
    //location: { city: string, country: string }
    //photoURL: string
}

type ActionsTypes =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>
