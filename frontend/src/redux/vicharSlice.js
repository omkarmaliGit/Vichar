import { createSlice } from "@reduxjs/toolkit";

const vicharSlice = createSlice({
  name: "vichar",
  initialState: {
    vichars: null,
    followingVichars: null,
    refreshVichar: false,
  },
  reducers: {
    getAllVichars: (state, action) => {
      state.vichars = action.payload;
    },
    getFollowingVichars: (state, action) => {
      // console.log("Dispatching to Redux:", action.payload);
      state.followingVichars = action.payload;
    },
    getRefreshVichar: (state) => {
      state.refreshVichar = !state.refreshVichar;
    },
  },
});

export const { getAllVichars, getFollowingVichars, getRefreshVichar } =
  vicharSlice.actions;
export default vicharSlice.reducer;
