import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {isLogin: false, userData: {}, addresses: []},
  reducers: {
    setUser(state, action) {
      state.isLogin = true;
      state.userData = action.payload;
    },
    logoutUser(state, action) {
      state.isLogin = false;
      state.userData = {};
    },
  },
});

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
