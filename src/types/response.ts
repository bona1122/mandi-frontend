import { AxiosResponse } from 'axios';

import {
  CourseDetailDTO,
  CourseDTO,
  CourseNameDTO,
  MapCourseDTO,
} from './course';
import { OauthProvider } from './oauth-provider';
import {
  CompletedCourseDTO,
  ImageUrl,
  ReviewDTO,
  ReviewSummary,
} from './review';
import { WeatherItem } from './weather';
import { PageInfo } from './page';

interface BaseResponse extends AxiosResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}

export interface LoginResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  };
}

export interface SignupResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  } | null;
}

export interface CheckNicknameResponse extends BaseResponse {
  response: boolean;
}

export interface GetMyInfoResponse extends BaseResponse {
  response: {
    nickname: string;
    imgUrl: string;
    description: string;
    totalReviews: number;
    completedCourses: number;
    email: string;
    provider: OauthProvider;
  };
}

export interface UpdateMyInfoResponse extends BaseResponse {
  response: boolean;
}

export interface UpdateMyInfoImageResponse extends BaseResponse {
  response: string;
}

export interface BadgeResponse extends BaseResponse {
  response: {
    totalBadgeCount: number;
    userBadgeCount: number;
    badges: {
      id: number;
      name: string;
      requirements: string;
      imgUrl: string;
    }[];
  };
}

export interface PostsCategoryResponse {
  success: boolean;
  response: {
    posts: {
      postId: number;
      user: {
        userId: number;
        nickname: string;
        imgUrl: string;
      };
      category: string;
      content: string; // 게시물 내용
      title: string; // 게시물 제목
      uploadDate: string; // 업로드 날짜 (ISO 포맷)
      likeCnt: number; // 좋아요 수
      commentCnt: number; // 댓글 수
      imgUrlList: {
        url: string; // 이미지 URL 리스트
      }[];
    }[];
    pageInfo: {
      totalCount: number; // 전체 게시물 수
      size: number; // 페이지당 게시물 수
      currentPage: number; // 현재 페이지 번호
      totalPages: number; // 전체 페이지 수
    };
  };
  error: {
    message: string; // 에러 메시지
    status: number; // 에러 상태 코드
    errorCode: string; // 에러 코드
  };
}

export interface GetCoursesResponse extends BaseResponse {
  response: {
    pageInfo: {
      totalCount: number;
      size: number;
      currentPage: number;
      totalPages: number;
    };
    courses: CourseDTO[];
  };
}

export interface GetNearbyCoursesResponse extends BaseResponse {
  response: {
    courses: MapCourseDTO[];
  };
}

export interface WeatherResponse {
  list: WeatherItem[];
  city: {
    name: string;
  };
}
interface User {
  userId: number; // 유저 ID
  nickname: string; // 유저 닉네임
  imgUrl: string; // 유저 프로필 이미지 URL
}

export interface Comment {
  commentId: number; // 댓글 ID
  parentCommentId: number | null; // 부모 댓글 ID (최상위 댓글이면 null)
  childComments: Comment[] | []; // 대댓글 배열 (Comment 타입을 재귀적으로 포함)
  user: User; // 댓글 작성자 정보 (User 타입)
  uploadDate: string; // 댓글 작성 시간
  content: string; // 댓글 내용
  likeCnt: number; // 좋아요 수
  isDeleted: boolean;
}
export interface GetPostIdResponse {
  success: boolean;
  response?: {
    postId: number;
    user: {
      userId: number;
      nickname: string;
      imgUrl: string;
    };
    category: string;
    content: string;
    title: string;
    likeCnt: number;
    CommentCnt: number;
    uploadDate: string;
    imgUrlList: {
      url: string;
    }[];
    commentList: Comment[];
  };
  error?: {
    message: string;
    status: number;
    errorCode: string;
  };
}
export interface CourseCompleteReviewResponse {
  success: boolean;
  response: {
    totalCompletedCourseCount: number;
    totalReviewCount: number;
    reviewedCourses: {
      completedCourse: {
        id: number;
        courseName: string;
        duration: string;
        distance: number;
        trekkingPathImageUrl: string;
        completedAt: string;
      };
      isReviewed: boolean;
      content: string;
      score: number;
      reviewedAt: string;
      imageUrlList: {
        url: string;
      }[];
    }[];
    notReviewedCourses: {
      id: number;
      courseName: string;
      duration: string;
      distance: number;
      trekkingPathImageUrl: string;
      completedAt: string;
    }[];
  };
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}
export interface CourseCompleteResponse {
  success: boolean;
  response: {
    totalCount: number;
    totalDistance: number;
    completedCourses: {
      id: number;
      courseName: string;
      duration: string;
      distance: number;
      trekkingPathImageUrl: string;
      completedAt: string;
    }[];
  };
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}

export interface CourseNamesResponse extends BaseResponse {
  response: CourseNameDTO[];
}

export interface GetCourseDetailResponse extends BaseResponse {
  response: CourseDetailDTO;
}

export interface StartTrekkingResponse extends BaseResponse {
  response: {
    enabled: boolean;
  };
}

export interface FinishTrekkingResponse extends BaseResponse {
  response: {
    enabled: boolean;
  };
}

export interface PostReviewResponse extends BaseResponse {
  success: boolean;
  response: {
    completedCourse: CompletedCourseDTO;
    isReviewed: boolean;
    content: string;
    score: number;
    imageUrlList: ImageUrl[];
    reviewedAt: string;
  };
}

export interface GetCourseReviewsResponse extends BaseResponse {
  success: boolean;
  response: {
    pageInfo: PageInfo;
    reviewSummary: ReviewSummary;
    reviews: ReviewDTO[];
  };
}

export interface GetUserIdResponse extends BaseResponse {
  success: boolean;
  response: number;
}
