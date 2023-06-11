import {ActionsTypes, PostsType, ProfilePageType,} from "./store";

export const profilePageReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostsType = {
                id: "5",
                message: state.newPostText,
                likeCounts: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

//actions
export const addPostAC = () => ({type: 'ADD-POST'} as const)
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const)