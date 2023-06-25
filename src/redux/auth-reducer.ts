import {Dispatch} from "redux";
import {authAPI, ResponseDataType} from "../api/auth-api";

const initialState: ResponseDataType & AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            return {...state, ...action.userData, isAuth: action.isAuth}
        default:
            return state
    }
}

//actions
export const setAuthUserData = (userData: ResponseDataType, isAuth: boolean) => ({
    type: 'SET-AUTH-USER-DATA',
    userData,
    isAuth
} as const)

//thunks
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                const {id, login, email} = response.data.data
                dispatch(setAuthUserData({id, login, email}, true))
            }
        })
}

//types
type InitialStateType = typeof initialState
export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type ActionsTypes =
    | ReturnType<typeof setAuthUserData>


