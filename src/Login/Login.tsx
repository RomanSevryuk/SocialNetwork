import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../componets/common/FormsControls/FormsControls";
import {requiredField} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {AppRootStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from '../componets/common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPagePropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

type MapStateToPropsType = {
    isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit,  error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', Input, 'email', [requiredField])}
            {createField('Password', Input, 'password', [requiredField], 'password')}
            <div>
                <Field type={'checkbox'} component={Input} name={'rememberMe'}/> remember me
            </div>
            {error && <div className={s.formSummaryError}> {error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const LoginPage = (props: LoginPagePropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to='/Profile'/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export const LoginPageContainer = connect(mapStateToProps, {login})(LoginPage)