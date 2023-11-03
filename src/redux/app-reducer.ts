import {getAuthUserDataTC} from "./auth-reducer";
import {AppThunkDispatch} from "./redux-store";

const initialState = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {...state, initialized: true}
        default:
            return state
    }
}

//actions
export const setInitializedAppAC = () => ({
    type: 'SET-INITIALIZED',
} as const)

//thunks
export const setInitializedAppTC = () => (dispatch: AppThunkDispatch) => {
    dispatch(getAuthUserDataTC())
        .then(() => {
            dispatch(setInitializedAppAC())
        })
}

//types
type InitialStateType = typeof initialState

type ActionsTypes =
    | ReturnType<typeof setInitializedAppAC>


