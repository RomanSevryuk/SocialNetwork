import {DialogsPageType, sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Redirect, RouteComponentProps} from "react-router-dom";
import React from "react";
import {ProfileClassContainer} from "../Profile/ProfileClassContainer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
/*    isAuth: boolean*/
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageText: (newText: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
/*        isAuth: state.auth.isAuth,*/
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: () => dispatch(sendMessageAC()),
        updateNewMessageText: (newText: string) => dispatch(updateNewMessageTextAC(newText)),
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent))