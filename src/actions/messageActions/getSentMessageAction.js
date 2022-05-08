import {createAsyncThunk} from "@reduxjs/toolkit";
import messageService from "../../services/message-service";

export const getSentMessageAction = createAsyncThunk("message/sended", async ({page,pageSize, userId}) => {
    let response = await messageService.getSentMessage(page,pageSize,userId);
    if (response.data) {
        return response.data;
    }
    return [];
});