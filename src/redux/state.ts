import {rerenderEntireTree} from "../render";

type DialogsType = {
    id: string
    name: string
}

type MessagesType = {
    message: string
}

export type PostsType = {
    id: string
    message: string
    likeCounts: number
}

export type ProfilePageType = {
    newPostText: string
    posts: Array<PostsType>
}

export type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export const state: RootStateType = {
    profilePage: {
        newPostText: "",
        posts: [
            {id: "1", message: 'Hi, how are you?', likeCounts: 15},
            {id: "2", message: 'It\'s my first post', likeCounts: 20},
            {id: "2", message: "It's my first post", likeCounts: 20},
        ],
    },
    dialogsPage: {
        messages: [
            {message: "Hi!"},
            {message: "How are you?"},
            {message: "Hello!"},
            {message: "Привет!"},
            {message: "Как дела?"},
            {message: "Круто!"},
        ],
        dialogs: [
            {id: "1", name: "Roman"},
            {id: "2", name: "Olya"},
            {id: "3", name: "Sergey"},
            {id: "4", name: "Lolita"},
            {id: "5", name: "Marina"},
            {id: "6", name: "Dima"},
        ],
    }
}

export const addPost = () => {
    const newPost: PostsType = {
        id: "5",
        message: state.profilePage.newPostText,
        likeCounts: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ""
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)

}


