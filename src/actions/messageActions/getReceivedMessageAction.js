import {createAsyncThunk} from "@reduxjs/toolkit";
import messageService from "../../services/message-service";

export const getReceivedMessageAction = createAsyncThunk("message/received", async ({page,pageSize, userId}) => {
    let response = await messageService.getReceivedMessage(page,pageSize,userId);
    if (response.data) {
        return response.data;
    }
    return [];
});