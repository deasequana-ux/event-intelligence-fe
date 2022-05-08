import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getEventsAction = createAsyncThunk("events/getAll", async ({page,pageSize}) => {
    let response = await eventService.getEvents(page,pageSize);
    if (response.data) {
        return {...response.data};
    }
    return [];
});