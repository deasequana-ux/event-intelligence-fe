import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const getUsersAction = createAsyncThunk("users/getAll", async ({page,pageSize}) => {
    let response = await userService.getUsers(page,pageSize);
    if (response.data) {
        return {...response.data};
    }
    return [];
});