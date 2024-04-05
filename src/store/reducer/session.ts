import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = sessionSlice.actions;
export default sessionSlice.reducer;
