import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import s from './user.module.css'
import axios from 'axios'
import userPhoto from '../../images/avatar.jpg'

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

type ResponseType = {
    items: Array<UsersType>
}

export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        /*        props.setUsers([
                    {
                        id: '1',
                        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxQzf4mxspBvm8Gw5sEs1nvnl-ellTNmOgzFEIb18ApI1Duc7ptLDOrKmVb9567wSvY0&usqp=CAU',
                        followed: false,
                        fullName: 'Dmitry',
                        status: 'I am fine',
                        location: {city: 'Minsk', country: 'Belarus'}
                    },
                    {
                        id: '2',
                        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxQzf4mxspBvm8Gw5sEs1nvnl-ellTNmOgzFEIb18ApI1Duc7ptLDOrKmVb9567wSvY0&usqp=CAU',
                        followed: false,
                        fullName: 'Roman',
                        status: 'Ok',
                        location: {city: 'Mozyr', country: 'Belarus'}
                    },
                    {
                        id: '3',
                        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxQzf4mxspBvm8Gw5sEs1nvnl-ellTNmOgzFEIb18ApI1Duc7ptLDOrKmVb9567wSvY0&usqp=CAU',
                        followed: true,
                        fullName: 'Sergey',
                        status: 'Good',
                        location: {city: 'Kiev', country: 'Ukraine'}
                    },
                    {
                        id: '4',
                        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxQzf4mxspBvm8Gw5sEs1nvnl-ellTNmOgzFEIb18ApI1Duc7ptLDOrKmVb9567wSvY0&usqp=CAU',
                        followed: true,
                        fullName: 'Olya',
                        status: 'I am bad',
                        location: {city: 'Minsk', country: 'Belarus'}
                    },
                ])*/

        axios.get<ResponseType>('https://social-network.samuraijs.com/api/1.0/users')
            .then((response) => {
                props.setUsers(response.data.items)
            })
    }

    return <div>
        {props.users.map(el => <div key={el.id}>
            <span>
                <div>
                    <img alt={"AVATAR"} className={s.userPhoto}
                         src={el.photos.small !== null ? el.photos.small : userPhoto}/>
                </div>
                <div>
                    {el.followed
                        ? <button onClick={() => props.unfollow(el.id)}>Unfollow</button>
                        : <button onClick={() => props.follow(el.id)}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                <div>{el.name}</div>
                <div>{el.status}</div>
            </span>
            <span>
                <div>Minsk, Belarus</div>
                {/*<div>Minsk, Belarus</div>*/}
            </span>
            </span>
        </div>)}
    </div>
};