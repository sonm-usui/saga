import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { APP_ENVIRONMENTS } from '../config';
import { size } from 'lodash';

const { API_ROOT_URL, ACCESS_TOKEN, REFRESH_TOKEN } = APP_ENVIRONMENTS;

const client = axios.create({
  baseURL: API_ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  } as AxiosRequestHeaders
});

client.defaults.headers.post['Content-Type'] = 'application/json';
client.defaults.headers.post['Accept'] = 'application/json';

client.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

client.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
        localStorage.clear();
        return;
      }

      try {
        const response = await axios.post(`${API_ROOT_URL}/auth/token/refresh`, {
          refresh_token: refreshToken
        });

        localStorage.setItem(APP_ENVIRONMENTS.ACCESS_TOKEN, response?.data?.access_token);
        axios.defaults.headers.common.Authorization = `Bearer ${response?.data?.access_token}`;
        return client(originalRequest);
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return Promise.reject(err);
  }
);

export class BaseRequest {
  async get(url: string, params = {}) {
    try {
      const config = {
        params
      };

      const response = await client.get(url, config);
      return this._responseHandler(response);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await client.put(url, data, config);
      return this._responseHandler(response);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await client.post(url, data, config);
      return this._responseHandler(response);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async del(url: string, data = {}) {
    try {
      const response = await client.delete(url, {
        data
      });
      return this._responseHandler(response);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async _responseHandler(response: any) {
    return response.data;
  }

  _errorHandler = async (err: any) => {
    throw {
      error: {
        status: err?.response?.status,
        message:
          size(err?.response?.data?.details) > 0
            ? err?.response?.data
            : err?.response?.data?.message
      }
    };
  };
}

export type OptionsType = {
  page_size: number;
  page_index: number;
};
