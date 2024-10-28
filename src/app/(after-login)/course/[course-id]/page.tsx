'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import BookmarkIconStroke from '@/assets/icon/icon-bookmark-Stroke.svg';
// import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import { TopNavBar } from '@/components/common/top-navbar';
import Layout from '@/components/layout';
import { useCourseStart } from '@/hooks/useCourseStart';
import { useCourseDetailQuery } from '@/queries/courseQuery';

import CourseDisplayOnMap from '../_components/course-display-on-map/course-display-on-map';
import { MapProvider } from '../map-provider';

import CoursePoints from './_components/course-points/course-points';
import DetailInfo from './_components/detail-info/detail-info';
import ReviewList from './_components/review-list/review-list';
import ReviewOverview from './_components/review-overview/review-overview';
import styles from './page.module.scss';
import { useCourseReviewsQuery } from '@/queries/courseReviewQuery';

const cx = classNames.bind(styles);

const CourseDetailPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
  const { data, status, error } = useCourseDetailQuery({
    courseId: Number(courseId),
  });
  const { loading, handleClickStart } = useCourseStart(Number(courseId));
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: reviewData, status: reviewDataStatus } = useCourseReviewsQuery({
    courseId: Number(courseId),
  });

  const handleBookmarkClick = () => {
    setBookmarked(prev => !prev);
  };
  const handleMoreRewiewsButtonClick = () =>
    router.push(`/course/${courseId}/reviews`);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const isScrolled = containerRef.current.scrollTop > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }
  }, [scrolled]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && status === 'success') {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [status, handleScroll]);

  useEffect(() => {
    if (status === 'error' && error.status === 404) {
      router.push('/'); // 홈으로 리다이렉트
    }
  }, [status, error, router]);

  return (
    <Layout
      hasTopNav={false}
      hasTabBar={false}
      // back={true}
      // topNavBarClassName={cx('navbar', {
      //   'navbar--not-scrolled': !scrolled,
      // })}
    >
      <TopNavBar
        back={true}
        topNavBarClassName={cx('navbar', {
          'navbar--not-scrolled': !scrolled,
        })}
      />
      {status === 'success' && (
        <div className={cx('container')} ref={containerRef}>
          <div className={cx('representative-image')}>
            <Image
              src={data.response.imgUrl}
              alt={data.response.courseName}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className={cx('overview-section')}>
            <h1 className={cx('course-name')}>{data.response.courseName}</h1>
            <div className={cx('course-details')}>
              <DetailInfo
                type='difficulty'
                content={data.response.difficulty}
              />
              <DetailInfo type='duration' content={data.response.duration} />
              <DetailInfo
                type='distance'
                content={`${data.response.distance}km`}
              />
              <DetailInfo
                type='points'
                content={{
                  startPoint: data.response.startPoint.name,
                  endPoint: data.response.endPoint.name,
                }}
              />
            </div>
          </div>
          <Divider />
          <div className={cx('location-section')}>
            <h3 className={cx('section-title')}>Course Location</h3>
            <CoursePoints
              type='start'
              address={data.response.startPoint.address}
            />
            <CoursePoints type='end' address={data.response.endPoint.address} />
            <div className={cx('course-image')}>
              <MapProvider>
                <GoogleMap
                  mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  center={{
                    lat: data.response.startPoint.coordinate.latitude,
                    lng: data.response.startPoint.coordinate.longitude,
                  }}
                  zoom={13}
                  options={{
                    disableDefaultUI: true,
                    clickableIcons: false,
                    gestureHandling: 'greedy',
                  }}
                >
                  <CourseDisplayOnMap
                    course={data.response as any}
                    visibleMidPoint={false}
                  />
                </GoogleMap>
              </MapProvider>
            </div>
            <Button color='green' size='full' onClick={handleClickStart}>
              {loading ? 'Loading...' : 'Start Course'}
            </Button>
          </div>
          <div style={{ height: '20px' }} />
          <Divider />
          {reviewDataStatus === 'success' && (
            <>
              <div className={cx('review-overview-section')}>
                <ReviewOverview
                  summary={reviewData.pages[0].response.reviewSummary}
                />
              </div>
              <div className={cx('review-list-section')}>
                <ReviewList
                  maxCount={2}
                  hasFilter={false}
                  reviews={reviewData.pages[0].response.reviews}
                />
                <Button
                  color='white'
                  size='small'
                  onClick={handleMoreRewiewsButtonClick}
                >
                  more reviews
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CourseDetailPage;
