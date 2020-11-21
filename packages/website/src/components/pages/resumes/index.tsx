/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { Spring, config, animated } from 'react-spring/renderprops';

import { ProfileProps, ResumesProps } from './feed';
import PreviewCard from 'components/common/cards/preview';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { useMatchesPathSlugId } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';

import PreviousLink from 'components/common/previous_link';
import RelatedContent from 'components/common/related_content';
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
  overflow: hidden;
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
  })};
`;

const STYLES_PROFILE = css`
  ${verticalStackCss.xl}
  align-items: flex-start;
  justify-content: flex-start;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
      > div {
        width: 100%;
      }
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: calc(30% - ${rawSpacing.m}px);
    `
  })}
`;

const STYLES_RESUME = ({ isLoading }: { isLoading: boolean }) => css`
  img {
    width: 100%;
    border: ${isLoading ? '' : `1px solid ${theme.activeGrey}`};
    box-sizing: border-box;
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
        const result = await axios(
          `${process.env.REACT_APP_API_ORIGIN}/api/resumes/${slug}`
        );
        const relatedResult = await axios(
          `${process.env.REACT_APP_API_ORIGIN}/api/profiles/resumes/related/${slug}`
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
      pageTitle={`${resume && resume.profile.name}`}
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xl}
        align-items: flex-start;
      `}
    >
      {resume && (
        <React.Fragment>
          <PreviousLink path="resumes" pageIndex={resumesState.page} />
          <section css={STYLES_MAIN}>
            <div css={STYLES_PROFILE}>
              <Spring
                native
                from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
                to={{ opacity: 1, transform: 'translate(0%, 0%)' }}
                config={config.slow}
              >
                {(springProps) => (
                  <animated.div style={springProps}>
                    <CloudinaryImg
                      cloudinaryId={resume.profile.profileCloudinaryId}
                      alt={`${resume.profile.name}'s profile image`}
                      contentCss={css`
                        width: 100%;
                        max-height: 500px;
                        object-fit: cover;
                      `}
                    />
                  </animated.div>
                )}
              </Spring>
              <Spring
                native
                from={{ opacity: 0, transform: 'translateY(15%)' }}
                to={{ opacity: 1, transform: 'translateY(0%)' }}
                config={config.slow}
              >
                {(springProps) => (
                  <animated.div
                    style={springProps}
                    css={css`
                      ${verticalStackCss.xl}
                      align-items: flex-start;
                      justify-content: flex-start;
                    `}
                  >
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
                              {platform.charAt(0).toLowerCase() +
                                platform.slice(1)}{' '}
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
                  </animated.div>
                )}
              </Spring>
            </div>
            <Spring
              native
              from={{ opacity: 0, transform: 'translateY(15%)' }}
              to={{ opacity: 1, transform: 'translateY(0%)' }}
              config={config.slow}
            >
              {(springProps) => (
                <animated.div
                  style={springProps}
                  css={STYLES_RESUME({ isLoading })}
                >
                  <CloudinaryImg
                    cloudinaryId={resume.resumeCloudinaryId}
                    alt={`${resume.profile.name}'s resume`}
                  />
                </animated.div>
              )}
            </Spring>
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
                        source="related"
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
