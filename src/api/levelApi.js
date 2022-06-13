import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.levels.url;

const levelApi = {
  fetchLevels: () => {
    return axiosClient.get(BASE_URL);
  },
  fetchLevelBySlug: (slug) => {
    return axiosClient.get(`${BASE_URL}/${slug}`);
  },
};

export default levelApi;
