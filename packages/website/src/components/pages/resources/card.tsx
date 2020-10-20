/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { H3, P } from 'components/common/system';
import { A } from 'components/common/system/typography';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { prettierUrl } from 'utilities';

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;
`;

interface ResourcesProps {
  resource: {
    cloudinaryId: string;
    createdAt: string;
    description: string;
    id: string;
    link: string;
    name: string;
    updatedAt: string;
  };
}

const ResourcesCard: React.FC<ResourcesProps> = React.memo((props) => {
  const { cloudinaryId, description, link, name } = props.resource;
  return (
    <div css={STYLES_CARD}>
      <div
        css={css`
          ${verticalStackCss.m};
          align-items: flex-start;
        `}
      >
        <A href="https://www.typewolf.com">
          <img
            css={css`
              width: 100%;

              transition: opacity ease ${transitionTime.standard}ms;
              :hover {
                opacity: 0.85;
              }
            `}
            src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${cloudinaryId}`}
            alt="typewolf"
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
      <A href={link}>{prettierUrl(link)}</A>
    </div>
  );
});
export default ResourcesCard;
