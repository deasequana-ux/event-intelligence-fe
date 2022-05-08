import {getReceivedMessageAction} from "../actions/messageActions/getReceivedMessageAction";
import {createSlice} from "@reduxjs/toolkit";
import {messageList} from "../states/messageList";
import {getSentMessageAction} from "../actions/messageActions/getSentMessageAction";
import {sendMessageAction} from "../actions/messageActions/sendMessageAction";

export const getReceivedMessages = getReceivedMessageAction;
export const getSentMessages = getSentMessageAction;
export const sendMessage = sendMessageAction;

const messageSlice = createSlice({
    name: "events",
    initialState: messageList,
    extraReducers: {
        [getReceivedMessages.fulfilled]: (state, action) => {
            return action.payload;
        },
        [getSentMessages.fulfilled]: (state, action) => {
            return action.payload;
        },
        [sendMessage.fulfilled]: (state, action) => {
            return action.payload;
        },
    },
});

const {reducer} = messageSlice;
export default reducer;