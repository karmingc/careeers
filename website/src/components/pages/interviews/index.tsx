/** @jsx jsx */
import { jsx } from '@emotion/core';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1 } from 'components/common/system';

const InterviewsPage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle={'Interviews'}>
      <H1>Interviews</H1>
    </DefaultPageLayout>
  );
};

export default InterviewsPage;
