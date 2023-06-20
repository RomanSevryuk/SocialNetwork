import React from 'react';
import s from "./user.module.css";
import userPhoto from "../../images/avatar.jpg";
import {UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: UsersPropsType) => {
    //pagination
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let currentPageStart = ((props.currentPage - 5) < 0) ? 0 : props.currentPage - 5;
    let currentPageEnd = props.currentPage + 5;
    let slicedPages = pages.slice(currentPageStart, currentPageEnd);

    return <div>
        <div>
            <p></p>
            {((props.currentPage + 5) > 10) &&
                <span style={{cursor: 'pointer', padding: '5px', marginLeft: '7px'}}
                      className={props.currentPage === Number(pages[0])
                          ? s.selectedPage : s.allPage}
                      onClick={() => props.onPageChanged(Number(pages[0]))}>{pages[0]}</span>}
            {(props.currentPage + 5) > 10 &&
                <span style={{cursor: 'default'}}> . . .</span>}
            {slicedPages.map((el) => {
                return <span style={{cursor: 'pointer', marginLeft: '7px', padding: '5px'}}
                             className={props.currentPage === el ? s.selectedPage : s.allPage}
                             onClick={() => props.onPageChanged(el)}>{el}
                    </span>
            })}
            <span style={{cursor: 'default'}}> . . . </span>
            <span style={{cursor: 'pointer', padding: '5px'}}
                  className={props.currentPage === Number(pages.slice(-1))
                      ? s.selectedPage : s.allPage}
                  onClick={() => props.onPageChanged(Number(pages.slice(-1)))}>{pages.slice(-1)}
                    </span>
        </div>
        <p></p>
        {props.users.map(el => <div key={el.id} style={{marginLeft: '7px', paddingBottom: '30px'}}>
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