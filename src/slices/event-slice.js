import {createSlice} from "@reduxjs/toolkit";
import {getEventsAction} from "../actions/eventActions/getEventsAction";
import {createEventAction} from "../actions/eventActions/createEventsAction";
import {eventList} from "../states/eventState";
import {updateEventAction} from "../actions/eventActions/updateEventAction";
import {getEventByIdAction} from "../actions/eventActions/getEventsByIdAction";
import {deleteEventAction} from "../actions/eventActions/deleteEventAction";
import {assignUsersToEventAction} from "../actions/eventActions/assignUsersToEvent";
import {getCandidateUsersToAssignsAction} from "../actions/eventActions/getCandidateUsersToAssignAction";
import {getAssignedUsersAction} from "../actions/eventActions/getAssignedUsers";
import {getCommentsByEventIdAction} from "../actions/eventActions/getCommentsByEventIdAction";
import {commentToEventIdAction} from "../actions/eventActions/commentToEventAction";


export const getEvents = getEventsAction;
export const createEvent = createEventAction;
export const updateEvent = updateEventAction;
export const getEventById = getEventByIdAction;
export const deleteEvent = deleteEventAction;
export const getCandidateUsersToAssign = getCandidateUsersToAssignsAction;
export const assignUsersAction = assignUsersToEventAction;
export const getAssignedUsers = getAssignedUsersAction;
export const getCommentsByEventId = getCommentsByEventIdAction;
export const commentToEvent = commentToEventIdAction;

const eventSlice = createSlice({
    name: "events",
    initialState: eventList,
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            return {...action.payload};
        }
    },
});
const {reducer} = eventSlice;
export default reducer;