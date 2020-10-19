/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PreviewCard from 'components/common/cards/preview';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import MasonryGrid from 'components/common/layout/masonry';
import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

const InterviewsFeed: React.FC = () => {
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
    },
    {
      name: 'Aiony',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.',
      img: 'aiony.jpg'
    },
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
    },
    {
      name: 'Aiony',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.',
      img: 'aiony.jpg'
    }
  ];
  return (
    <DefaultPageLayout
      pageTitle="Interviews"
      contentCss={css`
        ${verticalStackCss.xxl}
        justify-content: flex-start;
        align-items: flex-start;
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
        src={require('../../../media/images/idea.jpg')}
        alt="banner"
        css={css`
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        `}
      />
      <MasonryGrid>
        {interviews.map((interview) => {
          return (
            <PreviewCard
              key={interview.name}
              resume={interview}
              type="interview"
            />
          );
        })}
      </MasonryGrid>
    </DefaultPageLayout>
  );
};

export default InterviewsFeed;
