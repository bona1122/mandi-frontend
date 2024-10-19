'use client';
import { Suspense, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import { useMapCourseStore } from '@/stores/map-course';

import CourseMapView from './_components/course-mapview/course-mapview';
import FilteredCourse from './_components/filtered-course/filtered-course';
import ViewSwitchButton from './_components/view-switch-button/view-switch-button';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const Course = () => {
  const [layout, setLayout] = useState<'list' | 'map'>('list');
  const { selectedItem } = useMapCourseStore();
  const router = useRouter();

  const handleLayoutChange = () =>
    setLayout(layout === 'list' ? 'map' : 'list');
  const handleClickSearch = () => router.push('/course/search');

  return (
    <Layout hasTopNav={false} hasTabBar={true}>
      <div className={cx('container')}>
        <div
          className={cx(layout === 'list' ? 'list-searchbox' : 'map-searchbox')}
          onClick={handleClickSearch}
        >
          <Input
            placeholder='Course name, Location or Other.'
            value=''
            leftIcon={<IconSearch width={20} height={20} />}
            rightIcon={<IconXCircle width={20} height={20} />}
            className={cx(layout === 'map' && 'map-searchbox__input')}
            style={{
              pointerEvents: 'none',
            }}
          />
        </div>
        {layout === 'list' ? (
          <div className={cx('list-container')}>
            <Suspense>
              <FilteredCourse />
            </Suspense>
          </div>
        ) : (
          layout === 'map' && <CourseMapView />
        )}
        <ViewSwitchButton
          visible={!(selectedItem !== null && layout === 'map')}
          layout={layout}
          onClick={handleLayoutChange}
          className={cx('layout-switch-button')}
        />
      </div>
    </Layout>
  );
};

export default Course;
