import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../../assets/Preloader/Preloader";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (<>
                {!this.state.editMode ?
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status}</span></div>
                    :
                    <div><input value={this.props.status} onBlur={this.deactivateEditMode} autoFocus={true}/></div>}
            </>
        );
    }
}