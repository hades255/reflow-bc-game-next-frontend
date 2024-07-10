import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserType } from "@/utils/types";

const user: UserType | null = null;

interface StateType {
  user: UserType | null
}

const initialState: StateType = {
  user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    updateBalance: (state, action: PayloadAction<{ balance: number }>) => {
      state.user = state.user && ({
        ...state.user,
        prev_balance: Number(state.user.balance),
        balance: Number(state.user.balance) + action.payload.balance
      })
    }
  },
});

export const { setUser, deleteUser, updateBalance } = userSlice.actions;

export const useUser = () => useSelector((state: RootState) => state.user.user);

export const useBalance = () => useSelector((state: RootState) => state.user.user?.balance);

export default userSlice.reducer;
