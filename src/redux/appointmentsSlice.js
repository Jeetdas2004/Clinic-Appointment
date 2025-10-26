import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice=createSlice({
    name:'appointment',
    initialState:[],
    reducers:{
        addAppointment(state,action){

        },
        finishAppointment(state,action){

        }
    }
})

export const appointmentActions=appointmentSlice.actions;
export default appointmentSlice;