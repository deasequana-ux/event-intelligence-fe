import {getUsersAction} from "../actions/userActions/getUsersAction";
import {createSlice} from "@reduxjs/toolkit";
import {userList} from "../states/userList";

export const getUsers = getUsersAction;

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            return {...action.payload};
        },
    },
});
const {reducer} = userSlice;
export default reducer;