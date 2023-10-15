import {instance} from "./instance-axiosAPI";
import {ProfileType} from "../redux/profile-reducer";

type ResponseProfileType = ProfileType
type ResponseStatusType = {
    resultCode: number
    messages: Array<string>
    data: Object
}

export const profileAPI = {
    getProfile(userID: string) {
        return instance.get<ResponseProfileType>(`profile/${userID}`)
            .then(response => response.data)
    },
    getStatus(userID: string) {
        return instance.get<string>(`profile/status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseStatusType>(`profile/status`, {status})
    },
}
