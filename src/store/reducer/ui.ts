import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

