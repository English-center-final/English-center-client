import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { classesApi } from 'api';
import commonFuc from 'utils/commonFuc';

const KEY = 'me';

export const fetchSchedules = createAsyncThunk(
  `${KEY}/fetchSchedules`,
  async (params) => {
    const data = await classesApi.fetchSchedules(params);
    return data;
  }
);

const scheduleSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    schedules: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // fetchSchedules
    [fetchSchedules.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSchedules.fulfilled]: (state, action) => {
      const temp = action.payload?.data || [];
      state.schedules = temp.map((ele) => commonFuc.handleData(ele));
      state.isLoading = false;
    },
    [fetchSchedules.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = scheduleSlice;
export const { setLoading } = actions;
export default reducer;
