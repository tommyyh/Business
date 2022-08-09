import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      name: '',
      surname: '',
      username: '',
      email: '',
      dob: '',
      profilePic: '',
      loggedIn: false,
      friendsOpen: false,
      nodesOpen: false,
    },
  },
  reducers: {
    setName: (state, data) => {
      state.value.name = data;
    },
    setSurname: (state, data) => {
      state.value.surname = data;
    },
    setUsername: (state, data) => {
      state.value.username = data;
    },
    setEmail: (state, data) => {
      state.value.email = data;
    },
    setDob: (state, data) => {
      state.value.dob = data;
    },
    setProfilePic: (state, data) => {
      state.value.profilePic = data;
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
    nodesOpen: (state, data) => {
      state.value.nodesOpen = data;
    },
  },
});

export const {
  setName,
  setSurname,
  setUsername,
  setEmail,
  setDob,
  login,
  logout,
  friendsOpen,
  setProfilePic,
  nodesOpen,
} = userSlice.actions;

export default userSlice.reducer;
