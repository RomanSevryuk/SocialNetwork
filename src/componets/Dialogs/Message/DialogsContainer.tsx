import React from 'react';
import {ActionsTypes, StateType} from "../../../redux/store";
import {sendMessageAC, updateNewMessageTextAC} from "../../../redux/dialogs-reducer";
import {Dialogs} from "../Dialogs";

type DialogsContainerType = {
    state: StateType
    dispatch: (action: ActionsTypes) => void
}

export const DialogsContainer = (props: DialogsContainerType) => {

    const state = props.state.dialogsPage

    const sendMessage = () => {
        props.dispatch(sendMessageAC())
    }

    const updateNewMessageText = (newText: string) => {
        props.dispatch(updateNewMessageTextAC(newText))
    }

    return <Dialogs state={state} sendMessage={sendMessage} updateNewMessageText={updateNewMessageText}/>
};