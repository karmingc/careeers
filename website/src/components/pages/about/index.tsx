/** @jsx jsx */
import { jsx } from '@emotion/core';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1 } from 'components/common/system';

const AboutPage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle={'About'}>
      <H1>About</H1>
    </DefaultPageLayout>
  );
};

export default AboutPage;
