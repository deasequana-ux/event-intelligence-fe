import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const updateEventAction = createAsyncThunk("events/update", async (data) => {
    let response = await eventService.UpdateEvent(data);
    return response.data;
});