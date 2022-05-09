import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getCommentsByEventIdAction = createAsyncThunk("events/comments",
    async ({page, pageSize, id}) => {
    let response = await eventService.getCommentsByEventId(page, pageSize, id);
    if (response.data) {
        return response.data;
    }
});