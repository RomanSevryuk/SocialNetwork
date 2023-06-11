import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/store";

type DialogsType = {
    /*    dialogsPage: DialogsPageType
        callbackAddMessage: () => void
        callbackUpdateNewMessageText: (newText: string) => void
        newMessageText: string*/
    state: DialogsPageType
    addMessage: () => void
    updateNewMessageText: (newText: string) => void
}

export const Dialogs = (props: DialogsType) => {

    const dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.state.messages.map(m => <Message message={m.message}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        if (newMessageElement.current) {
            props.addMessage()
        }
    }

    const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                <textarea ref={newMessageElement} onChange={onMessageChangeHandler}
                          value={props.state.newMessageText}></textarea>
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