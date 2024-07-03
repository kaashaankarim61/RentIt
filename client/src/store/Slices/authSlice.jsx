import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id:null,
  username: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.id= action.payload.id;
      state.isAuthenticated = true;

      console.log("Setted", action.payload)
    },
    logout: (state) => {
      state.username = null;
      state.id = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;