/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spring, config } from 'react-spring/renderprops';

import { ProfileProps } from '../resumes/feed';
import PreviewCard from 'components/common/cards/preview';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PageIndicator from 'components/common/page_indicator';
import { H1, H2 } from 'components/common/system';
import { rawSpacing, verticalStackCss } from 'theme';

interface InterviewsFeedProps {
  count: number;
  list: ProfileProps[];
}

const InterviewsFeed: React.FC = () => {
  const [currPage, setCurrPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [interviews, setInterviews] = useState<InterviewsFeedProps>();
  const [ref, inView] = useInView({
    threshold: 0.25
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [list, interviewsInfo] = await Promise.all([
          axios.get(`/api/profiles/interviews/group/${currPage}`),
          axios.get('/api/interviews/count')
        ]);
        setInterviews({ list: list.data, count: interviewsInfo.data.count });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currPage]);

  return (
    <DefaultPageLayout
      pageTitle="Interviews"
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xl}
        justify-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
      `}
    >
      <div
        ref={ref}
        css={css`
          ${verticalStackCss.xl}
          align-items: flex-start;
          overflow: hidden;
        `}
      >
        <Spring
          from={{ opacity: 0, transform: 'translateY(15%)' }}
          to={inView ? { opacity: 1, transform: 'translateY(0%)' } : {}}
          config={config.slow}
        >
          {(springProps) => (
            <React.Fragment>
              <H1 style={springProps}>Interviews</H1>
              <H2
                style={springProps}
                contentCss={css`
                  font-weight: normal;
                  margin-top: -${rawSpacing.l}px;
                `}
              >
                Be Inspired. To Inspire.
              </H2>
            </React.Fragment>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
          to={inView ? { opacity: 1, transform: 'translate(0%, 0%)' } : {}}
          config={config.slow}
        >
          {(springProps) => (
            <CloudinaryImg
              style={springProps}
              cloudinaryId="careeers/base/idea_odayya"
              alt="Steps with inspiring idea quote"
              contentCss={css`
                max-height: 500px;
                object-fit: cover;
                width: 100%;
              `}
            />
          )}
        </Spring>
      </div>
      {interviews && (
        <React.Fragment>
          <MasonryGrid>
            {interviews.list.map((interview) => {
              return (
                <PreviewCard
                  key={interview.name}
                  name={interview.name}
                  company={interview.company}
                  description={interview.description}
                  profileCloudinaryId={interview.profileCloudinaryId}
                  slug={interview.slug}
                  path="interviews"
                  margin
                  source="feed"
                />
              );
            })}
          </MasonryGrid>
          <PageIndicator
            numOfCards={interviews.count}
            path="interviews"
            currPageIndicator={currPage}
            setCurrPageIndicator={setCurrPage}
          />
        </React.Fragment>
      )}
    </DefaultPageLayout>
  );
};

export default InterviewsFeed;
