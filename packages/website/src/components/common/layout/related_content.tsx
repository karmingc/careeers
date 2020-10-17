/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { rawSpacing, verticalStackCss } from 'theme';
import { H1 } from '../system';

interface RelatedContentProps {
  pageTitle: string;
  children: React.ReactNode;
}

const RelatedContent = React.memo<RelatedContentProps>((props) => {
  const { pageTitle, children } = props;
  return (
    <section
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
    </section>
  );
});
export default RelatedContent;
