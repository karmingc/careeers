/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PreviewCard from 'components/common/cards/preview';
import CardGridLayout from 'components/common/layout/card_grid';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1, H2 } from 'components/common/system';
import { verticalStackCss } from 'theme';

const InterviewsPage: React.FC = () => {
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
        align-items: flex-start;

        div:first-of-type {
          ${verticalStackCss.s}
          align-items: flex-start;
        }
      `}
    >
      <div>
        <H1 contentCss={css``}>Interviews</H1>
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
      <CardGridLayout>
        {interviews.map((interview) => {
          return (
            <PreviewCard
              key={interview.name}
              resume={interview}
              type="interview"
            />
          );
        })}
      </CardGridLayout>
    </DefaultPageLayout>
  );
};

export default InterviewsPage;
