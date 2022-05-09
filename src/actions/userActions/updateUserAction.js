import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const updateUserAction = createAsyncThunk("users/update", async (payload) => {
    let response = await userService.updateUser(payload);
    if (response.data) {
        return {...response.data};
    }
    return [];
});