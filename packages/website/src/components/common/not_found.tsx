/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React, { useEffect } from 'react';

import { CloudinaryImg } from './cloudinary_img';
import { DefaultPageLayout } from './layout/default_page';
import { H1 } from './system';
import { setGaError } from 'routes/ga_tracking';
import { fadeInAnim, verticalStackCss } from 'theme/';

const STYLES_ERROR = css`
  ${verticalStackCss.xl}
  ${fadeInAnim}
`;

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    setGaError();
  }, []);
  return (
    <DefaultPageLayout pageTitle="Page Error" contentCss={STYLES_ERROR}>
      <H1>
        Seems like we have encountered an error...Please message our team or try
        later. Here is something else in the mean time.
      </H1>
      <CloudinaryImg
        cloudinaryId="careeers/base/help_n0s1qh.jpg"
        alt="Person holding a sign during BLM protest"
        contentCss={css`
          max-height: 400px;
          object-fit: cover;
          width: 100%;
        `}
      />
    </DefaultPageLayout>
  );
};

export default NotFoundPage;
