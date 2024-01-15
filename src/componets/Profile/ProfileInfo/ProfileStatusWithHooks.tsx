import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusWithHooksPropsType = {
    statusProp: string
    updateUserStatusTC: (status: string) => void
}

export const ProfileStatusWithHooks = ({statusProp, updateUserStatusTC}: ProfileStatusWithHooksPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(statusProp)

    useEffect(() => {
        setStatus(statusProp)
    }, [statusProp])

    const activateEditMode = () => setEditMode(true)
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)
    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatusTC(status)
    }

    return (
        <>
            {!editMode ?
                <div><span onDoubleClick={activateEditMode}>{statusProp || '----------'}</span></div>
                :
                <div><input value={status} onChange={onStatusChange}
                            onBlur={deactivateEditMode} autoFocus={true}/></div>}
        </>
    );
}
