//store
import {addPostAC, profilePageReducer, updateNewPostTextAC} from "./profile-reducer";
import {dialogsPageReducer, sendMessageAC, updateNewMessageTextAC} from "./dialogs-reducer";

const store: StoreType = {
    //state
    _state: {
        profilePage: {
            newPostText: "",
            posts: [
                {id: "1", message: 'Hi, how are you?', likeCounts: 15},
                {id: "2", message: 'It\'s my first post', likeCounts: 20},
                {id: "2", message: "It's my first post", likeCounts: 20},
            ],
        },
        dialogsPage: {
            newMessageText: "",
            messages: [
                {id: "1", message: "Hi!"},
                {id: "2", message: "How are you?"},
                {id: "3", message: "Hello!"},
                {id: "4", message: "Привет!"},
                {id: "5", message: "Как дела?"},
                {id: "6", message: "Круто!"},
            ],
            dialogs: [
                {id: "1", name: "Roman"},
                {id: "2", name: "Olya"},
                {id: "3", name: "Sergey"},
                {id: "4", name: "Lolita"},
                {id: "5", name: "Marina"},
                {id: "6", name: "Dima"},
            ],
        },
    },
    //methods
    _callSubscriber() {
        console.log("state changed")
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        //this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        //this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    },
}

//types
type DialogsType = {
    id: string
    name: string
}
type MessagesType = {
    id: string
    message: string
}
type PostsType = {
    id: string
    message: string
    likeCounts: number
}
type ProfilePageType = {
    newPostText: string
    posts: Array<PostsType>
}
type DialogsPageType = {
    newMessageText: string
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}
type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}
type StoreType = {
    _state: {
        profilePage: ProfilePageType
        dialogsPage: DialogsPageType
    }
    _callSubscriber: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    getState: () => StateType
    dispatch: (action: ActionsTypes) => void
}
type ActionsTypes =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>
