/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Reading from '../../../media/images/reading.jpg';
import ResourcesCard from './card';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import NotFoundPage from 'components/common/layout/not_found';
import PageIndicator from 'components/common/layout/page_indicator';

import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

export interface ResourcesProps {
  name: string;
  description: string;
  link: string;
  cloudinaryId: string;
}

interface ResourcesFeedProps {
  count: number;
  list: ResourcesProps[];
}

const ResourcesFeed: React.FC = () => {
  const [currPage, setPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [resources, setResources] = useState<ResourcesFeedProps>();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [list, resourcesInfo] = await Promise.all([
          axios.get(`/api/resources/group/${currPage}`),
          axios.get('/api/resources/count')
        ]);
        setResources({ list: list.data, count: resourcesInfo.data.count });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currPage]);

  if (isError) {
    return <NotFoundPage />;
  }

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
            src={Reading}
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
      {!isLoading && resources && (
        <React.Fragment>
          <MasonryGrid>
            {resources.list.map((resource) => {
              return (
                <ResourcesCard
                  key={resource.name}
                  name={resource.name}
                  description={resource.description}
                  link={resource.link}
                  cloudinaryId={resource.cloudinaryId}
                />
              );
            })}
          </MasonryGrid>
          <PageIndicator
            numOfCards={resources.count}
            path="resources"
            currPage={currPage}
            setPage={setPage}
          />
        </React.Fragment>
      )}
    </DefaultPageLayout>
  );
};

export default ResourcesFeed;
