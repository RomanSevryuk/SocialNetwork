import React from 'react';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import s from './FormsControls.module.css'
import {FieldValidatorsType} from "../../../utils/validators/validators";

type WrappedFieldPropsType = {
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

export const Textarea: React.FC<WrappedFieldProps> = ({input, ...props}) => {
    return <FormControl {...props}> <textarea {...input} {...props}/> </FormControl>
};

export const Input: React.FC<WrappedFieldProps> = ({input, ...props}) => {
    return <FormControl {...props}> <input {...input} {...props}/> </FormControl>
};

export function createField<T extends string>(placeholder: string | undefined,
                                              component: React.FC<WrappedFieldProps>,
                                              name: T,
                                              validate: Array<FieldValidatorsType>,
                                              type?: string) {
    return <div>
        <Field placeholder={placeholder} component={component} name={name} validate={validate} type={type}/>
    </div>
}