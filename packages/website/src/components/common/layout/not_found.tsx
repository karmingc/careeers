/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import css from '@emotion/css/macro';

import { DefaultPageLayout } from './default_page';
import { verticalStackCss } from 'theme/';
import { H1 } from '../system';

const STYLES_ERROR = css`
  ${verticalStackCss.xxl}
`;

const NotFoundPage: React.FC = () => {
  return (
    <DefaultPageLayout
      pageTitle={'PAGE ERROR'}
      header={'page not found'}
      contentCss={STYLES_ERROR}
    >
      <H1>Seems like an error... But here's something else.</H1>
      <img
        src={require('../../../media/images/help.jpg')}
        alt="banner"
        css={css`
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        `}
      />
    </DefaultPageLayout>
  );
};

export default NotFoundPage;
