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
    newMessageText: string
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: {
        profilePage: ProfilePageType
        dialogsPage: DialogsPageType
    }
    _callSubscriber: (state: StateType) => void
    updateNewMessageText: (newText: string) => void
    updateNewPostText: (newText: string) => void
    addPost: () => void
    addMessage: () => void
    subscribe: (observer: (state: StateType) => void) => void
    getState: () => StateType
}

export const store: StoreType = {
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
        },
    },
    _callSubscriber() {
        console.log("state changed")
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber(this._state)
    },
    addPost() {
        const newPost: PostsType = {
            id: "5",
            message: this._state.profilePage.newPostText,
            likeCounts: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._callSubscriber(this._state)
    },
    addMessage() {
        const newMessage: MessagesType = {
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage)
        this._state.dialogsPage.newMessageText = ""
        this._callSubscriber(this._state)
    },
    updateNewMessageText(newText: string) {
        this._state.dialogsPage.newMessageText = newText
        this._callSubscriber(this._state)
    },
}
