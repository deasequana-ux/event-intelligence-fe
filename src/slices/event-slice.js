import {createSlice} from "@reduxjs/toolkit";
import {getEventsAction} from "../actions/eventAction/getEventsAction";
import {createEventAction} from "../actions/eventAction/createEventsAction";
import {eventList} from "../states/eventState";
import {updateEventAction} from "../actions/eventAction/updateEventAction";
import {getEventByIdAction} from "../actions/eventAction/getEventsByIdAction";
import {deleteEventAction} from "../actions/eventAction/deleteEventAction";


export const getEvents = getEventsAction;
export const createEvent = createEventAction;
export const updateEvent = updateEventAction;
export const getEventById = getEventByIdAction;
export const deleteEvent = deleteEventAction;

const courseSlice = createSlice({
    name: "events",
    initialState: eventList,
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        /*[updateEvent.fulfilled]: (state, action) => {
            const index = state.findIndex(course => course.id === action.payload.id);
            state.items[index] = {
                ...state.items[index],
                ...action.payload,
            };
            return state;
        },*/
        [getEventById.fulfilled]: (state, action) => {
            return action.payload;
        }
        /*[createEvent.fulfilled]: (state, action) => {
            return [...state.items, action.payload];
        },*/
    },
});
const {reducer} = courseSlice;
export default reducer;