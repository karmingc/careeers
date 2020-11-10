/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { H1 } from '../system';
import { rawSpacing, verticalStackCss } from 'theme';

interface RelatedContentProps {
  pageTitle: string;
  children: React.ReactNode;
}

const RelatedContent: React.FC<RelatedContentProps> = React.memo((props) => {
  const { pageTitle, children } = props;
  return (
    <aside
      css={css`
        ${verticalStackCss.xl}
        margin-top: ${rawSpacing.xl}px;
        width: 100%;
        align-items: flex-start;

        h1 {
          margin: auto;
        }
      `}
    >
      <H1>Related {pageTitle}</H1>
      {children}
    </aside>
  );
});
export default RelatedContent;
