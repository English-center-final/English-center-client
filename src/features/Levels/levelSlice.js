import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { levelApi } from 'api';

const KEY = 'level';

export const fetchLevels = createAsyncThunk(`${KEY}/fetchLevels`, async () => {
  const data = await levelApi.fetchLevels();
  return data;
});

export const fetchLevelBySlug = createAsyncThunk(
  `${KEY}/fetchLevelBySlug`,
  async (params) => {
    const data = await levelApi.fetchLevelBySlug(params);
    return data;
  }
);

const levelSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    listLevels: [],
    level: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // fetchLevelBySlug
    [fetchLevels.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLevels.fulfilled]: (state, action) => {
      state.listLevels = action.payload;
    },
    [fetchLevels.rejected]: (state) => {
      state.isLoading = false;
    },

    // fetchLevelBySlug
    [fetchLevelBySlug.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLevelBySlug.fulfilled]: (state, action) => {
      state.level = action.payload;
      state.isLoading = false;
    },
    [fetchLevelBySlug.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = levelSlice;
export const { setLoading } = actions;
export default reducer;
