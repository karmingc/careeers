/** @jsx jsx */
import { jsx } from '@emotion/core';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1 } from 'components/common/system';

const HomePage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle={'Home'}>
      <H1>Home</H1>
    </DefaultPageLayout>
  );
};

export default HomePage;
