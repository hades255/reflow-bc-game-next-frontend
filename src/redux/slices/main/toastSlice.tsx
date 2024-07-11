import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ToastType {
  status: boolean;
  type: number;
  message: string;
}

const toast: ToastType = {
  status: false,
  type: 1,
  message: ""
}

const initialState = {
  toast
}

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action:PayloadAction<{type: number, message: string}>) => {
      state.toast.status = true;
      state.toast.type = action.payload.type;
      state.toast.message = action.payload.message;
    },
    closeToast: (state) => {
      state.toast.status = false;
    }
  }
});

export const { setToast, closeToast } = toastSlice.actions;

export const useToast = () => useSelector((state: RootState) => state.toast.toast);

export default toastSlice.reducer;