import { Coordinate } from './course';

export type SignupRequest = {
  token: string;
  nickname: string;
  description: string;
};

export type LoginRequest = {
  token: string;
};

export type UpdateMyInfoRequest = {
  nickname: string;
  description: string;
};

export type UpdateMyInfoImageRequest = {
  Base64EncodedImage: string;
};
export type CheckNicknameRequest = {
  nickname: string;
};

export type PostsCreateRequest = {
  category: string;
  content: string;
  title: string;
  Base64EncodedImageList: string[];
};
export type PutCreateRequest = {
  category: string;
  content: string;
  title: string;
  Base64EncodedImageList: string[];
};
export type WeatherRequest = {
  lat: number;
  lon: number;
  appid: string;
};

export type GetCoursesRequest = {
  page?: string;
  size?: string;
  rating?: '0' | '1' | '2' | '3' | '4' | '5';
  keyword?: string;
  orderByDirection?: 'ASC' | 'DESC';
  levels?: string;
};

export type GetNearbyCoursesRequest = {
  sw: Coordinate;
  ne: Coordinate;
};

export type GetCourseDetailRequest = {
  courseId: number;
};

export type StartTrekkingRequest = {
  userLocation: {
    latitude: number;
    longitude: number;
  };
};

export type FinishTrekkingRequest = {
  userLocation: {
    latitude: number;
    longitude: number;
  };
  completedAt: string;
};

export type PostReviewRequest = {
  completedCourseId: number;
  content: string;
  score: number;
  base64EncodedImageList: string[];
};

export type GetCourseReviewsRequest = {
  courseId: number;
  page?: string;
  size?: string;
  sortType?: 'LATEST' | 'HIGHEST_RATING' | 'LOWEST_RATING';
};
