import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import avatar from "../../../assets/images/avatar.jpg"
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatusTC: (status: string) => void
}

export const ProfileInfo = ({profile, status, updateUserStatusTC}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.content}>
                <img src='https://i.pinimg.com/originals/30/80/1c/30801c76ad257c29de8d2f28beabab38.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.avatar} src={profile?.photos.large || avatar}/>
                <ProfileStatusWithHooks statusProp={status} updateUserStatusTC={updateUserStatusTC}/>
            </div>
        </div>
    );
};