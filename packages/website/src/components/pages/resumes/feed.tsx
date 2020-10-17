/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import PreviewCard from 'components/common/cards/preview';
import CardGridLayout from 'components/common/layout/card_grid';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

const ResumesFeed: React.FC = () => {
  const resumes = [
    {
      name: 'K',
      company: 'Stripe',
      description: 'Interned at Stripe during Summer 2019.',
      img: 'karming_pdf.png'
    },
    {
      name: 'Kar',
      company: 'Microsoft',
      description: 'Interned at Stripe during Summer 2019.',
      img: 'karming_pdf.png'
    },
    {
      name: 'Karming',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.',
      img: 'karming_pdf.png'
    }
  ];

  return (
    <DefaultPageLayout
      pageTitle="Home"
      contentCss={css`
        ${verticalStackCss.xxl}
        align-items: flex-start;

        div:first-of-type {
          ${verticalStackCss.s}
          align-items: flex-start;
        }
      `}
    >
      <div>
        <H1 contentCss={css``}>Resumes</H1>
        <H2
          contentCss={css`
            font-weight: normal;
          `}
        >
          A point of reference.
        </H2>
      </div>
      <img
        src={require('../../../media/images/frame.jpg')}
        alt="banner"
        css={css`
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        `}
      />

      <CardGridLayout>
        {resumes.map((resume) => {
          return (
            <PreviewCard key={resume.name} resume={resume} type="resume" />
          );
        })}
      </CardGridLayout>
    </DefaultPageLayout>
  );
};

export default ResumesFeed;
