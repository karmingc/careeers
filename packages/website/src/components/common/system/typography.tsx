/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/core';
import css from '@emotion/css/macro';
import React, { ReactText } from 'react';

import { theme } from 'theme';

interface TextProps {
  onClick?: () => void;
  children: string | number | ReactText[] | React.ReactNode;
  contentCss?: SerializedStyles | SerializedStyles[];
}

const STYLES_BASE = css`
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
export const H1 = React.memo<TextProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h1
      onClick={onClick}
      css={[
        css`
          font-size: 32px;
        `,
        STYLES_BASE,
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
export const H2 = React.memo<TextProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h2 onClick={onClick} css={[STYLES_BASE, contentCss]}>
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
export const H3 = React.memo<TextProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h3 onClick={onClick} css={[STYLES_BASE, contentCss]}>
      {children}
    </h3>
  );
});

/**
 * Default padding: rawSpacing.m / 16px
 * Separating from top: 2x / 32px
 * @param props contentCss if needed
 */
export const H4 = React.memo<TextProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h4 onClick={onClick} css={[STYLES_BASE, contentCss]}>
      {children}
    </h4>
  );
});

/**
 * Default padding: rawSpacing.s / 8px
 * Separating from top: 2x / 16px
 * @param props contentCss if needed
 */
export const H5 = React.memo<TextProps>((props) => {
  const { contentCss, children, onClick } = props;
  return (
    <h5 onClick={onClick} css={[STYLES_BASE, contentCss]}>
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
export const P = React.memo<TextProps>((props) => {
  const { contentCss, children } = props;
  return <p css={[STYLES_BASE, STYLES_TEXT, contentCss]}>{children}</p>;
});

interface AProps extends TextProps {
  href: string;
}
export const A = React.memo<AProps>((props) => {
  const { contentCss, children, href } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      css={[
        STYLES_BASE,
        STYLES_TEXT,
        css`
          /* text-decoration: none; */
          text-decoration-color: ${theme.activeBlue};

          :hover {
            color: ${theme.activeBlue};
            cursor: pointer;
            transition: color ease 500ms;
          }
        `,
        contentCss
      ]}
    >
      {children}
    </a>
  );
});
