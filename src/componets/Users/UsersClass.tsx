import React from 'react';
import s from "./user.module.css";
import userPhoto from "../../images/avatar.jpg";
import {UsersType} from "../../redux/users-reducer";
import axios from "axios";

type UsersClassPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

type ResponseType = {
    items: Array<UsersType>
    totalCount: number
}

export class UsersClass extends React.Component<UsersClassPropsType> {

    componentDidMount() {
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages: Array<number> = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        //pagination
        let currentPageStart = ((this.props.currentPage - 5) < 0) ? 0 : this.props.currentPage - 5;
        let currentPageEnd = this.props.currentPage + 5;
        let slicedPages = pages.slice(currentPageStart, currentPageEnd);

        return <div>
            <div>
                <p></p>
                {((this.props.currentPage + 5) > 10) &&
                    <span style={{cursor: 'pointer', padding: '5px', marginLeft: '7px'}}
                          className={this.props.currentPage === Number(pages[0])
                              ? s.selectedPage : s.allPage}
                          onClick={() => this.onPageChanged(Number(pages[0]))}>{pages[0]}</span>}
                {(this.props.currentPage + 5) > 10 &&
                    <span style={{cursor: 'default'}}> . . .</span>}
                {slicedPages.map((el) => {
                    return <span style={{cursor: 'pointer', marginLeft: '7px', padding: '5px'}}
                                 className={this.props.currentPage === el ? s.selectedPage : s.allPage}
                                 onClick={() => this.onPageChanged(el)}>{el}
                    </span>
                })}
                <span style={{cursor: 'default'}}> . . . </span>
                <span style={{cursor: 'pointer', padding: '5px'}}
                      className={this.props.currentPage === Number(pages.slice(-1))
                          ? s.selectedPage : s.allPage}
                      onClick={() => this.onPageChanged(Number(pages.slice(-1)))}>{pages.slice(-1)}
                    </span>
            </div>
            <p></p>
            {this.props.users.map(el => <div key={el.id}>
            <span>
                <div>
                    <img alt={"AVATAR"} className={s.userPhoto}
                         src={el.photos.small !== null ? el.photos.small : userPhoto}/>
                </div>
                <div>
                    {el.followed
                        ? <button onClick={() => this.props.unfollow(el.id)}>Unfollow</button>
                        : <button onClick={() => this.props.follow(el.id)}>Follow</button>}
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
    }
};