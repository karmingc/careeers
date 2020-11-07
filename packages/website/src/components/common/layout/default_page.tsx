/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React from 'react';

import { Helmet } from 'react-helmet';

import Help from '../../../media/images/help.jpg';
import { H1 } from '../system';
import {
  size,
  MediaSize,
  cssForMediaSize,
  fadeInAnim,
  verticalStackCss
} from 'theme/';

interface HeadProps {
  pageTitle: string;
  description?: string;
}

interface PageProps extends HeadProps {
  contentCss?: SerializedStyles;
  children?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

const STYLES_PAGE = css`
  margin-top: 75px; /* h1 header (43) + rawSpacing.m (16*2)*/
  min-height: 500px;
  box-sizing: border-box;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: ${size.page.width.tablet};
      padding: ${size.page.padding.tablet};
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: ${size.page.width.desktop};
      padding: ${size.page.padding.desktop};
    `
  })}
`;

const STYLES_ERROR = css`
  ${verticalStackCss.xxl}
  ${fadeInAnim}
`;

/**
 * Default page layout used through
 * @param contentCss additional css content if needed
 * @param children components inside the page
 * @param pageTitle react-helmet for page title meta
 * @param header header for page if needed
 * @param description description for page under title if neede
 */
export const DefaultPageLayout: React.FC<PageProps> = ({
  contentCss,
  children,
  pageTitle,
  isError,
  isLoading
}) => {
  if (isError) {
    return (
      <main css={[STYLES_PAGE, STYLES_ERROR]}>
        <HelmetComponent pageTitle="PAGE ERROR" />
        <H1>
          Seems like we have encountered an error...Please message our team or
          try later. Here is something else in the mean time.
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
      </main>
    );
  }

  return (
    <main css={[STYLES_PAGE, contentCss]}>
      <HelmetComponent pageTitle={pageTitle} />
      {!isLoading ? children : null}
    </main>
  );
};

const HelmetComponent: React.FC<HeadProps> = ({ pageTitle }) => {
  return (
    <Helmet>
      <title> Careeers | {pageTitle}</title>
    </Helmet>
  );
};
