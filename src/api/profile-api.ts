import {instance} from "./instance-axiosAPI";
import {ProfileType} from "../redux/profile-reducer";
import {FormDataType, ProfileDataType} from "../componets/Profile/ProfileInfo/ProfileInfo";

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
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<any>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: FormDataType) {
        return instance.put<any>(`profile`, profile)
    },
}
