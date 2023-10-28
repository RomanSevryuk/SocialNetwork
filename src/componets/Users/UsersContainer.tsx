import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {followTC, getUsersTC, unfollowTC, UsersType} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

export type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type UsersClassPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    followTC: (userID: number) => void
    unfollowTC: (userID: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
}

export class UsersContainerClass extends React.Component<UsersClassPropsType> {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => this.props.getUsersTC(pageNumber, this.props.pageSize)

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   pageSize={this.props.pageSize}
                   follow={this.props.followTC}
                   unfollow={this.props.unfollowTC}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
})

export const UsersContainer = connect(mapStateToProps, {
    followTC, unfollowTC,
    getUsersTC,
})(UsersContainerClass)