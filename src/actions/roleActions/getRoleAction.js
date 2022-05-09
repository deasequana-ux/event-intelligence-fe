import {createAsyncThunk} from "@reduxjs/toolkit";
import roleService from "../../services/role-service";

export const getRolesAction = createAsyncThunk("roles/getAll", async ({page,pageSize}) => {
    let response = await roleService.getRoles(page, pageSize);
    if (response.data) {
        return response.data;
    }
    return [];
});