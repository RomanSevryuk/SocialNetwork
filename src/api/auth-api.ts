import {instance} from "./instance-axiosAPI";

export const authAPI = {
    me() {
        return instance.get<ResponseAuthType>(`auth/me`).then((response) => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string) {
        return instance.post<ResponseAuthType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then((response) => response.data)
    },
    logout() {
        return instance.delete<ResponseAuthType>(`auth/login`).then((response) => response.data)
    },
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<ResponseCaptchaType>('security/get-captcha-url').then((response) => response.data.url)
    }
}

//types
export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10,
}

type ResponseCaptchaType = {
    url: string
}

export type ResponseDataType = {
    id?: number | null
    login?: string | null
    email?: string | null
}

export type ResponseAuthType = {
    data: ResponseDataType
    messages: Array<string>
    fieldsErrors?: Array<string>
    resultCode: ResultCodes | ResultCodesForCaptcha
}