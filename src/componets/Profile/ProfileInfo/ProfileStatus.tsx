import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateUserStatusTC: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateUserStatusTC(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (<>
                {!this.state.editMode ?
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status || '----------'}</span></div>
                    :
                    <div><input value={this.state.status} onChange={this.onStatusChange}
                                onBlur={this.deactivateEditMode} autoFocus={true}/></div>}
            </>
        );
    }
}