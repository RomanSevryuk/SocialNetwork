let initialState: UsersPageType = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
}

export const usersPageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case "SET-USERS":
            return {...state, users: [...action.users]}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.pageNumber}
        case "SET-TOTAL-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//actions
export const followAC = (userID: number) => ({type: 'FOLLOW', userID} as const)
export const unFollowAC = (userID: number) => ({type: 'UNFOLLOW', userID} as const)
export const setUsersAC = (users: Array<UsersType>) => ({type: 'SET-USERS', users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)

//types
type InitialStateType = typeof initialState
export type UsersPageType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
export type UsersType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: { small: string, large: string }
    status: string
    followed: boolean
    //location: { city: string, country: string }
    //photoURL: string
}

type ActionsTypes =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
