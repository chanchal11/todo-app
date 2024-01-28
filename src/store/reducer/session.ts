import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface User {
//     username: string;
//     email: string;
//     password: string;
//     _id: string;
// }

// export interface SessionState {
//   user: User | null;
// }

// const initialState: SessionState = {
//   user: null,
// };

// const userSession = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setUser } = userSession.actions;
// export default userSession.reducer;

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
