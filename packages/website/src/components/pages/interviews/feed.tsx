/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Idea from '../../../media/images/idea.jpg';
import { ProfileProps } from '../resumes/feed';
import PreviewCard from 'components/common/cards/preview';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PageIndicator from 'components/common/layout/page_indicator';
import { H1, H2 } from 'components/common/system';
import { fadeInAnim, verticalStackCss } from 'theme';

interface InterviewsFeedProps {
  count: number;
  list: ProfileProps[];
}

const InterviewsFeed: React.FC = () => {
  const [currPage, setCurrPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [interviews, setInterviews] = useState<InterviewsFeedProps>();

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
        ${fadeInAnim}
      `}
    >
      <div
        css={css`
          ${verticalStackCss.s}
          align-items: flex-start;
        `}
      >
        <H1>Interviews</H1>
        <H2
          contentCss={css`
            font-weight: normal;
          `}
        >
          Be Inspired. To Inspire.
        </H2>
      </div>
      <img
        src={Idea}
        alt="banner"
        css={css`
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        `}
      />
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
