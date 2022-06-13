import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.auth.url;

const loginApi = {
  login: (username, password) => {
    const url = `${BASE_URL}/login`;
    return axiosClient.post(url, { username, password });
  },

  registry: (name, username, password, phoneNumber) => {
    const url = `${BASE_URL}/registry`;
    return axiosClient.post(url, { name, username, password, phoneNumber });
  },

  resetOtp: (username) => {
    const url = `${BASE_URL}/reset-otp`;
    return axiosClient.post(url, { username });
  },

  confirmAccount: (username, otp) => {
    const url = `${BASE_URL}/confirm-account`;
    return axiosClient.post(url, { username, otp });
  },

  confirmPassword: (username, password, otp) => {
    const url = `${BASE_URL}/confirm-password`;
    return axiosClient.post(url, { username, password, otp });
  },
};

export default loginApi;
