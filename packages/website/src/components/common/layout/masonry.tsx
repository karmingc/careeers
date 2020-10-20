/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Masonry from 'react-masonry-css';
import { rawSpacing } from 'theme';

interface MasonryProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryProps> = React.memo((props) => {
  const { children } = props;

  return (
    <Masonry
      breakpointCols={{ default: 4, 900: 2 }}
      css={css`
        display: flex;
        width: 100%;

        /* causes issues with the header */
        /* margin-top: -${rawSpacing.xxxxl}px; */
        /* margin-left: -${rawSpacing.xxl}px; */

        .my-masonry-grid_column:first-of-type {
          padding: 0px;
        }

        .my-masonry-grid_column {
          padding-left: ${rawSpacing.xxl}px; /* gutter size */
          background-clip: padding-box;
        }
      `}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
});

export default MasonryGrid;
