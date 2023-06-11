import {ActionsTypes, DialogsPageType, MessagesType,} from "./store";

export const dialogsPageReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage: MessagesType = {
                id: '7',
                message: state.newMessageText,
            }
            state.messages.push(newMessage)
            state.newMessageText = ""
            return state
        case "UPDATE-NEW-MESSAGE-TEXT":
            state.newMessageText = action.newText
            return state
        default:
            return state
    }
}

//actions
export const sendMessageAC = () =>
    ({type: 'SEND-MESSAGE'} as const)
export const updateNewMessageTextAC = (newText: string) =>
    ({type: 'UPDATE-NEW-MESSAGE-TEXT', newText: newText} as const)