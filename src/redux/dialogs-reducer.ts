let initialState = {
    newMessageText: "",
    messages: [
        {id: "1", message: "Hi!"},
        {id: "2", message: "How are you?"},
        {id: "3", message: "Hello!"},
        {id: "4", message: "Привет!"},
        {id: "5", message: "Как дела?"},
        {id: "6", message: "Круто!"},
    ] as Array<MessagesType>,
    dialogs: [
        {id: "1", name: "Roman"},
        {id: "2", name: "Olya"},
        {id: "3", name: "Sergey"},
        {id: "4", name: "Lolita"},
        {id: "5", name: "Marina"},
        {id: "6", name: "Dima"},
    ] as Array<DialogsType>,
}

export const dialogsPageReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage: MessagesType = {
                id: '7',
                message: state.newMessageText,
            }
            state.newMessageText = ''
            /*            state.messages.push(newMessage)
                        state.newMessageText = ""*/
            return {...state, messages: [...state.messages, newMessage]}
        case "UPDATE-NEW-MESSAGE-TEXT":
            /*state.newMessageText = action.newText*/
            return {...state, newMessageText: action.newText}
        default:
            return state
    }
}

//actions
export const sendMessageAC = () =>
    ({type: 'SEND-MESSAGE'} as const)
export const updateNewMessageTextAC = (newText: string) =>
    ({type: 'UPDATE-NEW-MESSAGE-TEXT', newText: newText} as const)

//types
type InitialStateType = typeof initialState
export type DialogsPageType = {
    newMessageText: string
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}
export type DialogsType = {
    id: string
    name: string
}
type MessagesType = {
    id: string
    message: string
}
type ActionsTypes =
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof updateNewMessageTextAC>
