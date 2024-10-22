import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type BalanceType = {
  prev_balance: number;
  balance: number;
}

const balance: BalanceType = {
  prev_balance: 0,
  balance: 0
}

const initialState = {
  balance
}

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<{ balance: number, prev?: number}>) => {
      state.balance = {
        ...state.balance,
        prev_balance: action.payload.prev? Number(action.payload.prev) : 0,
        balance: Number(action.payload.balance)
      }
    },
    updateBalance: (state, action: PayloadAction<{ balance: number }>) => {
        let currentBalance = state.balance.balance
        state.balance = {
          ...state.balance,
          prev_balance: Number(currentBalance),
          balance: Number(currentBalance) + Number(action.payload.balance),
      }
    },
    balanceBackup: (state) => {
        let prevBalance = state.balance.prev_balance;
        state.balance = {
          ...state.balance,
          prev_balance: state.balance.balance,
          balance: prevBalance
        }   
    }
  }
});

export const { setBalance, updateBalance, balanceBackup } = balanceSlice.actions;

export const useBalance = () => useSelector((state: RootState) => state.balance.balance);

export default balanceSlice.reducer;