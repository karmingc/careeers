/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spring, config } from 'react-spring/renderprops';

import PreviewCard from 'components/common/cards/preview';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { useMatchesPathPageNumber } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PageIndicator from 'components/common/page_indicator';

import { H1, H2 } from 'components/common/system';
import { updateResumesFeedPage } from 'context/resumes/actions';

import { rawSpacing, verticalStackCss } from 'theme';

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
  const [ref, inView] = useInView({
    threshold: 0.25
  });

  const updatePage = (page: number) => {
    setCurrPage(page);
    updateResumesFeedPage({ page });
  };

  useEffect(() => {
    updateResumesFeedPage({ page: currPage });

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
        ${verticalStackCss.xl}
        justify-content: flex-start;
        align-items: flex-start;
      `}
    >
      {currPage === 1 ? (
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
                <H1 style={springProps}>Resumes</H1>
                <H2
                  style={springProps}
                  contentCss={css`
                    font-weight: normal;
                    margin-top: -${rawSpacing.l}px;
                  `}
                >
                  A point of reference.
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
                cloudinaryId="careeers/base/frame_tsq8wf"
                alt="Humans contemplating the art in a museum"
                contentCss={css`
                  max-height: 500px;
                  object-fit: cover;
                  width: 100%;
                `}
              />
            )}
          </Spring>
        </div>
      ) : (
        <Spring
          from={{ opacity: 0, transform: 'translateY(15%)' }}
          to={inView ? { opacity: 1, transform: 'translateY(0%)' } : {}}
          config={config.slow}
        >
          {(springProps) => (
            <div ref={ref}>
              <H1 style={springProps}>Resumes</H1>
            </div>
          )}
        </Spring>
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
                  margin
                  source="feed"
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
