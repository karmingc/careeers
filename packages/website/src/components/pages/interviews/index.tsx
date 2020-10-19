/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import PreviewCard from 'components/common/cards/preview';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import PreviousHeader from 'components/common/layout/previous_header';
import RelatedContent from 'components/common/layout/related_content';
import { H1, P } from 'components/common/system';
import { A, H2 } from 'components/common/system/typography';
import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  NotoSerif,
  rawSpacing,
  useMatchesMediaSize,
  verticalStackCss
} from 'theme';
import { fontSize } from 'theme/styles/font';
import { prettierUrl } from 'utilities';

interface SectionProps {
  title: string;
  text: string;
  children?: React.ReactNode;
  contentCss?: SerializedStyles;
}

/**
 *
 * @param title question
 * @param text answer
 * @param children possibly images?
 */
export const InterviewSection: React.FC<SectionProps> = ({
  title,
  text,
  children,
  contentCss
}) => {
  return (
    <section
      css={[
        css`
          ${verticalStackCss.m};
          align-items: flex-start;
        `,
        contentCss
      ]}
    >
      <H2>{title}</H2>
      <P
        contentCss={css`
          font-size: ${fontSize.medium}px;
          ${NotoSerif}
        `}
      >
        {text}
      </P>
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
      width: 50%;
    `
  })};
`;

const InterviewPage: React.FC = () => {
  const interviews = [
    {
      name: 'Karming C',
      company: 'Stripe',
      description: 'Interned at Stripe during Summer 2019.',
      img: 'karming.jpg'
    },
    {
      name: 'Cesar',
      company: 'Microsoft',
      description: 'Interned at Stripe during Summer 2019.',
      img: 'cesar.jpg'
    }
  ];

  const links = [
    { name: 'website', url: 'https://www.karmingchin.com' },
    { name: 'twitter', url: 'karmingc' },
    { name: 'github', url: 'karmingc' }
  ];

  const interviewContent = [
    {
      question:
        'What led you to pursue a career in [your field]? What do you enjoy about it?',
      answer:
        "I've always been really into graphics   and visual culture, as far back as I can remember. As a kid, I was really into album artwork and video games and loved messing around with computers. I also became kind of obsessed with the early internet and found pockets of real creativity and experimental work which excited me and gave me the hunger to want to learn to make things myself."
    },
    {
      question: 'What is a constant challenge you face?',
      answer: 'no idea'
    },
    {
      question: 'Where do you get inspired?',
      answer: 'no idea'
    },
    {
      question: 'What does a typical day look like?',
      answer: 'no idea'
    },
    {
      question:
        'What products or resources are you particularly fond of or find helpful?',
      answer: 'no idea'
    },
    {
      question: 'What is the best advice you’ve ever received?',
      answer: 'no idea'
    },
    {
      question: 'What do you like to do in your spare time?',
      answer: 'no idea'
    },
    {
      question: 'Any advice for people aiming for a career in [your field]?',
      answer: 'no idea'
    },
    {
      question: 'Anything you want to promote or plug?',
      answer: 'no idea'
    }
  ];

  const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });
  return (
    <DefaultPageLayout
      pageTitle="Resume ID"
      contentCss={css`
        ${verticalStackCss.xl}
        align-items: flex-start;
      `}
    >
      <PreviousHeader previousPage="interviews" />
      <section css={STYLES_MAIN}>
        <div css={STYLES_PROFILE}>
          <img
            src={require('../../../media/images/karming.jpg')}
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
            <H1>Karming Chin - Stripe</H1>
            <P
              contentCss={css`
                margin-top: -${rawSpacing.s}px;
                font-size: ${fontSize.medium}px;
              `}
            >
              Interned at Stripe during Summer 2019.Interned at Stripe during
              Summer 2019.
            </P>
            <div
              css={css`
                ${verticalStackCss.s};
                align-items: flex-start;
              `}
            >
              {links.map((link) => {
                const { name, url } = link;
                if (name === 'website') {
                  return (
                    <A
                      href={url}
                      contentCss={css`
                        font-size: ${fontSize.medium}px;
                      `}
                    >
                      {prettierUrl(url)}
                    </A>
                  );
                }
                return (
                  <span>
                    {name.charAt(0).toUpperCase() + name.slice(1)} {''}
                    <A
                      href={url}
                      contentCss={css`
                        font-size: ${fontSize.medium}px;
                      `}
                    >
                      @{url}
                    </A>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <article css={STYLES_ARTICLE}>
        {interviewContent.map((block) => {
          const { question, answer } = block;
          return (
            <InterviewSection key={question} title={question} text={answer} />
          );
        })}
      </article>
      <RelatedContent pageTitle="Interviews">
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
      </RelatedContent>
    </DefaultPageLayout>
  );
};
export default InterviewPage;
