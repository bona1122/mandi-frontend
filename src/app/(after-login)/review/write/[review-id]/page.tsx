'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';

import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Layout from '@/components/layout';
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
  const { setValue, watch, control, getValues, handleSubmit } =
    useForm<ReviewFormData>({
      defaultValues: {
        score: null,
        images: [],
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
    console.log(data);
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
