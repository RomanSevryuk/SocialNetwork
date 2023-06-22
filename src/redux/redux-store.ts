import {combineReducers, createStore} from "redux";
import {dialogsPageReducer} from "./dialogs-reducer";
import {profilePageReducer} from "./profile-reducer";
import {usersPageReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store