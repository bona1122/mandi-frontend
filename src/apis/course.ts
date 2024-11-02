import {
  GetNearbyCoursesRequest,
  GetCoursesRequest,
  GetCourseDetailRequest,
} from '@/types/request';
import {
  GetNearbyCoursesResponse,
  GetCoursesResponse,
  CourseNamesResponse,
  GetCourseDetailResponse,
  GetPreferredCoursesResponse,
} from '@/types/response';

import { axiosInstance } from './axiosInstance';

export const getCoursesAPI = async (
  request: GetCoursesRequest,
): Promise<GetCoursesResponse> => {
  console.log('request', request);
  const { page, size, rating, keyword, orderByDirection, levels } = request;
  try {
    const response = await axiosInstance.get('/courses', {
      params: {
        page,
        size,
        rating,
        keyword,
        orderByDirection,
        levels,
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

export const getPreferredCoursesAPI =
  async (): Promise<GetPreferredCoursesResponse> => {
    try {
      const response = await axiosInstance.get('/courses/preferred');

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.error.message);
      }
    } catch (error) {
      throw error;
    }
  };

export const getNearbyCoursesAPI = async (
  request: GetNearbyCoursesRequest,
): Promise<GetNearbyCoursesResponse> => {
  const { sw, ne } = request;
  try {
    const response = await axiosInstance.post('/courses/nearby', {
      sw,
      ne,
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

export const getGPXDataAPI = async (gpxUrl: string): Promise<string> => {
  try {
    const response = await fetch(gpxUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching GPX data:', error);
    throw error;
  }
};

export const getCourseNamesAPI = async (): Promise<CourseNamesResponse> => {
  try {
    const response = await axiosInstance.get('/courses/names');
    console.log('response', response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getCourseDetailAPI = async (
  request: GetCourseDetailRequest,
): Promise<GetCourseDetailResponse> => {
  const { courseId } = request;
  try {
    const response = await axiosInstance.get(`/courses/${courseId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCompletedReview = async (completedCourseId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/reviews/${completedCourseId}`,
    );
    console.log('completed review deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completed review deleted:', error);
    throw error;
  }
};
