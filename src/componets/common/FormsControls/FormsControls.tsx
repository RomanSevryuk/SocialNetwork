import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import s from './FormsControls.module.css'


type WrappedFieldPropsType = {
    input?: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

export const FormControl: React.FC<WrappedFieldPropsType> = ({meta, children, ...props}) => {
    const showError = meta.touched && meta.error
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div> {children} </div>
            {showError && <span>{meta.error}</span>}
        </div>
    );
};

export const Textarea: React.FC<WrappedFieldPropsType> = ({input, ...props}) => {
    return <FormControl {...props}> <textarea {...input} {...props}/> </FormControl>
};

export const Input: React.FC<WrappedFieldPropsType> = ({input, ...props}) => {
    return <FormControl {...props}> <input {...input} {...props}/> </FormControl>
};