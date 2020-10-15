/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { Helmet } from 'react-helmet';
import { SerializedStyles } from '@emotion/css/macro';

import { size, rawSpacing, MediaSize, cssForMediaSize } from 'theme/';
import { H2 } from '../system';

interface HeadProps {
  pageTitle: string;
  header?: string;
  description?: string;
}

interface PageProps extends HeadProps {
  contentCss?: SerializedStyles;
  children?: React.ReactNode;
}

const STYLES_PAGE = css`
  margin-top: 75px; /* h1 header (43) + rawSpacing.m (16*2)*/
  min-height: 500px;
  box-sizing: border-box;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: ${size.page.width.tablet};
      padding: 0px ${rawSpacing.l}px;
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

const STYLES_HEADER = css`
  margin-top: ${rawSpacing.xl}px;
  margin-bottom: ${rawSpacing.xl}px!important;
  text-transform: uppercase;
  text-align: center;
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
  header
}) => {
  return (
    <div css={[STYLES_PAGE, contentCss]}>
      <HelmetComponent pageTitle={pageTitle} />
      {header && <H2 contentCss={STYLES_HEADER}>{header}</H2>}
      {children}
    </div>
  );
};

const HelmetComponent: React.FC<HeadProps> = ({ pageTitle }) => {
  return (
    <Helmet>
      <title> Careeers | {pageTitle}</title>
    </Helmet>
  );
};
