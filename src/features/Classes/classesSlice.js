import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { classesApi } from 'api';

const KEY = 'classes';

export const fetchClasses = createAsyncThunk(
  `${KEY}/fetchClasses`,
  async (params) => {
    const data = await classesApi.fetchClasses(params);
    return data;
  }
);

export const fetchSchedules = createAsyncThunk(
  `${KEY}/fetchSchedules`,
  async (params) => {
    const data = await classesApi.fetchSchedules(params);
    return data;
  }
);

const classesSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    classesPage: {},
    schedulesPage: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // fetchClasses
    [fetchClasses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchClasses.fulfilled]: (state, action) => {
      state.classesPage = action.payload;
      state.isLoading = false;
    },
    [fetchClasses.rejected]: (state) => {
      state.isLoading = false;
    },

    // fetchSchedules
    [fetchSchedules.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSchedules.fulfilled]: (state, action) => {
      state.schedulesPage = action.payload;
      state.isLoading = false;
    },
    [fetchSchedules.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = classesSlice;
export const { setLoading } = actions;
export default reducer;
