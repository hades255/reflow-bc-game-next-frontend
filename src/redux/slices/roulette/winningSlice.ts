import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface WinningType {
  index: number;
  color: string;
}

const winning: WinningType = {
  index: 0,
  color: "red",
};

const initialState = {
  winning,
};

export const winningSlice = createSlice({
  name: "winning",
  initialState,
  reducers: {
    setWinning: (
      state,
      action: PayloadAction<{ index: number; color: string }>
    ) => {
      state.winning.index =
        state.winning.index - state.winning.index + action.payload.index;
      state.winning.color = state.winning.color.replace(state.winning.color, action.payload.color);
    },
    setIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.winning.index =
        state.winning.index - state.winning.index + action.payload.index;
    },
    setColor: (state, action: PayloadAction<{ color: string }>) => {
      state.winning.color = state.winning.color.replace(state.winning.color, action.payload.color);
    },
  },
});

export const { setWinning, setIndex, setColor } = winningSlice.actions;

export const useWinning = () =>
  useSelector((state: RootState) => state.winning.winning);

export default winningSlice.reducer;
