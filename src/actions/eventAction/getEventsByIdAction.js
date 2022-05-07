import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getEventByIdAction = createAsyncThunk("events/getById", async (id) => {
    let response = await eventService.GetEventById(id);
    if (response.data) {
        return response.data;
    }
    return [];
});