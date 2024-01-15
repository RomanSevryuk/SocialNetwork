import React from 'react';
import s from "./user.module.css";
import userPhoto from "../../assets/images/avatar.jpg";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export const User = ({
                         user,
                         followingInProgress,
                         follow,
                         unfollow,
                     }: UserPropsType) => {

    return <div style={{marginLeft: '7px', paddingBottom: '30px'}}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img alt={"AVATAR"} className={s.userPhoto}
                         src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }
                        }>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}
                </div>
            </span>
        <span>
                <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>Minsk, Belarus</div>
            </span>
            </span>
    </div>
};