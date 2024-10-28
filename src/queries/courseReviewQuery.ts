import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  getCourseCompleteAPI,
  getCourseCompleteReviewAPI,
  getCourseReviewsAPI,
  postReviewAPI,
} from '@/apis/courseReview';
import {
  CourseCompleteReviewResponse,
  CourseCompleteResponse,
  PostReviewResponse,
  GetCourseReviewsResponse,
} from '@/types/response';
import { AxiosError } from 'axios';
import { GetCourseReviewsRequest, PostReviewRequest } from '@/types/request';

export const useCourseCompleteReviewQuery = () => {
  return useQuery<CourseCompleteReviewResponse>({
    queryKey: ['course-complete-review'],
    queryFn: () => getCourseCompleteReviewAPI(),
  });
};

export const useCourseCompleteQuery = () => {
  return useQuery<CourseCompleteResponse>({
    queryKey: ['course-complete'],
    queryFn: () => getCourseCompleteAPI(),
  });
};

export const useReviewMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<PostReviewResponse, AxiosError, PostReviewRequest>({
    mutationKey: ['post-review'],
    mutationFn: (request: PostReviewRequest) => postReviewAPI(request),
    onSuccess,
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useCourseReviewsQuery = (params: GetCourseReviewsRequest) => {
  return useInfiniteQuery<GetCourseReviewsResponse, AxiosError>({
    queryKey: ['course-reviews', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getCourseReviewsAPI({
        ...params,
        page: typeof pageParam === 'number' ? pageParam.toString() : '1',
      });
    },
    getNextPageParam: lastPage => {
      const { currentPage, totalPages } = lastPage.response.pageInfo;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};