import axios from 'axios';
import { setServerError } from '../../store/reducers/ServiceSlice';
import { store } from '../../store/store';

const instance = axios.create({
  withCredentials: false,
  baseURL: '/api/v1',
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    console.error(`ServerError:`, error);
    store.dispatch(setServerError(true));
    return Promise.reject(error);
  }
);

const downloadLink = (item: string) => {
  return `/resume/download?id=${item}&type=doc`;
};

export const ApiService = {
  async getAllSkills() {
    return instance.get(`/environment`).then((response) => {
      return response.data;
    });
  },
  async sendResume(data: any) {
    return instance.post(`/resume/upload`, data).then((response) => {
      return response.data;
    });
  },
  async sendSkill(data: { label: string; category: string; priority: number }) {
    return instance.post(`/environment`, data).then((response) => {
      return response.data;
    });
  },
  async getResume() {
    return instance.get(`/resume`).then((response) => {
      return response.data;
    });
  },
  async getFileToDownload(item: string) {
    const link = downloadLink(item);
    return instance
      .get(link, {
        responseType: 'blob',
      })
      .then((response) => {
        return response;
      });
  },
};
