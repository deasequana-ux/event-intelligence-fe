import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import eventReducer from "./slices/event-slice";
import messageReducer from "./slices/message-slice"

const reducer = {
    auth: authReducer,
    events: eventReducer,
    messages: messageReducer
};

const store = configureStore({
    reducer: reducer,
});

export default store;