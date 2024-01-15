import {UsersType} from "../redux/users-reducer";
import {instance} from "./instance-axiosAPI";

type ResponseUsersType = {
    items: Array<UsersType>
    totalCount: number
}

type ResponseFollowUnfollowUserType = {
    resultCode: number
    messages: Array<string>
    data: Object
}


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 1) {
        return instance.get<ResponseUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollowUser(id: number) {
        return instance.delete<ResponseFollowUnfollowUserType>(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    followUser(id: number) {
        return instance.post<ResponseFollowUnfollowUserType>(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
}
