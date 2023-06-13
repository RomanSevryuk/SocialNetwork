import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/store";

type DialogsType = {
    state: DialogsPageType
    sendMessage: () => void
    updateNewMessageText: (e: string) => void
}

export const Dialogs = (props: DialogsType) => {

    const dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.state.messages.map(m => <Message message={m.message}/>)

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
                          value={props.state.newMessageText}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>send message</button>
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