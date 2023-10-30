import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dialogsPageReducer} from "./dialogs-reducer";
import {profilePageReducer} from "./profile-reducer";
import {usersPageReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>


//@ts-ignore
window.store = store