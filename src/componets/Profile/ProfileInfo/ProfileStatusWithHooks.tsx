import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusWithHooksPropsType = {
    status: string
    updateUserStatusTC: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusWithHooksPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        debugger
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => setEditMode(true)
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatusTC(status)
    }

    return (
        <>
            {!editMode ?
                <div><span onDoubleClick={activateEditMode}>{props.status || '----------'}</span></div>
                :
                <div><input value={status} onChange={onStatusChange}
                            onBlur={deactivateEditMode} autoFocus={true}/></div>}
        </>
    );
}
