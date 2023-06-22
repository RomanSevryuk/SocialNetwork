import axios from "axios";
import {UsersType} from "../redux/users-reducer";

type ResponseType = {
    items: Array<UsersType>
    totalCount: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '952ba3a5-01c9-4ea4-89c6-9f038a1076bd'},
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 1) {
        return instance.get<ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}
