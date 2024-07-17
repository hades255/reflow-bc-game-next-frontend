import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface PageType {
  page: string;
}

const page: PageType = {
  page: "/roulette"
};

const initialState = {
  page,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<string>) => {
      state.page.page = action.payload;
    }
  }
});

export const { changePage } = pageSlice.actions;

export const usePage = () => useSelector((state: RootState) => state.page.page.page);

export default pageSlice.reducer;