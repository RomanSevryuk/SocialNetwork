import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

export type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageText: string) => void
}

type FormDataType = {
    newMessageText: string
}

export const Dialogs = ({dialogsPage, sendMessage}: DialogsType) => {

    const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (formData: FormDataType) => {
        sendMessage(formData.newMessageText)
    }

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

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageText'} component={Textarea} placeholder={'Enter yor message'}
                       validate={[requiredField, maxLength50]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)