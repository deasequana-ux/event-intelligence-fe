import {createSlice} from "@reduxjs/toolkit";
import {getRolesAction} from "../actions/roleActions/getRoleAction";
import {roleList} from "../states/roleList";

export const getRoles = getRolesAction;

const roleSlice = createSlice({
    name: "roles",
    initialState: roleList,
    extraReducers: {
        [getRoles.fulfilled]: (state, action) => {
            return {...action.payload};
        },
    },
});
const {reducer} = roleSlice;
export default reducer;