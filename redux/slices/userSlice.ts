import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "@/services/userService";
import type { UserProfile, UserState } from "@/types/user";
import { logoutSucceeded } from "./authSlice";

const initialState: UserState = {
  profile: null,
  status: "idle",
  error: null
};

export const fetchProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getProfile();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to fetch profile.";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profile = null;
        state.status = "failed";
        state.error = action.payload ?? "Unable to fetch profile.";
      })
      .addCase(logoutSucceeded, (state) => {
        state.profile = null;
        state.status = "idle";
        state.error = null;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
