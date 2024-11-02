import axios from 'axios';
import { signOut } from 'next-auth/react';

import {
  MAX_TIMEOUT_TIME,
  NO_AUTH_ENDPOINTS,
  NO_AUTH_PATTERNS,
  PREFERRED_COURSES_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
} from '@/constants/api';
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/auth';

import { refreshTokenAPI } from './auth';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_BASE_URL,
  timeout: MAX_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const weatherInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
  timeout: MAX_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  request => {
    const accessToken = getAccessToken();

    const isNoAuthEndpoint =
      !request.url?.includes(PREFERRED_COURSES_ENDPOINT) &&
      (NO_AUTH_ENDPOINTS.includes(request.url ?? '') ||
        NO_AUTH_PATTERNS.some(pattern => pattern.test(request.url ?? '')));
    if (accessToken && !isNoAuthEndpoint) {
      if (REFRESH_TOKEN_ENDPOINT.includes(request.url ?? '')) {
        console.log(request.url);
        request.headers.Authorization = `${accessToken}`;
      } else {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const data = await refreshTokenAPI(refreshToken);
          const { accessToken, refreshToken: newRefreshToken } = data.response;

          setAccessToken(accessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          deleteAccessToken();
          deleteRefreshToken();
          signOut();

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
