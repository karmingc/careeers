/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import PreviewCard from 'components/common/cards/preview';

import { ProfileProps } from '../resumes/feed';
import { useMatchesPathSlugId } from 'components/common/header/nav_helpers';
import { DefaultPageLayout } from 'components/common/layout/default_page';
// import MasonryGrid from 'components/common/layout/masonry';
import PreviousHeader from 'components/common/layout/previous_header';
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
  ${verticalStackCss.m};
  width: 100%;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      /* includes question + answer */
      > div:not(:last-of-type) {
        ${verticalStackCss.m};
        align-items: flex-start;
        width: 100%;
      }
    `
  })}
  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      /* includes question + answer */
      > div:not(:last-of-type) {
        ${verticalStackCss.m};
        align-items: flex-start;
        width: calc(100% * 2 / 3);
      }
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
    margin-top: ${rawSpacing.m}px;
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
  return (
    <section css={STYLES_QUESTION}>
      <div>
        <H2>{title}</H2>
        {text.split('\n').map((str) => {
          return (
            <P
              key={str}
              contentCss={css`
                font-size: ${fontSize.medium}px;
                ${NotoSerif};
              `}
            >
              {str}
            </P>
          );
        })}
      </div>
      <div>
        {links.map((src) => {
          return (
            <A
              key={src.name}
              href={src.link}
              contentCss={css`
                font-size: ${fontSize.medium}px;
                ${NotoSerif};
              `}
            >
              {src.name}
            </A>
          );
        })}
      </div>
      <div css={STYLES_QUESTION_PHOTO}>
        {photos.map((src) => {
          return (
            <img
              key={src.cloudinaryId}
              src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${src.cloudinaryId}`}
              alt="profile"
              css={STYLES_QUESTION_PHOTO}
              data-aos="fade-up"
              data-aos-once="true"
            />
          );
        })}
      </div>

      {children}
    </section>
  );
};

const STYLES_MAIN = css`
  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      ${verticalStackCss.xxxl};
      align-items: flex-start;
      justify-content: flex-start;
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      ${horizontalStackCss.xxxl};
      align-items: flex-start;
      justify-content: flex-start;
    `
  })}
`;

const STYLES_PROFILE = css`
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
  margin: ${rawSpacing.xxxl}px auto;
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
      pageTitle="Resume ID"
      contentCss={css`
        ${verticalStackCss.xl}
        align-items: flex-start;
      `}
    >
      <PreviousHeader previousPage="interviews" />
      {isError && <div>error...</div>}
      {!isLoading && interview && (
        <React.Fragment>
          <section css={STYLES_MAIN}>
            <div css={STYLES_PROFILE}>
              <img
                src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${interview.profile.profileCloudinaryId}`}
                alt="profile"
                css={css`
                  width: 100%;
                  max-height: 400px;
                  object-fit: cover;
                `}
              />
              <div
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
                    font-size: ${fontSize.medium}px;
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
                        font-size: ${fontSize.medium}px;
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
                            font-size: ${fontSize.medium}px;
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
            </div>
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
