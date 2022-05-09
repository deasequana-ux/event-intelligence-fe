import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getAssignedUsersAction = createAsyncThunk("events/candidate/user", async (id) => {
    let response = await eventService.getAssignedUsers(id);
    if (response.data) {
        return response.data;
    }
    return [];
});