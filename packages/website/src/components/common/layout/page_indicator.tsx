/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';
import { horizontalStackCss, outlineFocus, rawSpacing, theme } from 'theme';
import { fontSize } from 'theme/styles/font';

interface PageIndicatorProps {
  numOfCards: number;
  currPage: number;
  setPage: (target: number) => void;
}

/**
 * Page indicator at the bottom, reflecting the number of cards over number of pages
 * less than 16 = 1 page, less than 32 = 2 pages...
 */
const PageIndicator: React.FC<PageIndicatorProps> = React.memo((props) => {
  const { numOfCards, currPage, setPage } = props;
  const numOfPages = Math.ceil(numOfCards / 16);
  const arrayOfPages = useMemo(() => {
    return Array.from(Array(numOfPages), (_, i) => i + 1);
  }, [numOfPages]);

  return (
    <div
      css={css`
        ${horizontalStackCss.m};
        margin: auto;
      `}
    >
      {arrayOfPages.map((page) => {
        return (
          <Link
            to={`/resources/page/${page}`}
            key={page}
            onClick={() => setPage(page)}
          >
            <button
              type="button"
              tabIndex={-1}
              css={css`
                background-color: ${currPage === page
                  ? theme.buttonBgActive
                  : theme.buttonBgBlur};
                color: ${currPage === page
                  ? theme.fontPrimaryWhite
                  : theme.fontPrimaryGrey};
                padding: ${rawSpacing.m}px ${rawSpacing.l}px;
                font-size: ${fontSize.medium}px;
                border: none;
                transition: background-color ease 500ms;
                ${outlineFocus}
                :hover {
                  cursor: pointer;
                  background-color: ${currPage === page
                    ? ''
                    : theme.buttonBgHover};
                }
              `}
            >
              {page}
            </button>
          </Link>
        );
      })}
    </div>
  );
});

export default PageIndicator;
