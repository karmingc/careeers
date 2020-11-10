/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';
import {
  horizontalStackCss,
  MediaSize,
  outlineFocus,
  rawSpacing,
  theme,
  useMatchesMediaSize
} from 'theme';

interface PageIndicatorProps {
  numOfCards: number;
  path: string;
  currPageIndicator: number;
  setCurrPageIndicator: (target: number) => void;
}

/**
 * Page indicator at the bottom, reflecting the number of cards over number of pages
 * less than 16 = 1 page, less than 32 = 2 pages...
 */
const PageIndicator: React.FC<PageIndicatorProps> = React.memo((props) => {
  const isPhone = useMatchesMediaSize({ max: MediaSize.PHONE });
  const isTablet = useMatchesMediaSize({
    min: MediaSize.TABLET,
    max: MediaSize.TABLET
  });

  const { numOfCards, path, currPageIndicator, setCurrPageIndicator } = props;

  const numOfPages = Math.ceil(numOfCards / 16);
  const arrayOfPages = useMemo(() => {
    const start = isPhone
      ? Math.max(currPageIndicator - 2, 0)
      : isTablet
      ? Math.max(currPageIndicator - 3, 0)
      : Math.max(currPageIndicator - 5, 0);
    const end = isPhone
      ? currPageIndicator + 1
      : isTablet
      ? currPageIndicator + 2
      : currPageIndicator + 4;
    return Array.from(Array(numOfPages), (_, i) => i + 1).slice(start, end);
  }, [numOfPages, currPageIndicator, isTablet, isPhone]);

  return (
    <div
      css={css`
        ${horizontalStackCss.m};
        margin: auto;
      `}
    >
      {arrayOfPages.map((pageIndicator) => {
        return (
          <Link
            to={`/${path}/page/${pageIndicator}`}
            key={pageIndicator}
            onClick={() => setCurrPageIndicator(pageIndicator)}
          >
            <button
              type="button"
              tabIndex={-1}
              css={css`
                background-color: ${currPageIndicator === pageIndicator
                  ? theme.buttonBgActive
                  : theme.buttonBgBlur};
                color: ${currPageIndicator === pageIndicator
                  ? theme.fontPrimaryWhite
                  : theme.fontPrimaryGrey};
                padding: ${rawSpacing.m}px ${rawSpacing.l}px;
                border: none;
                transition: background-color ease 500ms;
                ${outlineFocus}
                :hover {
                  cursor: pointer;
                  background-color: ${currPageIndicator === pageIndicator
                    ? ''
                    : theme.buttonBgHover};
                }
              `}
            >
              {pageIndicator}
            </button>
          </Link>
        );
      })}
    </div>
  );
});

export default PageIndicator;
