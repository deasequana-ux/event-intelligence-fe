import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const createEventAction = createAsyncThunk("events/create", async (data) => {
    let response = await eventService.createEvent(data);
    return response.data;
});