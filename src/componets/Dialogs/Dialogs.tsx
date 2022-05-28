import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

type DialogsType = {
    dialogsPage: DialogsPageType
    callbackAddMessage: () => void
    callbackUpdateNewMessageText: (newText: string) => void
    newMessageText: string
}

export const Dialogs = (props: DialogsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        if (newMessageElement.current) {
            props.callbackAddMessage()
        }
    }

    const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.callbackUpdateNewMessageText(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                <textarea ref={newMessageElement} onChange={onMessageChangeHandler} value={props.newMessageText}></textarea>
            </div>
            <div>
                <button onClick={addMessage}>addMessage</button>
            </div>

            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
            </div>
        </div>
    );
};