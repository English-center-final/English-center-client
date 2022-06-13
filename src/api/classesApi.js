import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.classes.url;
const classesApi = {
  fetchClasses: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },
  registerClass: (classesId) => {
    return axiosClient.post(`${BASE_URL}/registry`, {
      classesId,
      status: 'NEW',
    });
  },
  fetchSchedules: (params) => {
    return axiosClient.get(`${BASE_URL}/schedules`, { params });
  },
};

export default classesApi;
