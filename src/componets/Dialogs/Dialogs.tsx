import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageText: string) => void
    updateNewMessageText: (e: string) => void
    /*    isAuth: boolean*/
}

type FormDataType = {
    newMessageText: string
}

export const Dialogs = (props: DialogsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageText)
    }
    /*
        if(!props.isAuth) return  <Redirect to={'Login'}/>*/

    return (
        <div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
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

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageText'} component={'textarea'} placeholder={'Enter yor message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)