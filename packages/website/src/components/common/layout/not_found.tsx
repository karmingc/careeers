/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React from 'react';

import Help from '../../../media/images/help.jpg';
import { H1 } from '../system';
import { DefaultPageLayout } from './default_page';
import { fadeInAnim, verticalStackCss } from 'theme/';

const STYLES_ERROR = css`
  ${verticalStackCss.xl}
  ${fadeInAnim}
`;

const NotFoundPage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle="PAGE ERROR" contentCss={STYLES_ERROR}>
      <H1>
        Seems like we have encountered an error...Please message our team or try
        later. Here is something else in the mean time.
      </H1>
      <img
        src={Help}
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
