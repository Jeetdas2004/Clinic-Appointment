import {createSlice,configureStore} from '@reduxjs/toolkit'
import { getDoctors } from '@/app/DataFunction/Dctors';


  const doctorSlice=createSlice({
    name:'doctors',
    initialState:[],
    reducers:{
        setDoctors(state,action){
            return action.payload
        },
        incrementPatients(state,action){
            const doctor=state.find(doctore=>doctore.id==action.payload)
            doctor.patientNumber-=1;
        },
        decrementPatients(state,action){
            const doctor=state.find(doctore=>doctore.id==action.payload)
            doctor.patientNumber+=1;
        }
    }

})

export const doctorAcrtions=doctorSlice.actions
export default doctorSlice;


