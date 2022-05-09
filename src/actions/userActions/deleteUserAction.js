import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const deleteUserAction = createAsyncThunk("users/delete", async (id) => {
    let response = await userService.deleteUser(id);
    if (response.data) {
        return {...response.data};
    }
    return [];
});