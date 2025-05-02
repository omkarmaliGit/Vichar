import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
    refreshUser: false,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    getRefreshUser: (state) => {
      state.refreshUser = !state.refreshUser;
    },
    followingUpdate: (state, action) => {
      if (state.user.followings.includes(action.payload)) {
        state.user.followings = state.user.followings.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        state.user.followings.push(action.payload);
      }
    },
  },
});

export const {
  getUser,
  getOtherUsers,
  getMyProfile,
  getRefreshUser,
  followingUpdate,
} = userSlice.actions;
export default userSlice.reducer;
