import React from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType} from "./ProfileInfo";
import s from "../../common/FormsControls/FormsControls.module.css";


type ProfileDataFormType = {
    profile: ProfileType;
};

const ProfileDataForm: React.FC<InjectedFormProps<FormDataType, ProfileDataFormType> & ProfileDataFormType> = ({
                                                                                                                   handleSubmit,
                                                                                                                   profile,
                                                                                                                   error
                                                                                                               }) => {
    return (
        <form onSubmit={handleSubmit}>
            {<div>
                <button onClick={() => {
                }}>save
                </button>
                {error && <div className={s.formSummaryError}> {error}</div>}
            </div>}
            <div>
                <b>Full name:</b> {createField('Full name', Input, 'fullName', [])}
            </div>
            <div>
                <b>Looking for a job:</b>
                {createField('Looking for a job:', Input, 'lookingForAJob', [], 'checkbox')}
            </div>
            <div>
                <b>My professionals skills:</b>
                {createField('My professionals skills:', Textarea, 'lookingForAJobDescription', [])}
            </div>
            <div>
                <b>About me:</b>
                {createField('About me:', Textarea, 'aboutMe', [])}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div style={{paddingLeft: '10px'}} key={key}>
                    <b>{key}: </b> {createField(key, Input, 'contacts.' + key, [])}
                </div>
            })}
            </div>
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm<FormDataType, ProfileDataFormType>({form: 'editProfile'})(ProfileDataForm)

