/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React from 'react';

import {
  calcSpaceConstraints,
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  rawSpacing
} from 'theme';

interface CardGridProps {
  contentCss?: SerializedStyles | SerializedStyles[];
  children: React.ReactNode;
}

const STYLES_GRID = css`
  ${horizontalStackCss.xxl}
  /* margin-top: -${rawSpacing.xxxxl}px; */
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      a:nth-of-type(2n) {
        margin-right: 0px;
      }
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      a:nth-of-type(4n) {
        margin-right: 0px;
      }
    `
  })}


  /* width for cards */
  > a, > div {
    ${cssForMediaSize({
      max: MediaSize.TABLET,
      contentCss: css`
        width: calc(
          (
              100% -
                ${calcSpaceConstraints({
                  spacing: rawSpacing.xxl,
                  cardsPerRow: 2,
                  paddingInCard: 0
                })}px
            ) / 2
        );
      `
    })}

    ${cssForMediaSize({
      min: MediaSize.DESKTOP,
      contentCss: css`
        width: calc(
          (
              100% -
                ${calcSpaceConstraints({
                  spacing: rawSpacing.xxl,
                  cardsPerRow: 4,
                  paddingInCard: 0
                })}px
            ) / 4
        );
      `
    })}
  }
`;
/**
 * Card Grid Layout used
 */
const CardGridLayout: React.FC<CardGridProps> = ({ contentCss, children }) => {
  return <section css={[STYLES_GRID, contentCss]}>{children}</section>;
};

export default CardGridLayout;
