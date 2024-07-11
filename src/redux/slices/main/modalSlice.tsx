import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ModalType {
  status: boolean;
  title: string;
  content: string;
  name: string;
  type: number;
  parameter: any;
}

const modal: ModalType = {
  status: false,
  title: "",
  content: "",
  name: "",
  type: 1,
  parameter: ""
};

const initialState = {
  modal,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        status: boolean;
        title: string;
        content: string;
        name: string;
        type: number;
        parameter: any;
      }>
    ) => {
      state.modal = {
        ...state.modal,
        status: action.payload.status,
        title: action.payload.title,
        content: action.payload.content,
        name: action.payload.name,
        type: action.payload.type,
        parameter: action.payload.parameter
      };
    },
    closeModal: (state) => {
      state.modal.status = !state.modal.status;
    },
  },
});

export const {setModal, closeModal} = modalSlice.actions;

export const useModal = () => useSelector((state: RootState) => state.modal.modal);

export default modalSlice.reducer;
