/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import css from '@emotion/css/macro';

import { DefaultPageLayout } from './default_page';
import { verticalStackCss } from 'theme/';

const STYLES_SUPPORT = css`
  ${verticalStackCss.xl}
  align-items: center;
  width: calc(85% / 2);
`;

const NotFoundPage: React.FC = () => {
  return (
    <DefaultPageLayout
      pageTitle={'PAGE ERROR'}
      header={'page not found'}
      contentCss={STYLES_SUPPORT}
    ></DefaultPageLayout>
  );
};

export default NotFoundPage;
