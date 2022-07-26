import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      name: '',
      surname: '',
      email: '',
      dob: '',
      loggedIn: false,
      friendsOpen: false,
    },
  },
  reducers: {
    setName: (state, data) => {
      state.value.name = data;
    },
    setSurname: (state, data) => {
      state.value.surname = data;
    },
    setEmail: (state, data) => {
      state.value.email = data;
    },
    setDob: (state, data) => {
      state.value.dob = data;
    },
    login: (state) => {
      state.value.loggedIn = true;
    },
    logout: (state) => {
      state.value.loggedIn = false;
    },
    friendsOpen: (state, data) => {
      state.value.friendsOpen = data;
    },
  },
});

export const {
  setName,
  setSurname,
  setEmail,
  setDob,
  login,
  logout,
  friendsOpen,
} = userSlice.actions;

export default userSlice.reducer;
