import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {ContactsProfileType, ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import avatar from "../../../assets/images/avatar.jpg"
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {ProfileDataReduxForm} from "./ProfileDataForm";

type ProfileInfoPropsType = {
    status: string
    updateUserStatusTC: (status: string) => void
    savePhoto: (e: File) => void
    saveProfile: (e: FormDataType) => Promise<any>
} & ProfileDataType

export type ProfileDataType = {
    profile: ProfileType | null
    isOwner?: boolean
    goToEditMode?: () => void
}

export type FormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

export const ProfileInfo = ({
                                profile,
                                status,
                                updateUserStatusTC,
                                isOwner,
                                savePhoto,
                                saveProfile
                            }: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    const onSubmit = (formData: FormDataType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.content}>
                <img src='https://i.pinimg.com/originals/30/80/1c/30801c76ad257c29de8d2f28beabab38.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.avatar} src={profile?.photos.large || avatar}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks statusProp={status} updateUserStatusTC={updateUserStatusTC}/>
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    );
};

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return <>
        {profile &&
            <div>
                {isOwner && <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>}
                <div>
                    <b>Full name:</b> {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                <div>
                    <b>My professionals skills:</b> {profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>About me:</b> {profile.aboutMe}
                </div>
                <div>
                    <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key}
                                     contactValue={profile.contacts[key as keyof ContactsProfileType]}/>
                })}
                </div>
            </div>
        }
    </>
}

export const Contacts = ({contactTitle, contactValue}: ContactsPropsType) => {
    return <div style={{paddingLeft: '10px'}}><b>{contactTitle}:</b> {contactValue}</div>
}