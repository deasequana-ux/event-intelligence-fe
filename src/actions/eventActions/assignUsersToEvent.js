import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const assignUsersToEventAction = createAsyncThunk("events/assign/user", async (payload) => {
    let response = await eventService.assignUsersToEvent(payload)

    return response.data;
});