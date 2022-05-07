import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const deleteEventAction = createAsyncThunk("events/delete", async (id) => {
    let response = await eventService.DeleteEvent(id);
    return response.data;
});