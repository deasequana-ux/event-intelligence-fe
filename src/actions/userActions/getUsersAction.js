import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const getUsersAction = createAsyncThunk("events/getAll", async ({page,pageSize}) => {
    let response = await userService.getUsers(page,pageSize);
    if (response.data) {
        return {...response.data};
    }
    return [];
});