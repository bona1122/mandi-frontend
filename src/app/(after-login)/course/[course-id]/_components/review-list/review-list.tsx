'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';

import EmptyIcon from '@/assets/colored-icon/paste.svg';
import Chip from '@/components/common/chip';
import { Menubox } from '@/components/common/menubox';
import { ReviewFilter } from '@/types/filter';

import { dummyReviews, Review } from './dummy-reviews';
import ReviewItem from './review-item';
import styles from './review-list.module.scss';
import { ReviewDTO } from '@/types/review';
import { ReviewSortBy } from '@/hooks/useReviewFilterWithUrl';

const BLOCK = 'review-list';
const cx = classNames.bind(styles);

interface ReviewListProps {
  reviews: ReviewDTO[];
  hasFilter?: boolean;
  maxCount?: number;
  selectedFilter?: ReviewSortBy;
  onChangeFilter?: (filter: ReviewSortBy) => void;
}

const ReviewFilterMap: Record<ReviewSortBy, string> = {
  LATEST: 'Latest',
  HIGHEST_RATING: 'Highest Rating',
  LOWEST_RATING: 'Lowest Rating',
};

const ReviewList = ({
  selectedFilter,
  hasFilter,
  maxCount,
  reviews,
  onChangeFilter,
}: ReviewListProps) => {
  // const [filter, setFilter] = useState<ReviewFilter>('latest');
  // const dummyList = dummyReviews;
  // const list = maxCount ? dummyList.slice(0, maxCount) : dummyList;
  const list = maxCount ? reviews.slice(0, maxCount) : reviews;
  return (
    <div className={cx(BLOCK)}>
      {hasFilter && (
        <div className={cx(`${BLOCK}__filter`)}>
          <Menubox
            triggerButton={
              <Chip action={true}>
                {ReviewFilterMap[selectedFilter ?? 'LATEST']}
              </Chip>
            }
            items={Object.entries(ReviewFilterMap).map(([key, value]) => ({
              content: value,
              onClick: () => onChangeFilter?.(key as ReviewSortBy),
            }))}
          />
        </div>
      )}
      {list.length === 0 ? (
        <div className={cx(`${BLOCK}__empty`)}>
          <EmptyIcon />
          <span>There is no review yet.</span>
        </div>
      ) : (
        list.map((review, idx) => <ReviewItem key={idx} review={review} />)
      )}
    </div>
  );
};

export default ReviewList;
