import {getUsersAction} from "../actions/userActions/getUsersAction";
import {createSlice} from "@reduxjs/toolkit";
import {userList} from "../states/userList";
import {createUserAction} from "../actions/userActions/createUserAction";
import {deleteUserAction} from "../actions/userActions/deleteUserAction";
import {updateUserAction} from "../actions/userActions/updateUserAction";

export const getUsers = getUsersAction;
export const createUser = createUserAction;
export const deleteUser = deleteUserAction;
export const updateUser = updateUserAction;

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        /*[createUser.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [deleteUser.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [updateUser.fulfilled]: (state, action) => {
            return {...action.payload};
        },*/
    },
});
const {reducer} = userSlice;
export default reducer;