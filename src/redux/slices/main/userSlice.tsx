import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserType } from "@/utils/types";

const user: UserType | null = null;

export interface UserStateType {
  user: UserType | null
}

const initialState: UserStateType = {
  user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    }
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export const useUser = () => useSelector((state: RootState) => state.user.user);

export default userSlice.reducer;
