import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AuthType {
  token: string;
}

const auth: AuthType = {
  token: ""
};

const initialState = {
  auth,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<string>) => {
      state.auth.token = action.payload;
    },
    signout: (state) => {
      state.auth.token = "";
    },
  },
});

export const { signin, signout } = authSlice.actions;

export const useToken = () => useSelector((state: RootState) => state.auth.auth.token);

export default authSlice.reducer;
