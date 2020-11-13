/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/core';
import css from '@emotion/css/macro';
import React, { ReactText } from 'react';

import { theme } from 'theme';

interface TextProps {
  onClick?: () => void;
  children: string | number | ReactText[] | React.ReactNode;
  contentCss?: SerializedStyles | SerializedStyles[];
  style?: any;
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
  const { contentCss, children, onClick, style } = props;
  return (
    <h1 onClick={onClick} css={[STYLES_BASE, contentCss]} style={style}>
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
  const { contentCss, children, onClick, style } = props;
  return (
    <h2 onClick={onClick} css={[STYLES_BASE, contentCss]} style={style}>
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
  const { contentCss, children, onClick, style } = props;
  return (
    <h3 onClick={onClick} css={[STYLES_BASE, contentCss]} style={style}>
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
  const { contentCss, children, onClick, style } = props;
  return (
    <h4 onClick={onClick} css={[STYLES_BASE, contentCss]} style={style}>
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
  const { contentCss, children, onClick, style } = props;
  return (
    <h5 onClick={onClick} css={[STYLES_BASE, contentCss]} style={style}>
      {children}
    </h5>
  );
});

/* Text */
const STYLES_TEXT = css`
  line-height: 1.5;
`;

/**
 * Default padding: rawSpacing.m
 */
export const P = React.memo<TextProps>((props) => {
  const { contentCss, children, style } = props;
  return (
    <p css={[STYLES_BASE, STYLES_TEXT, contentCss]} style={style}>
      {children}
    </p>
  );
});

interface AProps extends TextProps {
  href: string;
  style?: any;
}
export const A = React.memo<AProps>((props) => {
  const { contentCss, children, href, style, onClick } = props;
  return (
    <a
      style={style}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
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
