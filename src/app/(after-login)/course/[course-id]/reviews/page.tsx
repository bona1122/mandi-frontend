'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter, useSearchParams } from 'next/navigation';

import Layout from '@/components/layout';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useReviewFilterWithUrl, {
  ReviewSortBy,
} from '@/hooks/useReviewFilterWithUrl';
import { useCourseReviewsQuery } from '@/queries/courseReviewQuery';

import ReviewList from '../_components/review-list/review-list';
import ReviewOverview from '../_components/review-overview/review-overview';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const CourseReviewsPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
  const router = useRouter();
  const { filters, updateUrlWithFilters } = useReviewFilterWithUrl({
    courseId: courseId,
  });
  const handleChangeFilter = (filter: ReviewSortBy) =>
    updateUrlWithFilters({ sortBy: filter });

  const courseReviewsQuery = useCourseReviewsQuery({
    courseId: +courseId,
    sortType: filters.sortBy,
  });
  const { loadMoreRef, data, status, isFetching } =
    useInfiniteScroll(courseReviewsQuery);
  return (
    <Layout
      hasTabBar={false}
      hasTopNav={true}
      title='Reviews'
      back={true}
      // onBack={() => router.push(`/course/${courseId}`)}
    >
      {status === 'success' && (
        <>
          <div className={cx('review-overview-section')}>
            <ReviewOverview summary={data.pages[0].response.reviewSummary} />
          </div>
          <div className={cx('review-list')}>
            <ReviewList
              selectedFilter={filters.sortBy}
              onChangeFilter={handleChangeFilter}
              hasFilter={true}
              reviews={data.pages.flatMap(page => page.response.reviews)}
            />
          </div>
          <div ref={loadMoreRef} />
        </>
      )}
    </Layout>
  );
};

export default CourseReviewsPage;
