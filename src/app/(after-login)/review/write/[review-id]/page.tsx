'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Layout from '@/components/layout';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useReviewMutation } from '@/queries/courseReviewQuery';
import { ReviewFormData } from '@/types/form';

import DetailSection from './_components/detail-section/detail-section';
import ScoreSection from './_components/score-section/score-section';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const ReviewWrite = ({
  params: { 'review-id': reviewId },
}: {
  params: { 'review-id': string };
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { createSnackbar } = useSnackbar();
  const { setValue, watch, control, getValues, handleSubmit } =
    useForm<ReviewFormData>({
      defaultValues: {
        score: null,
        images: [],
      },
    });
  const { mutate } = useReviewMutation({
    onSuccess: async () => {
      createSnackbar({
        type: 'check',
        content: 'The review has been posted.',
      });
      router.push('/my-info/course-review');
    },
    onError: error => {
      if (error.status === 404) {
        router.push('/my-info/course-review');
      }
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const handleCancelClick = () => handleDialogClose();
  const handleCompleteClick = () => setDialogOpen(true);
  const handleChangeScore = (score: 1 | 2 | 3 | 4 | 5) =>
    setValue('score', score);

  const currentScore = watch('score');
  const isFormValid = getValues().score !== null;

  const onSubmit = (data: ReviewFormData) => {
    // console.log(data);
    if (data.score === null) return;
    // base64EncodedImageList에서 접두사를 제거
    const base64EncodedImageList = data.images.map(image => {
      // 접두사 제거
      const base64String = image.split(',')[1]; // ','로 나누어 두 번째 부분을 가져옴
      return base64String;
    });

    mutate({
      score: data.score,
      base64EncodedImageList: base64EncodedImageList,
      completedCourseId: Number(reviewId),
      content: data.text,
    });
  };
  const handlePostClick = () => handleSubmit(onSubmit)();

  return (
    <Layout hasTabBar={false} hasTopNav={true} back={true}>
      <form className={cx('page')}>
        <div className={cx('contents')}>
          <ScoreSection score={currentScore} onChange={handleChangeScore} />
          <DetailSection control={control} />
        </div>
        <div className={cx('bottom-area')}>
          <Button
            color='green'
            size='full'
            onClick={handleCompleteClick}
            disabled={!isFormValid}
          >
            Complete
          </Button>
        </div>
      </form>
      <Dialog
        isOpen={dialogOpen}
        title='Would you like to post your review?'
        onClose={handleDialogClose}
        buttons={
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <Button size='full' color='whitegray' onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button size='full' color='green' onClick={handlePostClick}>
              Post
            </Button>
          </div>
        }
      />
    </Layout>
  );
};

export default ReviewWrite;
