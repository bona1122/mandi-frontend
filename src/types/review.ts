import { UserDTO } from './user';

export type ImageUrl = {
  url: string;
};

export type CompletedCourseDTO = {
  id: number;
  courseName: string;
  duration: string;
  distance: number;
  trekkingPathImageUrl: string;
  completedAt: string;
};

export type ReviewDTO = {
  user: UserDTO;
  review: {
    completedCourse: CompletedCourseDTO;
    isReviewed: boolean;
    content: string;
    score: number;
    imageUrlList: ImageUrl[];
    reviewedAt: string;
  };
};

export type ReviewSummary = {
  totalReviewCount: number;
  averageReviewScore: number;
  excellentCount: number;
  veryGoodCount: number;
  averageCount: number;
  poorCount: number;
  terribleCount: number;
};
