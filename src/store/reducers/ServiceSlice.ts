import { createSlice } from '@reduxjs/toolkit';

interface ServiceState {
  serverError: boolean;
}

const initialState: ServiceState = {
  serverError: false,
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    resetServiceSlice: () => initialState,
    setServerError: (state, action) => {
      state.serverError = action.payload;
    },
  },
});

export const { resetServiceSlice, setServerError } = serviceSlice.actions;

export default serviceSlice.reducer;
