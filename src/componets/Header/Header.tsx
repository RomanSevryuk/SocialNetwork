import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

export const Header = ({isAuth, login, logout}: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://cdn.worldvectorlogo.com/logos/facebook.svg"/>
            <div className={s.loginBlock}>
                {isAuth ?
                    <div>{login} - <button onClick={logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};