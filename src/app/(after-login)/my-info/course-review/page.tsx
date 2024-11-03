'use client';
import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ReviewLayout from '@/app/(after-login)/my-info/_components/review-layout';
import Tabs from '@/components/common/taps';
import Layout from '@/components/layout';
import { useCourseCompleteReviewQuery } from '@/queries/courseReviewQuery';

const Review = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useCourseCompleteReviewQuery();
  const totalReviewCount = data?.response.totalReviewCount;
  const totalCompletedCourseCount = data?.response.totalCompletedCourseCount;
  const reviewData = data?.response.reviewedCourses.map(course => ({
    ...course.completedCourse, // completedCourse 속성 내의 데이터를 병합
    isReviewed: course.isReviewed,
    content: course.content,
    score: course.score,
    reviewedAt: course.reviewedAt,
    imageUrlList: course.imageUrlList.map(image => image.url),
  }));
  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ['course-complete-review'] });
  }, [queryClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={false}
      back={true}
      title='My course review'
      onBack={() => router.push('/my-info')}
    >
      <Tabs
        tabs={[
          {
            title: `Unwritten Review(${Number(totalCompletedCourseCount) - Number(totalReviewCount)})`,
            content: (
              <ReviewLayout
                modal='unWrite'
                reviewsData={data?.response.notReviewedCourses}
              />
            ),
          },
          {
            title: `written Review(${totalReviewCount})`,
            content: <ReviewLayout modal='write' reviewsData={reviewData} />,
          },
        ]}
        version={1}
      />
    </Layout>
  );
};
export default Review;
