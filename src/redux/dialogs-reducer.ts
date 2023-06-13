import {ActionsTypes, DialogsPageType, MessagesType,} from "./store";

let initialState: DialogsPageType = {
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
}

export const dialogsPageReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage: MessagesType = {
                id: '7',
                message: state.newMessageText,
            }
            state.newMessageText = ''
/*            state.messages.push(newMessage)
            state.newMessageText = ""*/
            debugger
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