import { createReducer } from "@reduxjs/toolkit"
import { delUser, setUser } from "./userAction";

const INITIAL_STATE = {
    user: undefined,
}

export default createReducer(INITIAL_STATE, {
    [setUser.type]: (state, action) => {
        return {
            ...state,
            user: action.payload.user
        };
    },
    [delUser.type] : (state, action) => {
        return {
            ...state,
            user: undefined
        }
    }
});