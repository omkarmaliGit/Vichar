import { createSlice } from "@reduxjs/toolkit";

const vicharSlice = createSlice({
  name: "vichar",
  initialState: {
    vichars: null,
    followingVichars: null,
    refresh: false,
  },
  reducers: {
    getAllVichars: (state, action) => {
      state.vichars = action.payload;
    },
    getFollowingVichars: (state, action) => {
      console.log("Dispatching to Redux:", action.payload);
      state.followingVichars = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { getAllVichars, getFollowingVichars, getRefresh } =
  vicharSlice.actions;
export default vicharSlice.reducer;
