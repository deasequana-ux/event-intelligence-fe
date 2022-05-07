import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import eventReducer from "./slices/event-slice";

const reducer = {
    auth: authReducer,
    events: eventReducer,
};

const store = configureStore({
    reducer: reducer,
});

export default store;