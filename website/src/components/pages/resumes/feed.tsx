/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import ResumePreview from 'components/common/cards/resume_preview';
import CardGridLayout from 'components/common/layout/card_grid';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1 } from 'components/common/system';
import { verticalStackCss } from 'theme';

const ResumesFeed: React.FC = () => {
  const resumes = [
    {
      name: 'Karming Chin',
      company: 'Stripe',
      description: 'Interned at Stripe during Summer 2019.'
    },
    {
      name: 'Karming Chin',
      company: 'Microsoft',
      description: 'Interned at Stripe during Summer 2019.'
    },
    {
      name: 'Karming Chinhiiii',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.'
    },
    {
      name: 'Karming Chinhiiidddi',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.'
    },
    {
      name: 'Karming Chinhiiidddi',
      company: 'UBC Med',
      description: '19.'
    },
    {
      name: 'K',
      company: 'UBC Med',
      description:
        'Interned at Stripe during Summer 2019.Interned at Stripe during Summer 2019.'
    }
  ];

  return (
    <DefaultPageLayout
      pageTitle={'Home'}
      contentCss={css`
        ${verticalStackCss.xxl}
        align-items: flex-start;
      `}
    >
      <H1>Resumes</H1>
      <CardGridLayout>
        {resumes.map((resume) => {
          return <ResumePreview key={resume.name} resume={resume} />;
        })}
      </CardGridLayout>
    </DefaultPageLayout>
  );
};

export default ResumesFeed;
