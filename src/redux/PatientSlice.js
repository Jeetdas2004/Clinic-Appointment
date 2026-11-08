import { createSlice } from '@reduxjs/toolkit';

const PatientSlice = createSlice({
  name: 'Patients',
  initialState: [],
  reducers: {
    addPatient(state, action) {
      state.push(action.payload);
    },
    setPatients(_state, action) {
      return Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const PatientsActions = PatientSlice.actions;
export default PatientSlice;
