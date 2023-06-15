const initialState: ProfilePageType = {
    newPostText: "" as string,
    posts: [
        {id: "1", message: 'Hi, how are you?', likeCounts: 15},
        {id: "2", message: 'It\'s my first post', likeCounts: 20},
        {id: "3", message: "It's my first post", likeCounts: 20},
    ] as Array<PostsType>,
}

export const profilePageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostsType = {
                id: "5",
                message: state.newPostText,
                likeCounts: 0
            }
            state.newPostText = ''
/*            state.posts.push(newPost)
            state.newPostText = ""*/
            return {...state, posts: [...state.posts, newPost]}
        case "UPDATE-NEW-POST-TEXT":
            //state.newPostText = action.newText
            return {...state, newPostText: action.newText}
        default:
            return state
    }
}

//actions
export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText} as const)

//types
type InitialStateType = typeof initialState
export type ProfilePageType = {
    newPostText: string
    posts: Array<PostsType>
}
type PostsType = {
    id: string
    message: string
    likeCounts: number
}
type ActionsTypes =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>

