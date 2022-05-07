import {createAsyncThunk} from "@reduxjs/toolkit";

export const logOutAction = createAsyncThunk("auth/logout", () => {
    localStorage.removeItem("token");
    return {
        isAuth: false,
        name: "",
        roleInfo: "",
        userId: "",
    };
});