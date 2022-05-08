import {createSlice} from "@reduxjs/toolkit";
import {getEventsAction} from "../actions/eventActions/getEventsAction";
import {createEventAction} from "../actions/eventActions/createEventsAction";
import {eventList} from "../states/eventState";
import {updateEventAction} from "../actions/eventActions/updateEventAction";
import {getEventByIdAction} from "../actions/eventActions/getEventsByIdAction";
import {deleteEventAction} from "../actions/eventActions/deleteEventAction";


export const getEvents = getEventsAction;
export const createEvent = createEventAction;
export const updateEvent = updateEventAction;
export const getEventById = getEventByIdAction;
export const deleteEvent = deleteEventAction;

const eventSlice = createSlice({
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
const {reducer} = eventSlice;
export default reducer;