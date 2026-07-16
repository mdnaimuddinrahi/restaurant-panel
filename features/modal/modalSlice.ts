import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: string | null;
  payload: any;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  payload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        type: string;
        payload?: any;
      }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.payload = action.payload.payload ?? null;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.payload = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;