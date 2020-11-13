/** @jsx jsx */
import { jsx } from '@emotion/core';
import loadable from '@loadable/component';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useGaPageTracking } from './ga_tracking';

import Footer from 'components/common/footer';
import Header from 'components/common/header';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import ScrollToTop from 'components/common/system/scroll_to_top';

const lazyLoadingFallback = {
  fallback: <DefaultPageLayout pageTitle="loading" isLoading />
};

const NotFoundPage = loadable(
  () => import('components/common/not_found'),
  lazyLoadingFallback
);

export enum RouteName {
  HOME = '/',
  RESUMES_FEED = '/resumes',
  RESUMES_FEED_PAGE = '/resumes/page/:id',
  RESUME_ID = '/resumes/:id',
  INTERVIEWS_FEED = '/interviews',
  INTERVIEWS_FEED_PAGE = '/interviews/page/:id',
  INTERVIEWS_ID = '/interviews/:id',
  RESOURCES_FEED = '/resources',
  RESOURCES_FEED_PAGE = '/resources/page/:id',
  PRIVACY = '/privacy'
}

const clientRoutes = {
  [RouteName.HOME]: {
    lazyComponent: loadable(() => import('components/pages/home'))
  },
  [RouteName.INTERVIEWS_FEED]: {
    lazyComponent: loadable(() => import('components/pages/interviews/feed'))
  },
  [RouteName.INTERVIEWS_FEED_PAGE]: {
    lazyComponent: loadable(() => import('components/pages/interviews/feed'))
  },
  [RouteName.INTERVIEWS_ID]: {
    lazyComponent: loadable(() => import('components/pages/interviews'))
  },
  [RouteName.RESUMES_FEED]: {
    lazyComponent: loadable(() => import('components/pages/resumes/feed'))
  },
  [RouteName.RESUMES_FEED_PAGE]: {
    lazyComponent: loadable(() => import('components/pages/resumes/feed'))
  },
  [RouteName.RESUME_ID]: {
    lazyComponent: loadable(() => import('components/pages/resumes'))
  },
  [RouteName.RESOURCES_FEED]: {
    lazyComponent: loadable(() => import('components/pages/resources/feed'))
  },
  [RouteName.RESOURCES_FEED_PAGE]: {
    lazyComponent: loadable(() => import('components/pages/resources/feed'))
  },
  [RouteName.PRIVACY]: {
    lazyComponent: loadable(() => import('components/pages/privacy'))
  }
};

const createRoutes = () => {
  return Object.entries(clientRoutes).map(([path, route]) => (
    <Route
      key={path}
      exact
      path={path}
      component={() => {
        return <route.lazyComponent fallback={lazyLoadingFallback.fallback} />;
      }}
    />
  ));
};

export const Routes: React.FC = () => {
  useGaPageTracking();

  return (
    <React.Fragment>
      <ScrollToTop />
      <Header />
      <Switch>
        {createRoutes()}
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};
