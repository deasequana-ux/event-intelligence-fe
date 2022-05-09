import {createAsyncThunk} from "@reduxjs/toolkit";
import messageService from "../../services/message-service";

export const sendMessageAction = createAsyncThunk("message/send", async (payload) => {
    let response = await messageService.sendMessage(payload);
    if (response.data) {
        return response.data;
    }
    return [];
});