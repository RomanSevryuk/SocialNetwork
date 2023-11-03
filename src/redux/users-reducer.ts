import {usersAPI} from "../api/users-api";
import {Dispatch} from "redux";

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
        case 'FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case "SET-USERS":
            return {...state, users: [...action.users]}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.pageNumber}
        case "SET-TOTAL-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
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
export const followSuccess = (userID: number) => ({type: 'FOLLOW', userID} as const)
export const unfollowSuccess = (userID: number) => ({type: 'UNFOLLOW', userID} as const)
export const setUsers = (users: Array<UsersType>) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingInProgress = (isFetching: boolean, id: number) => ({
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching,
    id
} as const)

//thunks
export const getUsersTC = (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    usersAPI.getUsers(page, pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}
export const followTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    usersAPI.followUser(id)
        .then((data) => {
            if (data.resultCode === 0)
                dispatch(followSuccess(id))
            dispatch(toggleFollowingInProgress(false, id))
        })
}
export const unfollowTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    usersAPI.unfollowUser(id)
        .then((data) => {
            if (data.resultCode === 0)
                dispatch(unfollowSuccess(id))
            dispatch(toggleFollowingInProgress(false, id))
        })
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
