import {combineReducers, createStore} from "redux";
import {dialogsPageReducer} from "./dialogs-reducer";
import {profilePageReducer} from "./profile-reducer";

const rootReducer = combineReducers({
    dialogsPage: dialogsPageReducer,
    profilePage: profilePageReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store