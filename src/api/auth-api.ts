import {instance} from "./instance-axiosAPI";

export type ResponseDataType = {
    id?: number | null
    login?: string | null
    email?: string | null
}
export type ResponseAuthType = {
    data: ResponseDataType
    messages: Array<string>
    fieldsErrors?: Array<string>
    resultCode: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseAuthType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string) {
        return instance.post<ResponseAuthType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<ResponseAuthType>(`auth/login`)
    },
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}
