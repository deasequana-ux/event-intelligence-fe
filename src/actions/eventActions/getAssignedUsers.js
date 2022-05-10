import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getAssignedUsersAction = createAsyncThunk("events/assigned/user", async (id) => {
    let response = await eventService.getAssignedUsers(id);
    if (response.data) {
        return response.data;
    }
    return [];
});