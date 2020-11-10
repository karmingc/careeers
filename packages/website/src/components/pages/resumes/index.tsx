/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { ProfileProps, ResumesProps } from './feed';
import PreviewCard from 'components/common/cards/preview';
import { useMatchesPathSlugId } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PreviousHeader from 'components/common/layout/previous_header';
import RelatedContent from 'components/common/layout/related_content';
import { H1, P, A } from 'components/common/system';

import { ResumesContext } from 'context/resumes';
import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  rawSpacing,
  theme,
  useMatchesMediaSize,
  verticalStackCss
} from 'theme';
import { fontSize } from 'theme/styles/font';
import { prettierUrl, socialUrl } from 'utilities';

const STYLES_MAIN = css`
  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      ${verticalStackCss.xl};
      align-items: flex-start;
      justify-content: flex-start;
    `
  })}
  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      ${horizontalStackCss.xl};
      align-items: flex-start;
      justify-content: flex-start;
    `
  })}
`;

const STYLES_PROFILE = css`
  ${verticalStackCss.xl}
  align-items: flex-start;
  justify-content: flex-start;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: calc(30% - ${rawSpacing.m}px);
    `
  })}
`;

const STYLES_RESUME = css`
  img {
    width: 100%;
    border: 1px solid ${theme.activeGrey};
  }

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
    `
  })}
  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: calc(70% - ${rawSpacing.m}px);
    `
  })}
`;

const ResumePage: React.FC = () => {
  const [resume, setResume] = useState<ResumesProps>();
  const [relatedResumes, setRelatedResumes] = useState<ProfileProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const slug = useMatchesPathSlugId();
  const resumesState = useContext(ResumesContext);

  const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`/api/resumes/${slug}`);
        const relatedResult = await axios(
          `/api/profiles/resumes/related/${slug}`
        );
        setResume(result.data);
        setRelatedResumes(relatedResult.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  return (
    <DefaultPageLayout
      pageTitle="Resume ID"
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xl}
        align-items: flex-start;
      `}
    >
      {resume && (
        <React.Fragment>
          <PreviousHeader path="resumes" pageIndex={resumesState.page} />
          <section css={STYLES_MAIN}>
            <div css={STYLES_PROFILE}>
              <img
                src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${resume.profile.profileCloudinaryId}`}
                alt="profile"
                css={css`
                  width: 100%;
                  max-height: 400px;
                  object-fit: cover;
                `}
              />
              <H1>
                {resume.profile.name} - {resume.profile.company}
              </H1>
              <P
                contentCss={css`
                  font-size: ${fontSize.medium}em;
                  margin-top: -${rawSpacing.s}px;
                `}
              >
                {resume.profile.description}
              </P>
              <div
                css={css`
                  ${verticalStackCss.s};
                  align-items: flex-start;
                `}
              >
                {resume.profile.website && (
                  <A
                    href={resume.profile.website}
                    contentCss={css`
                      font-size: ${fontSize.medium}em;
                    `}
                  >
                    {prettierUrl(resume.profile.website)}
                  </A>
                )}
                {resume.profile.profileLinks &&
                  resume.profile.profileLinks.map((link) => {
                    const { platform, handle } = link;
                    return (
                      <span
                        key={`${platform}-${handle}`}
                        css={css`
                          font-size: ${fontSize.medium}em;
                        `}
                      >
                        {platform.charAt(0).toLowerCase() + platform.slice(1)}{' '}
                        <A
                          href={socialUrl({
                            platform,
                            handle
                          })}
                        >
                          @{handle}
                        </A>
                      </span>
                    );
                  })}
              </div>
            </div>
            <div css={STYLES_RESUME}>
              <img
                src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${resume.resumeCloudinaryId}`}
                alt="resume"
              />
            </div>
          </section>
          {relatedResumes && (
            <RelatedContent pageTitle="Resumes">
              <MasonryGrid>
                {relatedResumes
                  .slice(0, isDesktop ? 4 : 2)
                  .map((relatedResume) => {
                    return (
                      <PreviewCard
                        key={relatedResume.name}
                        name={relatedResume.name}
                        company={relatedResume.company}
                        description={relatedResume.description}
                        profileCloudinaryId={relatedResume.profileCloudinaryId}
                        slug={relatedResume.slug}
                        path="resumes"
                        margin
                      />
                    );
                  })}
              </MasonryGrid>
            </RelatedContent>
          )}
        </React.Fragment>
      )}{' '}
    </DefaultPageLayout>
  );
};
export default ResumePage;
