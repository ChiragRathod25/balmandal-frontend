import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../slices/userSlice/authSlice.js';
import dashboardReducers from '../slices/dashboard/dashboardSlice.js';


const store = configureStore({
  reducer: {
    auth: authReducers,
    dashboard: dashboardReducers,
   
  },
});

export default store;
