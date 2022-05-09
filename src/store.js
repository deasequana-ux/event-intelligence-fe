import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import eventReducer from "./slices/event-slice";
import messageReducer from "./slices/message-slice"
import userReducer from "./slices/user-slice"
import roleReducer from "./slices/role-slice"

const reducer = {
    auth: authReducer,
    events: eventReducer,
    messages: messageReducer,
    users: userReducer,
    roles: roleReducer
};

const store = configureStore({
    reducer: reducer,
});

export default store;