import React from 'react';
import s from './../Dialogs.module.css';

type MessageTypeProps = {
    message: string
}

export const Message = (props: MessageTypeProps) => {
    return <div className={s.message}>{props.message}</div>
}