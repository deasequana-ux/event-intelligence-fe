import {createAsyncThunk} from "@reduxjs/toolkit";
import eventService from "../../services/event-service";

export const getCandidateUsersToAssignsAction = createAsyncThunk("events/candidate/user", async (id) => {
    let response = await eventService.getCandidateUsersToAssign(id);
    if (response.data) {
        return response.data;
    }
    return [];
});