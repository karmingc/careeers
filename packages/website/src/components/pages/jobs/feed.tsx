/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Spring, config, animated } from 'react-spring/renderprops';

import ResourcesCard from '../resources/card';
import { ResourcesFeedProps } from '../resources/feed';

import { CloudinaryImg } from 'components/common/cloudinary_img';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import PageIndicator from 'components/common/page_indicator';

import { H1, H2 } from 'components/common/system';
import { rawSpacing, verticalStackCss } from 'theme';

const JobsFeed: React.FC = () => {
  const [currPage, setCurrPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resources, setResources] = useState<ResourcesFeedProps>();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [list, resourcesInfo] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_API_ORIGIN}/api/jobs/group/${currPage}`
          ),
          axios.get(`${process.env.REACT_APP_API_ORIGIN}/api/jobs/count`)
        ]);
        setResources({ list: list.data, count: resourcesInfo.data.count });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currPage]);

  return (
    <DefaultPageLayout
      pageTitle="Jobs"
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xl};
        align-items: flex-start;
        justify-content: flex-start;
      `}
    >
      {currPage === 1 ? (
        <div
          css={css`
            ${verticalStackCss.xl}
            align-items: flex-start;
            overflow: hidden;
          `}
        >
          <Spring
            from={{ opacity: 0, transform: 'translateY(15%)' }}
            to={{ opacity: 1, transform: 'translateY(0%)' }}
            config={config.slow}
          >
            {(springProps) => (
              <React.Fragment>
                <H1 style={springProps}>Jobs</H1>
                <H2
                  style={springProps}
                  contentCss={css`
                    font-weight: normal;
                    margin-top: -${rawSpacing.l}px;
                  `}
                >
                  Experience is the best way to learn.
                </H2>
              </React.Fragment>
            )}
          </Spring>
          <Spring
            native
            from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
            to={{ opacity: 1, transform: 'translate(0%, 0%)' }}
            config={config.slow}
          >
            {(springProps) => (
              <animated.div style={springProps}>
                <CloudinaryImg
                  cloudinaryId="careeers/base/work_hygi2p"
                  alt="Hard work in manufacturing company"
                  contentCss={css`
                    max-height: 500px;
                    object-fit: cover;
                    width: 100%;
                  `}
                />
              </animated.div>
            )}
          </Spring>
        </div>
      ) : (
        <H1>Jobs</H1>
      )}
      {resources ? (
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
            currPageIndicator={currPage}
            setCurrPageIndicator={setCurrPage}
          />
        </React.Fragment>
      ) : null}
    </DefaultPageLayout>
  );
};

export default JobsFeed;
