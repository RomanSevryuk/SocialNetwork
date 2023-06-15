import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogs-reducer";

export type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: () => void
    updateNewMessageText: (e: string) => void
}

export const Dialogs = (props: DialogsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>()

    const sendMessage = () => {
        if (newMessageElement.current) {
            props.sendMessage()
        }
    }

    const onUpdateNewMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                <textarea placeholder={'Enter yor message'}
                          ref={newMessageElement}
                          onChange={onUpdateNewMessageTextHandler}
                          value={props.dialogsPage.newMessageText}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
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