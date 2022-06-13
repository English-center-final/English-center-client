import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.me.url;

const meApi = {
  fetchProfile: () => {
    return axiosClient.get(BASE_URL);
  },
  updateUser: (account) => {
    return axiosClient.put(BASE_URL, account);
  },
  updateAvatar: (file) => {
    return axiosClient.put(`${BASE_URL}/image`, file);
  },
  fetchClassOfUser: () => {
    return axiosClient.get(`${BASE_URL}/classes`);
  },
  fetchUserExam: (params) => {
    return axiosClient.get(`${BASE_URL}/exam-history`, { params });
  },

  fetchBranches: () => {
    const url = '/branches';
    return axiosClient.get(url);
  },
};

export default meApi;
