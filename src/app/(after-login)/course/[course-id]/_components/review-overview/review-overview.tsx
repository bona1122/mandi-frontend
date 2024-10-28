import classNames from 'classnames/bind';
import e from 'express';

import { ReviewSummary } from '@/types/review';

import RatingChart, { Rating } from '../rating-chart/rating-chart';
import StarRating from '../star-raing/star-rating';

import styles from './review-overview.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'review-overview';

// const ratings: Rating[] = [
//   { label: 'Excellent', count: 17 },
//   { label: 'Very Good', count: 3 },
//   { label: 'Average', count: 0 },
//   { label: 'Poor', count: 1 },
//   { label: 'Terrible', count: 0 },
// ];

interface ReviewOverviewProps {
  summary: ReviewSummary;
}

const ReviewOverview = ({ summary }: ReviewOverviewProps) => {
  const {
    excellentCount,
    averageCount,
    veryGoodCount,
    poorCount,
    terribleCount,
  } = summary;
  const ratings: Rating[] = [
    { label: 'Excellent', count: excellentCount },
    { label: 'Very Good', count: veryGoodCount },
    { label: 'Average', count: averageCount },
    { label: 'Poor', count: poorCount },
    { label: 'Terrible', count: terribleCount },
  ];
  return (
    <div className={cx(BLOCK)}>
      <h3 className={cx(`${BLOCK}__header`)}>
        Reviews
        <span className={cx(`${BLOCK}__header__review-counts`)}>
          {summary.totalReviewCount}
        </span>
      </h3>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__score`)}>
          <span className={cx(`${BLOCK}__score__number`)}>
            {summary.averageReviewScore}
          </span>
          <StarRating rating={summary.averageReviewScore} />
        </div>
        <RatingChart ratings={ratings} />
      </div>
    </div>
  );
};

export default ReviewOverview;
