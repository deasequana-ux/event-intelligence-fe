import {createSlice} from "@reduxjs/toolkit";
import {loginAction} from "../actions/authActions/loginAction";
import {authState} from "../states/authState";
import {logOutAction} from "../actions/authActions/logoutAction";

export const login = loginAction;
export const logout = logOutAction;

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [logout.fulfilled]: (state, action) => {
            return {...action.payload};
        },
    },
});

const {reducer} = authSlice;
export default reducer;