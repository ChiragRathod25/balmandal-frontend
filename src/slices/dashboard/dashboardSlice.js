import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editableUser: null,
  editableUserAchievement: null,
  editableUserParent: null,
  editableUserTalent: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setEditableUser: (state, action) => {
      state.editableUser = action.payload;
    },
    setEditableUserAchievement: (state, action) => {
      state.editableUserAchievement = action.payload;
    },
    setEditableUserParent: (state, action) => {
      state.editableUserParent = action.payload;
    },
    setEditableUserTalent: (state, action) => {
      state.editableUserTalent = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setEditableUser,
  setEditableUserAchievement,
  setEditableUserParent,
  setEditableUserTalent,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
