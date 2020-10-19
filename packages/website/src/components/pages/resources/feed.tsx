/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import PageIndicator from 'components/common/layout/page_indicator';

import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import ResourcesCard from './card';

const ResourcesFeed: React.FC = () => {
  const [currPage, setPage] = useState(useMatchesPathPageNumber());

  return (
    <DefaultPageLayout
      pageTitle="Resources"
      contentCss={css`
        ${verticalStackCss.xxl};
        align-items: flex-start;
        justify-content: flex-start;
      `}
    >
      {currPage === 1 && (
        <React.Fragment>
          <div
            css={css`
              ${verticalStackCss.s}
              align-items: flex-start;
            `}
          >
            <H1>Resources</H1>
            <H2
              contentCss={css`
                font-weight: normal;
              `}
            >
              Knowledge is endless.
            </H2>
          </div>
          <img
            src={require('../../../media/images/reading.jpg')}
            alt="banner"
            css={css`
              max-height: 500px;
              object-fit: cover;
              width: 100%;
            `}
          />
        </React.Fragment>
      )}
      {currPage !== 1 && <H1>Resources</H1>}
      <MasonryGrid>
        <ResourcesCard />
        <ResourcesCard />
        <ResourcesCard />
        <ResourcesCard />
      </MasonryGrid>
      <PageIndicator numOfCards={33} currPage={currPage} setPage={setPage} />
    </DefaultPageLayout>
  );
};

export default ResourcesFeed;
