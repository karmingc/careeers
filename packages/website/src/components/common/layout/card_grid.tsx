/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React from 'react';
import Masonry from 'react-masonry-css';

import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  rawSpacing
} from 'theme';

interface CardGridProps {
  contentCss?: SerializedStyles | SerializedStyles[];
  children: React.ReactNode;
}

/**
 * Card Grid Layout used
 */
const CardGridLayout: React.FC<CardGridProps> = ({ contentCss, children }) => {
  return (
    <section
      css={[
        css`
          ${horizontalStackCss.xxl}
          margin-top: -${rawSpacing.xxxxl}px;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;

          ${cssForMediaSize({
            max: MediaSize.TABLET,
            contentCss: css`
              div:nth-of-type(2n) {
                margin-right: 0px;
              }
            `
          })}

          ${cssForMediaSize({
            min: MediaSize.DESKTOP,
            contentCss: css`
              div:nth-of-type(4n) {
                margin-right: 0px;
              }
            `
          })}
        `,
        contentCss
      ]}
    >
      {children}
    </section>
  );
};

export default CardGridLayout;
