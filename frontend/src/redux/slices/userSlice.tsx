import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserSlice } from "./interface/ISlice"; 

const initialState: UserSlice = {
  userId: null,
  name: null,
  email: null,
  role: null,
  isBlocked: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        _id: string;
        username: string;
        email: string;
        role: string;
        isBlocked: boolean | string;
      }>
    ) => {
      const { _id, username, email, role, isBlocked} =
        action.payload;

      state.userId = _id;
      state.name = username;
      state.email = email;
      state.role = role;
      state.isBlocked = String(isBlocked);

      localStorage.setItem("user", JSON.stringify(state));
    },

    clearUserDetails: (state) => {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.isBlocked = null;

      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
