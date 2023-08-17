import {DialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppRootStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageText: (newText: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: () => dispatch(sendMessageAC()),
        updateNewMessageText: (newText: string) => dispatch(updateNewMessageTextAC(newText)),
    }
}
export const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)