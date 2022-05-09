import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const commentToEventIdAction = createAsyncThunk("events/comments/upsert",
    async (payload) => {
        let response = await eventService.commentToEvent(payload);
        if (response.data) {
            return response.data;
        }
    });