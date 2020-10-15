/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/core';
import css from '@emotion/css/macro';
import React from 'react';
import { ReactText } from 'react';
import { theme } from 'theme';

interface ContentCssProps {
  onClick?: () => void;
  children: string | number | ReactText[] | React.ReactNode;
  contentCss?: SerializedStyles | SerializedStyles[];
}

const STYLES_NO_MARGINS = css`
  margin-top: 0px;
  margin-bottom: 0px;
  color: ${theme.fontPrimaryGrey};
  letter-spacing: 0.5px;
`;

/* Headings */
/* Always use lowest one unless stated otherwise */

/**
 * Default padding: rawSpacing.xl / 32px
 * if separating from top: 2x / 64px
 * used for page banner / main product name
 * @param props contentCss if needed
 */
export const H1 = React.memo<ContentCssProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h1
      onClick={onClick}
      css={[
        css`
          font-size: 32px;
        `,
        STYLES_NO_MARGINS,
        contentCss
      ]}
    >
      {children}
    </h1>
  );
});

/**
 * Default padding: rawSpacing.l / 24px
 * if separating from top: 2x / 48px
 * used for page banner / main product name
 * @param props contentCss if needed
 */
export const H2 = React.memo<ContentCssProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h2 onClick={onClick} css={[STYLES_NO_MARGINS, contentCss]}>
      {children}
    </h2>
  );
});

/**
 * Default padding: rawSpacing.m / 16px
 * Separating from top: 2x / 32px
 * Used for section header
 * @param props contentCss if needed
 */
export const H3 = React.memo<ContentCssProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h3 onClick={onClick} css={[STYLES_NO_MARGINS, contentCss]}>
      {children}
    </h3>
  );
});

/**
 * Default padding: rawSpacing.m / 16px
 * Separating from top: 2x / 32px
 * @param props contentCss if needed
 */
export const H4 = React.memo<ContentCssProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h4 onClick={onClick} css={[STYLES_NO_MARGINS, contentCss]}>
      {children}
    </h4>
  );
});

/**
 * Default padding: rawSpacing.s / 8px
 * Separating from top: 2x / 16px
 * @param props contentCss if needed
 */
export const H5 = React.memo<ContentCssProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h5 onClick={onClick} css={[STYLES_NO_MARGINS, contentCss]}>
      {children}
    </h5>
  );
});

/* Text */
const STYLES_TEXT = css`
  line-height: 1.5;
`;

/**
 * Default padding: rawSpacing.s
 */
export const P = React.memo<ContentCssProps>((props) => {
  const { contentCss, children } = props;
  return <p css={[STYLES_NO_MARGINS, STYLES_TEXT, contentCss]}>{children}</p>;
});
