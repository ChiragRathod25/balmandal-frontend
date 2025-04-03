import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slices/userSlice/authSlice";
import dashboardReducers from "../slices/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducers,
    dashboard: dashboardReducers,
  },
});

export default store;
