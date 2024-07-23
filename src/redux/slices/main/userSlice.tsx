import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserType } from "@/utils/types";

const user: UserType | null = null;

interface StateType {
  user: UserType | null;
};

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
    },
    updateBalance: (state, action: PayloadAction<{ balance: number }>) => {
      if (state.user) {
        let currentBalance = state.user.balance;
        state.user = {
          ...state.user,
          prev_balance: Number(currentBalance),
          balance: Number(currentBalance) + Number(action.payload.balance),
        };
      }
    },
    balanceBackup: (state) => {
      if (state.user) {
        let prev = state.user.prev_balance;
        state.user = {
          ...state.user,
          prev_balance: state.user.balance,
          balance: prev
        }
      }     
    }
  },
});

export const { setUser, deleteUser, updateBalance, balanceBackup } = userSlice.actions;

export const useUser = () => useSelector((state: RootState) => state.user.user);

export const useBalance = () =>
  useSelector((state: RootState) => state.user.user?.balance);

export default userSlice.reducer;
