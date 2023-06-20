import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";

export class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile${}`)
            .then((response) => {
            })
    }

    render() {
        return <Profile />
    }
}