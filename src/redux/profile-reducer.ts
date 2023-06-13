import {ActionsTypes, PostsType, ProfilePageType,} from "./store";

const initialState: ProfilePageType = {
    newPostText: "",
    posts: [
        {id: "1", message: 'Hi, how are you?', likeCounts: 15},
        {id: "2", message: 'It\'s my first post', likeCounts: 20},
        {id: "2", message: "It's my first post", likeCounts: 20},
    ],
}

export const profilePageReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
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
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const)