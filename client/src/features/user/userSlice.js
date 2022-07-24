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
  },
});

export const { setName, setSurname, setEmail, setDob, login, logout } =
  userSlice.actions;

export default userSlice.reducer;
