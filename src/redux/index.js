import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctorSlice";
import appointmentSlice from "./appointmentsSlice";
import navItemSlice from './navItemSlice'
import ClinicServiceSlice from './ClinicServiceSlice'
import PatientSlice from './PatientSlice'
const store=configureStore({
    reducer:{
       doctors:doctorSlice.reducer,
       appointment:appointmentSlice.reducer,
       navItem:navItemSlice.reducer,
       service:ClinicServiceSlice.reducer,
       patients:PatientSlice.reducer,
    }

})

export default store;