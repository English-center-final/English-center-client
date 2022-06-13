import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.courses.url;
const courseApi = {
  getCourses: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },

  getCourseWords: (params) => {
    const url = '/course-words';
    return axiosClient.get(url, { params });
  },

  getTopics: () => {
    return axiosClient.get(`${BASE_URL}/topics`);
  },

  getCourseDetail: (slug) => {
    return axiosClient.get(`${BASE_URL}/${slug}`);
  },
};

export default courseApi;
