import { configureStore } from '@reduxjs/toolkit';
import course from 'features/Courses/courseSlice';
import home from 'features/Home/homeSlice';
import login from 'features/Login/loginSlice';
import me from 'features/Me/meSlice';
import exam from 'features/OnlineExam/onlineExamSlice';
import perPart from 'features/PerPart/perPartSlice';
import wordNote from 'features/WordNote/wordNoteSlice';
import level from 'features/Levels/levelSlice';
import classes from 'features/Classes/classesSlice';
import schedule from 'features/Schedule/scheduleSlice';
import global from './globalSlice';

const rootReducer = {
  global,
  me,
  login,
  home,
  exam,
  course,
  perPart,
  wordNote,
  level,
  classes,
  schedule,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
