/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PreviewCard from 'components/common/cards/preview';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import PreviousHeader from 'components/common/layout/previous_header';
import RelatedContent from 'components/common/layout/related_content';
import { H1, P } from 'components/common/system';
import { A } from 'components/common/system/typography';

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
  ${verticalStackCss.xl}
  align-items: flex-start;
  justify-content: flex-start;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
      /* img {
        width: calc(100% + ${rawSpacing.xxxl}px);
        transform: translate(-${rawSpacing.l}px);
      } */
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: 30%;
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
      width: 70%;
    `
  })}
`;

const ResumePage: React.FC = () => {
  const resumes = [
    {
      name: 'K',
      company: 'Stripe',
      description: 'Interned at Stripe during Summer 2019.',
      img: 'karming_pdf.png'
    }
  ];

  const links = [
    { name: 'website', url: 'https://www.karmingchin.com' },
    { name: 'twitter', url: 'karmingc' },
    { name: 'github', url: 'karmingc' }
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
      <PreviousHeader previousPage="resumes" />
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
          <H1>Karming Chin - Stripe</H1>
          <P
            contentCss={css`
              font-size: ${fontSize.medium}px;
              margin-top: -${rawSpacing.s}px;
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
                    {url.replace(/^https?:\/\/(www.)?/, '')}
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
        <div css={STYLES_RESUME}>
          <img
            src={require('../../../media/images/karming_pdf.png')}
            alt="resume"
          />
        </div>
      </section>
      <RelatedContent pageTitle="Resumes">
        <MasonryGrid>
          {resumes.slice(0, isDesktop ? 4 : 2).map((resume) => {
            return (
              <PreviewCard key={resume.name} resume={resume} type="resume" />
            );
          })}
        </MasonryGrid>
      </RelatedContent>
    </DefaultPageLayout>
  );
};
export default ResumePage;
