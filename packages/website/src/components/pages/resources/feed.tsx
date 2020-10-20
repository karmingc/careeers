/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ResourcesCard from './card';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import PageIndicator from 'components/common/layout/page_indicator';

import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

const ResourcesFeed: React.FC = () => {
  const [currPage, setPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setLoading] = useState(true);
  const [resources, setResources] = useState([
    {
      cloudinaryId: '',
      createdAt: '',
      description: '',
      id: '',
      link: '',
      name: '',
      updatedAt: ''
    }
  ]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:8080/api/resources')
        .then((response) => {
          setResources(response.data);
          console.log(response.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [isLoading]);

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
        {resources.map((resource) => {
          return <ResourcesCard key={resource.id} resource={resource} />;
        })}
      </MasonryGrid>
      <PageIndicator numOfCards={33} currPage={currPage} setPage={setPage} />
    </DefaultPageLayout>
  );
};

export default ResourcesFeed;
