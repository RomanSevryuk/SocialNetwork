import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (pageNumber: number) => void
}

export const Users = ({
                          users,
                          pageSize,
                          totalUsersCount,
                          currentPage,
                          followingInProgress,
                          follow,
                          unfollow,
                          onPageChanged
                      }: UsersPropsType) => {

    return <div>
        <Paginator pageSize={pageSize} totalCount={totalUsersCount} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {
            users.map(el => <User key={el.id} user={el} followingInProgress={followingInProgress} follow={follow}
                                  unfollow={unfollow}/>
            )}
    </div>
};