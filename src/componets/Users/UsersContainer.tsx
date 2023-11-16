import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {followTC, getUsersTC, unfollowTC, UsersType} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

export type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type UsersClassPropsType = {
    followTC: (userID: number) => void
    unfollowTC: (userID: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
} & MapStateToPropsType

export class UsersContainerClass extends React.Component<UsersClassPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersTC(currentPage, pageSize)
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
})

export const UsersContainer = connect(mapStateToProps, {
    followTC, unfollowTC,
    getUsersTC,
})(UsersContainerClass)