import classNames from 'classnames/bind';

import { LayoutProps } from '@/types/layout';

import TabBar, { TabBarProps } from '../common/tabbar';
import { TopNavBar, TopNavBarProps } from '../common/top-navbar';

import styles from './layout.module.scss';

const cx = classNames.bind(styles);
const BLOCK = 'layout';

const getTopNavProps = (props: Partial<TopNavBarProps>): TopNavBarProps => ({
  ...props,
});

const getTabBarProps = (props: Partial<TabBarProps>): TabBarProps => ({
  ...props,
});

const getMainClass = (hasTopNav: boolean, hasTabBar: boolean) => {
  if (hasTopNav && !hasTabBar) return `${BLOCK}__top-nav`;
  if (!hasTopNav && hasTabBar) return `${BLOCK}__tabbar`;
  if (hasTopNav && hasTabBar) return `${BLOCK}__both-nav`;
  return '';
};

const getContentClass = (hasTopNav: boolean, hasTabBar: boolean) => {
  if (hasTopNav && !hasTabBar) return `${BLOCK}__content--top-nav`;
  if (!hasTopNav && hasTabBar) return `${BLOCK}__content--tabbar`;
  if (hasTopNav && hasTabBar) return `${BLOCK}__content--both-nav`;
  return '';
};

export const Layout = (props: LayoutProps) => {
  const { hasTopNav, hasTabBar, children, backgroundColor } = props;

  return (
    <main className={cx(BLOCK, getMainClass(hasTopNav, hasTabBar))}>
      {hasTopNav && (
        <TopNavBar
          {...getTopNavProps(props)}
          topNavBarClassName={cx(`${BLOCK}__top-navbar`)}
        />
      )}
      <div
        className={cx(
          `${BLOCK}__content`,
          getContentClass(hasTopNav, hasTabBar),
        )}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        {children}
      </div>
      {hasTabBar && (
        <TabBar {...getTabBarProps(props)} className={cx(`${BLOCK}__tabbar`)} />
      )}
    </main>
  );
};

export default Layout;
