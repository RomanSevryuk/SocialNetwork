import React from 'react';
import s from './ProfileInfo.module.css';

export const ProfileInfo = () => {
    return (
        <div>
            <div className={s.content}>
                <img src='https://i.pinimg.com/originals/30/80/1c/30801c76ad257c29de8d2f28beabab38.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                avatar
            </div>
        </div>
    );
};