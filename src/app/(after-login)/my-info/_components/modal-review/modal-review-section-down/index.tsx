import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';
import StarScope from '@/components/star-scope';

import styles from './modalReviewSectionDown.module.scss';
export interface ModalReviewSectionDownProps {
  id?: number;
  review?: string;
  reviewImgs?: string[];
  score?: number;
  date: string | undefined;
  modal: 'write' | 'unWrite' | 'complete-course';
}

const cx = classNames.bind(styles);

const ModalReviewSectionDown = ({
  id,
  review,
  reviewImgs,
  score,
  date,
  modal,
}: ModalReviewSectionDownProps) => {
  const router = useRouter();
  const handleClick = () => {
    // alert('리뷰작성 버튼 클릭');
    // console.log(id);
    router.push(`/review/write/${id}`);
  };
  if (modal === 'write') {
    return (
      <div className={cx('container__write')}>
        <div className={cx('container__write__score')}>
          {score && <StarScope score={score} />}
          <span className={cx('label4-regular')}>{date}</span>
        </div>
        <div className={cx('container__write__review', 'body2-regular')}>
          {review && review}
        </div>
        <div className={cx('container__write__img')}>
          {reviewImgs &&
            reviewImgs.map((img, i) => (
              <Image
                layout='fixed'
                className={cx('container__write__img__item')}
                width={56}
                height={56}
                key={i}
                src={img}
                alt={`Image ${i + 1}`}
              />
              // 수정필요
            ))}
        </div>
      </div>
    );
  } else if (modal === 'unWrite') {
    return (
      <Button
        className={cx('container__unwrite__button')}
        size='full'
        color='white'
        onClick={handleClick}
      >
        Write a Review
      </Button>
    );
  } else if (modal === 'complete-course') {
    return <div></div>;
  } else {
    return <div>error</div>; // modal이 지정되지 않았거나 잘못된 값인 경우
  }
};
export default ModalReviewSectionDown;
