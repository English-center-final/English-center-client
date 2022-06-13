import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.exams.url;

const examApi = {
  fetchExamBySlug: (slug) => {
    return axiosClient.get(`${BASE_URL}/${slug}`);
  },

  fetchResultBySlug: (slug, answers) => {
    return axiosClient.post(`${BASE_URL}/${slug}/result`, answers);
  },

  fetchQuestionsOfPart: (numberPart, examSlug) => {
    return axiosClient.get(`${BASE_URL}/${examSlug}/parts`, {
      params: {
        type: numberPart,
      },
    });
  },
};

export default examApi;
