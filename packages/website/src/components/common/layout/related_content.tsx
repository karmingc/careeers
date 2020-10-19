/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { rawSpacing, verticalStackCss } from 'theme';
import { H1 } from '../system';

interface RelatedContentProps {
  pageTitle: string;
  children: React.ReactNode;
}

const RelatedContent: React.FC<RelatedContentProps> = React.memo((props) => {
  const { pageTitle, children } = props;
  return (
    <aside
      css={css`
        ${verticalStackCss.xxl}
        margin-top: ${rawSpacing.xxl}px;
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
