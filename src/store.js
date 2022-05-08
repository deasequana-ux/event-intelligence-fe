import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import eventReducer from "./slices/event-slice";
import messageReducer from "./slices/message-slice"
import userReducer from "./slices/user-slice"

const reducer = {
    auth: authReducer,
    events: eventReducer,
    messages: messageReducer,
    users: userReducer
};

const store = configureStore({
    reducer: reducer,
});

export default store;