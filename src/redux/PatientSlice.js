import { createSlice } from "@reduxjs/toolkit";


const PatientSlice=createSlice({
    name:'Patients',
    initialState:[],
    reducers:{
          addPatient(state,action){
                  state.push(action)
          }
    }
})

export const PatientsActions=PatientSlice.actions;
export default PatientSlice;