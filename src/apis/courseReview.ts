import { GetCourseReviewsRequest, PostReviewRequest } from '@/types/request';
import { GetCourseReviewsResponse, PostReviewResponse } from '@/types/response';
import { getAccessToken } from '@/utils/auth';

import { axiosInstance } from './axiosInstance';

export const getCourseCompleteReviewAPI = async () => {
  try {
    const response = await axiosInstance.get('/reviews');
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

export const getCourseCompleteAPI = async () => {
  const accessToken = getAccessToken();
  try {
    const response = await axiosInstance.get('/courses/completed', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const postReviewAPI = async (
  request: PostReviewRequest,
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.post(`/reviews`, request);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getCourseReviewsAPI = async (
  request: GetCourseReviewsRequest,
): Promise<GetCourseReviewsResponse> => {
  const { courseId, page, size, sortType } = request;
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/reviews`, {
      params: {
        page,
        size,
        sortType,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};
