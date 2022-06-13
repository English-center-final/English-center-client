import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { meApi } from 'api';

const KEY = 'me';

export const fetchClassOfUser = createAsyncThunk(
  `${KEY}/fetchClassOfUser`,
  async () => {
    const data = await meApi.fetchClassOfUser();
    return data;
  }
);
export const fetchUserExam = createAsyncThunk(
  `${KEY}/fetchUserExam`,
  async (params) => {
    const data = await meApi.fetchUserExam(params);
    return data;
  }
);

const meSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    classRegister: [],
    userExamPage: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // fetchClassOfUser
    [fetchClassOfUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchClassOfUser.fulfilled]: (state, action) => {
      state.classRegister = action.payload;
      state.isLoading = false;
    },
    [fetchClassOfUser.rejected]: (state) => {
      state.isLoading = false;
    },

    // fetchUserExam
    [fetchUserExam.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserExam.fulfilled]: (state, action) => {
      state.userExamPage = action.payload;
      state.isLoading = false;
    },
    [fetchUserExam.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = meSlice;
export const { setLoading } = actions;
export default reducer;
