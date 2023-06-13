import React from 'react';
import {DialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../../redux/dialogs-reducer";
import {Dialogs} from "../Dialogs";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";

export type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageText: (newText: string) => void
}
/*export const DialogsContainer = (props: DialogsContainerType) => {

    const state = props.state.dialogsPage

    const sendMessage = () => {
        props.dispatch(sendMessageAC())
    }

    const updateNewMessageText = (newText: string) => {
        props.dispatch(updateNewMessageTextAC(newText))
    }

    return <Dialogs state={state} sendMessage={sendMessage} updateNewMessageText={updateNewMessageText}/>
};*/

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC())
        },
        updateNewMessageText: (newText: string) => {
            dispatch(updateNewMessageTextAC(newText))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)