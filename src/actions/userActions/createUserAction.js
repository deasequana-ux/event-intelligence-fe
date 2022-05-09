import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const createUserAction = createAsyncThunk("users/create", async (payload) => {
    let response = await userService.createUser(payload);
    if (response.data) {
        return {...response.data};
    }
    return [];
});