import { createSlice } from "@reduxjs/toolkit";


 const ClinicServiceSlice=createSlice({
    name:'clinicService',
    initialState:{services:[],currentService:1},
    reducers:{
        setServices(state,action){
             state.services=action.payload    
        },
        updateService(state,action){
               state.currentService=action.payload
                    }
    }
})
export const ServiceActions=ClinicServiceSlice.actions;
export default ClinicServiceSlice
