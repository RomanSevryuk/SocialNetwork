import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '952ba3a5-01c9-4ea4-89c6-9f038a1076bd'},
})