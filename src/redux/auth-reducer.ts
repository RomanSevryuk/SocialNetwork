import {Dispatch} from "redux";
import {authAPI, ResponseDataType, securityApi} from "../api/auth-api";
import {AppThunkDispatch} from "./redux-store";
import {stopSubmit} from "redux-form";

const initialState: ResponseDataType & AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET-AUTH-USER-DATA":
            return {...state, ...action.payload, isAuth: action.isAuth}
        case "auth/GET-CAPTCHA-URL-SUCCESS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actions
export const setAuthUserData = (payload: ResponseDataType, isAuth: boolean) => ({
    type: 'auth/SET-AUTH-USER-DATA',
    payload,
    isAuth
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: 'auth/GET-CAPTCHA-URL-SUCCESS',
    payload: {captchaUrl},
} as const)

//thunks
export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data
        dispatch(setAuthUserData({id, login, email}, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: AppThunkDispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: AppThunkDispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData({id: null, login: null, email: null}, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: AppThunkDispatch) => {
    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

//types
type InitialStateType = typeof initialState
export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type ActionsTypes =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>


