/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Banner from '../../../media/images/frame.jpg';
import PreviewCard from 'components/common/cards/preview';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PageIndicator from 'components/common/layout/page_indicator';

import { H1, H2 } from 'components/common/system';
import { updateResumesFeedPage } from 'context/resumes/actions';

import { fadeInAnim, verticalStackCss } from 'theme';

/**
 * Props for additional social links of profile
 */
export interface ProfileLinksProps {
  platform: string;
  handle: string;
}

/**
 * Props for each profile
 */
export interface ProfileProps {
  name: string;
  slug: string;
  company: string;
  description: string;
  website?: string;
  profileCloudinaryId: string;
  profileLinks?: ProfileLinksProps[];
}

/**
 * Props for each resume
 */
export interface ResumesProps {
  resumeCloudinaryId: string;
  profile: ProfileProps;
}

interface ResumesFeedProps {
  count: number;
  list: ProfileProps[];
}

const ResumesFeed: React.FC = () => {
  const [currPage, setCurrPage] = useState(useMatchesPathPageNumber());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [resumes, setResumes] = useState<ResumesFeedProps>();

  const updatePage = (page: number) => {
    setCurrPage(page);
    updateResumesFeedPage({ page });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [list, resumesInfo] = await Promise.all([
          axios.get(`/api/profiles/resumes/group/${currPage}`),
          axios.get('/api/resumes/count')
        ]);
        setResumes({ list: list.data, count: resumesInfo.data.count });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currPage]);

  return (
    <DefaultPageLayout
      pageTitle="Resumes"
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xxl}
        justify-content: flex-start;
        align-items: flex-start;
        ${fadeInAnim}
      `}
    >
      {currPage === 1 ? (
        <React.Fragment>
          <div
            css={css`
              ${verticalStackCss.s}
              align-items: flex-start;
            `}
          >
            <H1>Resumes</H1>
            <H2
              contentCss={css`
                font-weight: normal;
              `}
            >
              A point of reference.
            </H2>
          </div>
          <img
            src={Banner}
            alt="banner"
            css={css`
              max-height: 500px;
              object-fit: cover;
              width: 100%;
            `}
          />
        </React.Fragment>
      ) : (
        <H1>Resumes</H1>
      )}
      {resumes && (
        <React.Fragment>
          <MasonryGrid>
            {resumes.list.map((resume) => {
              return (
                <PreviewCard
                  key={resume.name}
                  name={resume.name}
                  company={resume.company}
                  description={resume.description}
                  profileCloudinaryId={resume.profileCloudinaryId}
                  slug={resume.slug}
                  path="resumes"
                />
              );
            })}
          </MasonryGrid>
          <PageIndicator
            numOfCards={resumes.count}
            path="resumes"
            currPageIndicator={currPage}
            setCurrPageIndicator={updatePage}
          />
        </React.Fragment>
      )}
    </DefaultPageLayout>
  );
};

export default ResumesFeed;
