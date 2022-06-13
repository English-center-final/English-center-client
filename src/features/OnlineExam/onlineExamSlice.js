import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookApi from 'api/bookApi';
import examApi from 'api/examApi';
import { answers } from 'constants/ToeicSheet';
import {
  writeResultToAnswerSheet,
  writeTranScript,
} from 'utils/writeResultToAnswerSheet';

const KEY = 'exam';

export const fetchBooks = createAsyncThunk('fetchBook', async () => {
  const data = await bookApi.fetchBooks();

  return data;
});

export const fetchExam = createAsyncThunk('fetchExam', async (params) => {
  const { slug } = params;
  const data = await examApi.fetchExamBySlug(slug);

  return data;
});

export const fetchResult = createAsyncThunk('fetchResult', async (params) => {
  const { slug, answers } = params;
  const data = await examApi.fetchResultBySlug(slug, answers);

  return data;
});

const examSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    setExam: [],
    examSelected: '',
    answers: answers,
    questions: {},
    examCheckin: '',
    scrollId: 'top',
    subPartSelected: 0,
    part3MaxPage: 0,
    part4MaxPage: 0,
    part6MaxPage: 0,
    part7MaxPage: 0,
    result: {},
    transcript: [],
    isSubmit: false,
  },
  reducers: {
    setExamSelected: (state, action) => {
      state.examSelected = action.payload;
    },

    setExamCheckin: (state, action) => {
      state.examCheckin = action.payload;
    },
    writeAnswerSheet: (state, action) => {
      const { question, selected } = action.payload;

      state.answers.map((answer) => {
        if (answer.stt === question) {
          answer.selected = selected;
          answer.status = 'selected';
        }
      });
    },

    setStatus: (state, action) => {
      state.answers[action.payload].status = 'yet';
    },
    setScrollId: (state, action) => {
      state.scrollId = action.payload;
    },
    setAnswerAfterRefresh: (state, action) => {
      state.answers = action.payload;
    },
    setsubPartSelected: (state, action) => {
      state.subPartSelected = action.payload;
    },

    writeResultToExam: (state, action) => {
      state.answers = action.payload;
    },
    setIsSubmit: (state, action) => {
      state.isSubmit = action.payload;
    },
    refreshStore: (state) => {
      state.isSubmit = false;
      state.answers = answers;
      state.examSelected = 1;
      state.scrollId = 'top';
      state.subPartSelected = 0;
      state.result = {};
      state.transcript = [];
      const token = localStorage.getItem('kltn-token');
      localStorage.clear();
      localStorage.setItem('kltn-token', token);
    },
    setTranScript: (state, action) => {
      state.transcript = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.setExam = action.payload;
      state.isLoading = false;
    },
    [fetchBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBooks.rejected]: () => {},

    [fetchExam.fulfilled]: (state, action) => {
      state.questions = action.payload;
      const { part3, part4, part6, part7 } = action.payload;
      state.part3MaxPage = part3.length - 1;
      state.part4MaxPage = part4.length - 1;
      state.part6MaxPage = part6.length - 1;
      state.part7MaxPage = part7.length - 1;
    },

    [fetchResult.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchResult.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchResult.fulfilled]: (state, action) => {
      state.result = action.payload;

      let newSheet, newTranscript;

      newSheet = writeResultToAnswerSheet(action.payload);
      newTranscript = writeTranScript(action.payload);

      state.answers = newSheet;
      state.transcript = newTranscript;

      localStorage.setItem('answers', JSON.stringify(newSheet));
      localStorage.setItem('transcript', JSON.stringify(newTranscript));

      state.isLoading = false;
    },
  },
});

const { reducer, actions } = examSlice;
export const {
  setExamSelected,
  setIsSubmit,
  setTranScript,
  refreshStore,
  writeResultToExam,
  setStatus,
  writeAnswerSheet,
  setsubPartSelected,
  setMaxPartSelected,
  setScrollId,
  setExamCheckin,
  setAnswerAfterRefresh,
} = actions;
export default reducer;
