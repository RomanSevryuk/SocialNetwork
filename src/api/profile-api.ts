import {instance} from "./instance-axiosAPI";
import {ProfileType} from "../redux/profile-reducer";

type ResponseProfileType = ProfileType

export const profileAPI = {
    getProfile(userID: string) {
        return instance.get<ResponseProfileType>(`profile/${userID}`)
            .then(response => response.data)
    },
}
