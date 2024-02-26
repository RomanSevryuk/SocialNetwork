import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../componets/common/FormsControls/FormsControls";
import {requiredField} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {AppRootStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from '../componets/common/FormsControls/FormsControls.module.css'

type LoginDataFormType = {
    captchaUrl: string | null
}

type LoginPagePropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
} & MapStateToPropsType

type MapStateToPropsType = {
    isAuth: boolean
} & LoginDataFormType

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type FormDataKeysType = Extract<keyof FormDataType, string>

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginDataFormType> & LoginDataFormType> = ({
                                                                                                         handleSubmit,
                                                                                                         error,
                                                                                                         captchaUrl
                                                                                                     }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<FormDataKeysType>('Email', Input, 'email', [requiredField])}
            {createField<FormDataKeysType>('Password', Input, 'password', [requiredField], 'password')}
            <div>
                <Field type={'checkbox'} component={Input} name={'rememberMe'}/> remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<FormDataKeysType>('Symbols from image', Input, 'captcha', [requiredField])}
            {error && <div className={s.formSummaryError}> {error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export const LoginReduxForm = reduxForm<FormDataType, LoginDataFormType>({form: 'login'})(LoginForm)

const LoginPage = (props: LoginPagePropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/Profile'/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export const LoginPageContainer = connect(mapStateToProps, {login})(LoginPage)