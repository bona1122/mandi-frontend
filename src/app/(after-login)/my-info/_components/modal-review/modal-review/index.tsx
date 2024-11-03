import classNames from 'classnames/bind';

import ModalReviewSectionDown from '@/app/(after-login)/my-info/_components/modal-review/modal-review-section-down/index';
import ModalReviewSectionUp from '@/app/(after-login)/my-info/_components/modal-review/modal-review-section-up/index';

import styles from './modalReview.module.scss';

export interface ModalReviewProps {
  CourseId?: number;
  img: string;
  title: string;
  time?: number | string;
  distance?: number;

  modal: 'write' | 'unWrite' | 'complete-course';
  review?: string;
  reviewImgs?: string[];
  score?: number;
  date: string | number;
  reviewDate?: string | undefined;
}

const cx = classNames.bind(styles);

const ModalReview = ({
  CourseId,
  modal,
  img,
  title,
  time,
  distance,
  review,
  reviewImgs,
  score,
  date,
  reviewDate,
}: ModalReviewProps) => {
  return (
    <div className={cx('container')}>
      <ModalReviewSectionUp
        CourseId={CourseId ?? 1}
        modal={modal}
        img={img}
        title={title}
        time={time}
        date={date}
        distance={distance}
      />
      <ModalReviewSectionDown
        id={CourseId}
        review={review}
        reviewImgs={reviewImgs}
        score={score}
        date={reviewDate}
        modal={modal}
      />
    </div>
  );
};
export default ModalReview;
