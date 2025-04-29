import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
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
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    followingUpdate: (state, action) => {
      if (state.user.followings.includes(action.payload)) {
        state.user.followings = state.user.followings.filter((itemId) => {
          return itemId == action.payload;
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
  getRefresh,
  followingUpdate,
} = userSlice.actions;
export default userSlice.reducer;
