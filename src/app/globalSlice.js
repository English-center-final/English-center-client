import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { meApi } from 'api';
import { message } from 'antd';

const KEY = 'global';

export const fetchUserProfile = createAsyncThunk(
  `${KEY}/fetchUserProfile`,
  async () => {
    const user = await meApi.fetchProfile();
    return user;
  }
);
export const fetchBranches = createAsyncThunk(
  `${KEY}/fetchBranches`,
  async () => {
    const data = await meApi.fetchBranches();
    return data;
  }
);

const globalSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isLogin: false,
    user: null,
    branches: [],
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: {
    // fetchUserProfile
    [fetchUserProfile.pending]: (state) => {
      state.isLoading = false;
    },

    [fetchUserProfile.fulfilled]: (state, action) => {
      state.isLoading = true;

      if (action?.payload.actived === false) {
        state.isLogin = false;
        message.error('Tài khoản chưa được kích hoạt');
        localStorage.removeItem('kltn-token');
      } else {
        state.user = action.payload;
        state.isLogin = true;
      }
    },

    [fetchUserProfile.rejected]: (state) => {
      state.isLoading = true;
      state.isLogin = false;
    },
    // fetchBranches
    [fetchBranches.pending]: (state) => {
      state.isLoading = false;
    },

    [fetchBranches.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.branches = action.payload;
    },

    [fetchBranches.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

const { reducer, actions } = globalSlice;
export const { setLoading, setLogin } = actions;
export default reducer;
