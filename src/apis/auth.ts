import { LoginRequest, SignupRequest } from '@/types/request';
import { setAccessToken, setRefreshToken } from '@/utils/auth';

import { axiosInstance } from './axiosInstance';
import { GetUserIdResponse } from '@/types/response';

export const loginAPI = async (request: LoginRequest) => {
  const { token } = request;

  try {
    const response = await axiosInstance.post(`/auth/google/login`, null, {
      headers: {
        'Content-Type': 'application/json',
        Google: token,
      },
    });

    if (response.status === 200) {
      setAccessToken(response.data.response.accessToken);
      setRefreshToken(response.data.response.refreshToken);

      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupAPI = async (request: SignupRequest) => {
  const { token, nickname, description } = request;

  try {
    const response = await axiosInstance.post(
      `/auth/google/signup`,
      {
        nickname,
        description,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Google: token,
        },
      },
    );

    if (response.status === 200) {
      setAccessToken(response.data.response.accessToken);
      setRefreshToken(response.data.response.refreshToken);

      return response.data;
    } else {
      throw response.status;
    }
  } catch (error) {
    throw error;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post('/auth/reissue', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const withdrawalAPI = async () => {
  try {
    const response = await axiosInstance.delete('/auth/withdrawal');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAuthId = async () => {
  try {
    const response = await axiosInstance.get('/auth/id');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserIdAPI = async (): Promise<GetUserIdResponse> => {
  try {
    const response = await axiosInstance.get('/auth/id');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
