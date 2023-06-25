import {instance} from "./instance-axiosAPI";

export type ResponseDataType = {
    id: number | null
    login: string | null
    email: string | null
}
export type ResponseAuthType = {
    data: ResponseDataType
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseAuthType>(`auth/me`)
    },
}
