import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: [],
  reducers: {
    setAppointments(_state, action) {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    addAppointment(state, action) {
      state.unshift(action.payload);
    },
    updateAppointmentStatus(state, action) {
      const { id, status } = action.payload;
      const target = state.find((app) => app._id === id || app.id === id);
      if (target) {
        target.status = status;
      }
    },
    finishAppointment(state, action) {
      const target = state.find((app) => app._id === action.payload || app.id === action.payload);
      if (target) {
        target.status = 'Completed';
      }
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice;
