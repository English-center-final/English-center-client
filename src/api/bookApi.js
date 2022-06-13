import settings from 'app/settings';
import axiosClient from './axiosClient';

const bookApi = {
  fetchBooks: () => {
    return axiosClient.get(settings.api.endpoints.books.url);
  },
};

export default bookApi;
