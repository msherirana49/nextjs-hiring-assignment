import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  global: boolean;
  sections: Record<string, boolean>;
}

const initialState: LoadingState = {
  global: false,
  sections: {}
};

const uiLoadingSlice = createSlice({
  name: "uiLoading",
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.global = action.payload;
    },
    setSectionLoading(state, action: PayloadAction<{ key: string; value: boolean }>) {
      state.sections[action.payload.key] = action.payload.value;
    },
    clearLoading(state) {
      state.global = false;
      state.sections = {};
    }
  }
});

export const { clearLoading, setGlobalLoading, setSectionLoading } = uiLoadingSlice.actions;
export default uiLoadingSlice.reducer;
