import constants from 'utils/constants';

const settings = {
  api: {
    baseUrl: process.env.REACT_APP_JAVA_API_URL,
    endpoints: {
      auth: { url: '/auth' },
      me: { url: '/me' },
      courses: { url: '/courses' },
      books: { url: '/books' },
      exams: { url: '/exams' },
      levels: { url: '/levels' },
      classes: { url: '/classes' },
    },
  },
  routes: {
    home: {
      url: '/',
    },
    courses: {
      url: '/courses',
    },
    exams: {
      url: '/exams',
    },
    levels: {
      url: '/levels',
    },
    classes: {
      url: '/classes',
    },
    login: {
      url: '/auth/login',
    },
    logout: {
      url: '/auth/logout',
    },
    wordnotes: {
      url: '/wordnotes',
    },
    me: {
      url: '/me',
    },
    schedules: {
      url: '/schedules',
    },
  },
  constants,
};
export default settings;
