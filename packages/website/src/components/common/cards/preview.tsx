/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { H3, P } from '../system';
import { ProfileProps } from 'components/pages/resumes/feed';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';

interface PreviewProps extends ProfileProps {
  path: string;
}

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;

  > div {
    ${verticalStackCss.m}
    align-items: flex-start;
    width: 100%;
  }

  :hover {
    cursor: pointer;

    img {
      opacity: 0.85;
    }
    h3 {
      opacity: 0.75;
    }
  }
`;

/**
 * Resume preview card
 */
const PreviewCard: React.FC<PreviewProps> = React.memo((props) => {
  const { name, company, description, profileCloudinaryId, slug, path } = props;

  return (
    <Link css={STYLES_CARD} to={`/${path}/${slug}`}>
      <div>
        <img
          css={css`
            width: 100%;
            transition: all ease ${transitionTime.standard}ms;
          `}
          src={`https://res.cloudinary.com/dbmvvyt3x/image/upload/${profileCloudinaryId}`}
          alt={name}
        />
        <H3>
          {name} — {company}
        </H3>
      </div>
      <P
        contentCss={css`
          color: ${theme.fontSecondaryGrey};
        `}
      >
        {description}
      </P>
    </Link>
  );
});

export default PreviewCard;
