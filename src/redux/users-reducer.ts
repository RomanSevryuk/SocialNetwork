let initialState: UsersPageType = {
    users: [] as Array<UsersType>
}

export const usersPageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

//actions
export const followAC = (userID: number) => ({type: 'FOLLOW', userID} as const)
export const unFollowAC = (userID: number) => ({type: 'UNFOLLOW', userID} as const)
export const setUsersAC = (users: Array<UsersType>) => ({type: 'SET-USERS', users} as const)

//types
type InitialStateType = typeof initialState
export type UsersPageType = {
    users: Array<UsersType>
}
export type UsersType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: {small: string, large: string}
    status: string
    followed: boolean
    //location: { city: string, country: string }
    //photoURL: string
}

type ActionsTypes =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
