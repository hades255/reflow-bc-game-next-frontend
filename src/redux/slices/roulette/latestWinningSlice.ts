import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface LatestWinningType {
  hundred: number[];
  ten: string[];
  cacheHundred: number[];
  cacheTen: string[];
}

const latestWinning: LatestWinningType = {
  hundred: [50, 0, 50],
  ten: new Array(10).fill("black"),
  cacheHundred: [50, 0, 50],
  cacheTen: new Array(10).fill("black"),
};

const initialState = {
  latestWinning,
};

export const latestWinningSlice = createSlice({
  name: "latestWinning",
  initialState,
  reducers: {
    setLatestWinning: (
      state,
      action: PayloadAction<{ hundred: number[]; ten: string[] }>
    ) => {
      state.latestWinning.hundred = state.latestWinning.hundred.map(
        (hundred, id) => action.payload.hundred[id]
      );
      state.latestWinning.ten = state.latestWinning.ten.map(
        (ten, id) => action.payload.ten[id]
      );
    },
    setCache: (
      state,
      action: PayloadAction<{ cacheHundred: number[]; cacheTen: string[] }>
    ) => {
      state.latestWinning.cacheHundred = state.latestWinning.cacheHundred.map(
        (hundred, id) => action.payload.cacheHundred[id]
      );
      state.latestWinning.cacheTen = state.latestWinning.cacheTen.map(
        (ten, id) => action.payload.cacheTen[id]
      );
    },
    exchangeLatest: (state) => {
      state.latestWinning.hundred = state.latestWinning.hundred.map(
        (h, id) => state.latestWinning.cacheHundred[id]
      );
      state.latestWinning.ten = state.latestWinning.ten.map(
        (t, id) => state.latestWinning.cacheTen[id]
      );
    },
  },
});

export const { setLatestWinning, setCache, exchangeLatest } =
  latestWinningSlice.actions;

export const useLatestWinning = () =>
  useSelector((state: RootState) => state.latestWinning.latestWinning);

export default latestWinningSlice;
