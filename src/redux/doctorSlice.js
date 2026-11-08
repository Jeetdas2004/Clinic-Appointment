import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: [],
  reducers: {
    setDoctors(_state, action) {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    incrementPatients(state, action) {
      const doctor = state.find((d) => d._id === action.payload || d.id === action.payload);
      if (doctor) {
        doctor.patientNumber = (doctor.patientNumber || 0) + 1;
      }
    },
    decrementPatients(state, action) {
      const doctor = state.find((d) => d._id === action.payload || d.id === action.payload);
      if (doctor && doctor.patientNumber > 0) {
        doctor.patientNumber -= 1;
      }
    },
  },
});

export const doctorAcrtions = doctorSlice.actions;
export const doctorActions = doctorSlice.actions;
export default doctorSlice;
