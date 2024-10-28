'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import TrashcanIcon from '@/assets/icon/icon-bin-mono 1.svg';
import MoreIcon from '@/assets/icon/icon-ellipsis-vertical.svg';
import { Menubox } from '@/components/common/menubox';
import UserIcon from '@/assets/icon/icon-user-mono.svg';

import Star from '../star-raing/star';

import styles from './review-item.module.scss';
import { ReviewDTO } from '@/types/review';
import { useUserStore } from '@/stores/user';
import Dialog from '@/components/common/dialog';
import Button from '@/components/common/button';
import { useDeleteCompletedReview } from '@/queries/courseQuery';
import { useQueryClient } from '@tanstack/react-query';

const BLOCK = 'review-item';
const cx = classNames.bind(styles);

interface ReviewItemProps {
  review: ReviewDTO;
}

//id, rating, date, content, images, user
const ReviewItem = ({
  review: {
    user: { userId, nickname, imgUrl },
    review: { score, reviewedAt, content, imageUrlList, completedCourse },
  },
}: ReviewItemProps) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  // console.log(user?.userId);
  const isMyReview = user?.userId === userId + '';
  const cloneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overflow, setOverflow] = useState<boolean | null>(null);
  const { mutate } = useDeleteCompletedReview();

  const handleDialogClose = () => setDialogOpen(false);
  const handleExpand = () => setOverflow(false);
  const handleDeleteClick = () => {
    // console.log('Delete');
    // setDialogOpen(false);
    mutate(completedCourse.id + '', {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['course-reviews'] });
        setDialogOpen(false);
      },
      onError: error => {
        console.error('리뷰 삭제 실패:', error);
      },
    });
  };

  useEffect(() => {
    const clone = cloneRef.current;
    const text = textRef.current;

    if (clone && text) {
      const cloneHeight = clone.getBoundingClientRect().height;
      const textHeight = text.getBoundingClientRect().height;

      const isOverflow = textHeight < cloneHeight;

      setOverflow(isOverflow);
    }
  }, []);

  return (
    <div className={cx(BLOCK)}>
      <div className={cx(`${BLOCK}__header`)}>
        <div className={cx(`${BLOCK}__avatar`)}>
          {imgUrl ? (
            <Image src={imgUrl} width={40} height={40} alt='profile image' />
          ) : (
            <UserIcon className={cx(`${BLOCK}__avatar__empty-icon`)} />
          )}
        </div>
        <div className={cx(`${BLOCK}__user-rating`)}>
          <div className={cx(`${BLOCK}__username`)}>{nickname}</div>
          <div className={cx(`${BLOCK}__rating`)}>
            <Star type='filled' />
            <span>{score}</span>
          </div>
        </div>
        <div className={cx(`${BLOCK}__date`)}>{reviewedAt}</div>
        {isMyReview && (
          <Menubox
            triggerButton={<MoreIcon className={cx(`${BLOCK}__more-icon`)} />}
            items={[
              {
                icon: TrashcanIcon,
                content: 'Delete',
                onClick: () => setDialogOpen(true),
              },
            ]}
          />
        )}
      </div>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__images`)}>
          {imageUrlList.map((image, index) => (
            <div key={index} className={cx(`${BLOCK}__images__item`)}>
              <Image
                src={image.url}
                alt='review-image'
                width={56}
                height={56}
              />
            </div>
          ))}
        </div>
        <div ref={cloneRef} className={cx(`${BLOCK}__text__clone`)}>
          {content}
        </div>
        <div>
          <div
            ref={textRef}
            className={cx(`${BLOCK}__text`, {
              [`${BLOCK}__text--expanded`]: overflow === false,
            })}
          >
            {content}
          </div>
          {overflow && (
            <button
              className={cx(`${BLOCK}__expand-button`)}
              onClick={handleExpand}
            >
              more
            </button>
          )}
        </div>
      </div>
      <Dialog
        isOpen={dialogOpen}
        title='Delete the review?'
        description='Deleted reviews cannot be recovered.'
        onClose={handleDialogClose}
        buttons={
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <Button size='full' color='whitegray' onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button size='full' color='red' onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ReviewItem;
