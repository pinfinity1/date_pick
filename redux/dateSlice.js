import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: [],
  reducers: {
    choose: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      index === -1 && state.push({ ...action.payload });
    },
    doneDate: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].status = "done";
    },
  },
});

export const { choose, doneDate } = dateSlice.actions;
export default dateSlice.reducer;
