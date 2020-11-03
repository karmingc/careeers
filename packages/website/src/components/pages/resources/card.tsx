/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { ResourcesProps } from './feed';
import { H3, P } from 'components/common/system';
import { A } from 'components/common/system/typography';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { prettierUrl } from 'utilities';

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;
  word-break: break-word;

  > div {
    ${verticalStackCss.m};
    align-items: flex-start;
  }
`;

const STYLES_IMG = css`
  width: 100%;
  transition: opacity ease ${transitionTime.standard}ms;

  :hover {
    opacity: 0.85;
  }
`;

const ResourcesCard: React.FC<ResourcesProps> = React.memo((props) => {
  const { cloudinaryId, description, link, name } = props;
  return (
    <div css={STYLES_CARD}>
      <div>
        <A href={link}>
          <img
            css={STYLES_IMG}
            src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${cloudinaryId}`}
            alt={name}
          />
        </A>
        <H3>{name}</H3>
      </div>
      <P
        contentCss={css`
          color: ${theme.fontSecondaryGrey};
        `}
      >
        {description}
      </P>
      <A
        href={link}
        contentCss={css`
          word-wrap: break-word;
        `}
      >
        {prettierUrl(link)}
      </A>
    </div>
  );
});
export default ResourcesCard;
