/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spring, config } from 'react-spring/renderprops';

// import PreviewCard from 'components/common/cards/preview';

import { ProfileProps } from '../resumes/feed';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { useMatchesPathSlugId } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
// import MasonryGrid from 'components/common/layout/masonry';
import PreviousLink from 'components/common/previous_link';
// import RelatedContent from 'components/common/layout/related_content';
import { H1, P, A, H2 } from 'components/common/system';

import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  NotoSerif,
  rawSpacing,
  // useMatchesMediaSize,
  verticalStackCss
} from 'theme';
import { fontSize } from 'theme/styles/font';
import { prettierUrl, socialUrl } from 'utilities';

interface QuestionPhotoProps {
  cloudinaryId: string;
}

interface QuestionLinkProps {
  name: string;
  link: string;
}

interface InterviewQuestionProps {
  title: string;
  text: string;
  photos: QuestionPhotoProps[];
  links: QuestionLinkProps[];
  children?: React.ReactNode;
  contentCss?: SerializedStyles;
}

const STYLES_QUESTION = css`
  ${verticalStackCss.l};
  width: 100%;
`;

const STYLES_QUESTION_DIV = css`
  > p:first-of-type {
    margin-top: -${rawSpacing.s}px;
  }
  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      /* includes question + answer */
      ${verticalStackCss.l};
      align-items: flex-start;
      width: 100%;
    `
  })}
  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      /* includes question + answer */
      ${verticalStackCss.l};
      align-items: flex-start;
      width: calc(100% * 2 / 3);
    `
  })};
`;

const STYLES_QUESTION_PHOTO = css`
  ${horizontalStackCss.m}
  flex-wrap: wrap;

  > img:nth-of-type(2n) {
    margin-right: 0px;
  }

  > img {
    width: calc(50% - ${rawSpacing.s}px);
    margin-bottom: ${rawSpacing.m}px;
    object-fit: cover;
  }
`;

/**
 *
 * @param title question
 * @param text answer
 * @param children possibly images?
 */
export const InterviewQuestion: React.FC<InterviewQuestionProps> = ({
  title,
  text,
  photos,
  links,
  children
}) => {
  const [ref, inView] = useInView({
    threshold: 0.25
  });

  return (
    <section css={STYLES_QUESTION}>
      <div css={STYLES_QUESTION_DIV}>
        <H2>{title}</H2>
        {text.split('\n').map((str) => {
          return (
            <P
              key={str}
              contentCss={css`
                font-size: ${fontSize.medium}em;
                ${NotoSerif};
              `}
            >
              {str}
            </P>
          );
        })}
      </div>
      {links.length > 0 ? (
        <div css={STYLES_QUESTION_DIV}>
          {links.map((src) => {
            return (
              <A
                key={src.name}
                href={src.link}
                contentCss={css`
                  font-size: ${fontSize.medium}em;
                  ${NotoSerif};
                `}
              >
                {src.name}
              </A>
            );
          })}
        </div>
      ) : null}
      {photos.length > 0 ? (
        <div ref={ref} css={STYLES_QUESTION_PHOTO}>
          {photos.map((src) => {
            const { cloudinaryId } = src;
            return (
              <Spring
                from={{ opacity: 0, transform: 'translateY(15%)' }}
                to={inView ? { opacity: 1, transform: 'translateY(0%)' } : {}}
                config={config.slow}
                key={cloudinaryId}
              >
                {(springProps) => (
                  <CloudinaryImg
                    style={springProps}
                    cloudinaryId={cloudinaryId}
                    alt="photo for question"
                    css={STYLES_QUESTION_PHOTO}
                  />
                )}
              </Spring>
            );
          })}
        </div>
      ) : null}
      {children}
    </section>
  );
};

const STYLES_PROFILE = css`
  overflow: hidden;
  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      ${verticalStackCss.xl};
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      ${horizontalStackCss.xl};
      width: 100%;
    `
  })}
`;

const STYLES_ARTICLE = css`
  ${verticalStackCss.xxxl};
  margin: ${rawSpacing.xl}px auto;
  align-items: flex-start;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
    `
  })}
  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: 75%;
    `
  })};
`;

interface QuestionProps {
  order: number;
  question: string;
  answer: string;
  photos: QuestionPhotoProps[];
  links: QuestionLinkProps[];
}

interface InterviewProps {
  profile: ProfileProps;
  questions: QuestionProps[];
}

const InterviewPage: React.FC = () => {
  const [interview, setInterview] = useState<InterviewProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const slug = useMatchesPathSlugId();
  const [ref, inView] = useInView({
    threshold: 0.25
  });
  // const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(`/api/interviews/${slug}`);

        setInterview(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  return (
    <DefaultPageLayout
      pageTitle={`${interview && interview.profile.name}`}
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xl}
        align-items: flex-start;
      `}
    >
      <PreviousLink path="interviews" pageIndex={1} />
      {interview && (
        <React.Fragment>
          <section ref={ref} css={STYLES_PROFILE}>
            <Spring
              from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
              to={inView ? { opacity: 1, transform: 'translate(0%, 0%)' } : {}}
              config={config.slow}
            >
              {(springProps) => (
                <CloudinaryImg
                  style={springProps}
                  alt={`${interview.profile.name}'s profile image`}
                  cloudinaryId={interview.profile.profileCloudinaryId}
                  contentCss={css`
                    width: 100%;
                    max-height: 400px;
                    object-fit: cover;
                  `}
                />
              )}
            </Spring>
            <Spring
              from={{ opacity: 0, transform: 'translateY(15%)' }}
              to={inView ? { opacity: 1, transform: 'translateY(0%)' } : {}}
              config={config.slow}
            >
              {(springProps) => (
                <div
                  style={springProps}
                  css={css`
                    ${verticalStackCss.xl};
                    align-items: flex-start;
                  `}
                >
                  <H1>
                    {interview.profile.name} - {interview.profile.company}
                  </H1>
                  <P
                    contentCss={css`
                      margin-top: -${rawSpacing.s}px;
                      font-size: ${fontSize.medium}em;
                    `}
                  >
                    {interview.profile.description}
                  </P>
                  <div
                    css={css`
                      ${verticalStackCss.s};
                      align-items: flex-start;
                    `}
                  >
                    {interview.profile.website && (
                      <A
                        href={interview.profile.website}
                        contentCss={css`
                          font-size: ${fontSize.medium}em;
                        `}
                      >
                        {prettierUrl(interview.profile.website)}
                      </A>
                    )}
                    {interview.profile.profileLinks &&
                      interview.profile.profileLinks.map((link) => {
                        const { platform, handle } = link;
                        return (
                          <span
                            key={platform}
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
                </div>
              )}
            </Spring>
          </section>

          <article css={STYLES_ARTICLE}>
            {interview.questions.map((block) => {
              const { question, answer, photos, links } = block;
              return (
                <InterviewQuestion
                  key={question}
                  title={question}
                  text={answer}
                  photos={photos}
                  links={links}
                />
              );
            })}
          </article>
        </React.Fragment>
      )}

      {/* <RelatedContent pageTitle="Interviews">
        <MasonryGrid>
          {interviews.slice(0, isDesktop ? 4 : 2).map((interview) => {
            return (
              <PreviewCard
                key={interview.name}
                resume={interview}
                type="interview"
              />
            );
          })}
        </MasonryGrid>
      </RelatedContent> */}
    </DefaultPageLayout>
  );
};
export default InterviewPage;
