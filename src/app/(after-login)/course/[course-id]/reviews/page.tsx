'use client';
import classNames from 'classnames/bind';

import Layout from '@/components/layout';

import ReviewList from '../_components/review-list/review-list';
import ReviewOverview from '../_components/review-overview/review-overview';

import styles from './page.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useReviewFilterWithUrl, {
  ReviewSortBy,
} from '@/hooks/useReviewFilterWithUrl';
import { useCourseReviewsQuery } from '@/queries/courseReviewQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const cx = classNames.bind(styles);

const CourseReviewsPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
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
    <Layout hasTabBar={false} hasTopNav={true} title='Reviews' back={true}>
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
