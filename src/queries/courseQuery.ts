import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  deleteCompletedReview,
  getCourseDetailAPI,
  getCourseNamesAPI,
  getCoursesAPI,
  getGPXDataAPI,
  getNearbyCoursesAPI,
  getPreferredCoursesAPI,
} from '@/apis/course';
import {
  GetCourseDetailRequest,
  GetCoursesRequest,
  GetNearbyCoursesRequest,
} from '@/types/request';
import {
  GetCourseDetailResponse,
  GetCoursesResponse,
  GetNearbyCoursesResponse,
  GetPreferredCoursesResponse,
} from '@/types/response';

export const useCoursesQuery = (params: GetCoursesRequest, enabled = true) => {
  return useInfiniteQuery<GetCoursesResponse, AxiosError>({
    queryKey: ['courses', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getCoursesAPI({
        ...params,
        page: typeof pageParam === 'number' ? pageParam.toString() : '1',
      });
    },
    getNextPageParam: lastPage => {
      const { currentPage, totalPages } = lastPage.response.pageInfo;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled,
  });
};

export const usePreferredCoursesQuery = () => {
  return useQuery<GetPreferredCoursesResponse, AxiosError>({
    queryKey: ['preferred-courses'],
    queryFn: () => getPreferredCoursesAPI(),
  });
};

export const useNearbyCoursesMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetNearbyCoursesResponse) => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<
    GetNearbyCoursesResponse,
    AxiosError,
    GetNearbyCoursesRequest
  >({
    mutationKey: ['nearby-courses'],
    mutationFn: (request: GetNearbyCoursesRequest) =>
      getNearbyCoursesAPI(request),
    onSuccess: data => {
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useGPXQuery = (gpxUrl: string) => {
  return useQuery<string, AxiosError>({
    queryKey: ['gpx', gpxUrl],
    queryFn: () => getGPXDataAPI(gpxUrl),
  });
};

export const useCourseNamesQuery = () => {
  return useQuery({
    queryKey: ['course-names'],
    queryFn: () => getCourseNamesAPI(),
  });
};

export const useCourseDetailQuery = (params: GetCourseDetailRequest) => {
  return useQuery<GetCourseDetailResponse, AxiosError>({
    queryKey: ['course-detail', params],
    queryFn: () => getCourseDetailAPI(params),
  });
};

export const useDeleteCompletedReview = () => {
  return useMutation({
    mutationFn: (completedCourseId: string) =>
      deleteCompletedReview(completedCourseId),
    onSuccess: () => {
      console.log('완성된 리뷰 삭제 성공');
    },
    onError: error => {
      console.error('완성된 리뷰 삭제 실패', error);
    },
  });
};
