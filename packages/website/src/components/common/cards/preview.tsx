/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { H3, P } from '../system';

interface PreviewProps {
  resume: {
    name: string;
    company: string;
    description: string;
    img: string;
  };
  type: string;
}

const STYLES_CARD = ({ type }: { type: string }) => css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;

  div {
    ${verticalStackCss.m}
    align-items: flex-start;
  }

  :hover {
    cursor: pointer;

    img {
      border: ${type === 'resume'
        ? `1px solid ${theme.activeGrey}`
        : `1px solid transparent`};
      opacity: ${type === 'interview' ? 0.85 : 1};
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
  const { name, company, description, img } = props.resume;
  const { type } = props;
  return (
    <Link css={STYLES_CARD({ type })} to={`/${type}s/karming`}>
      <div>
        <img
          css={css`
            width: 100%;
            box-sizing: border-box;
            border: ${type === 'resume'
              ? `1px solid ${theme.blurSoftGrey}`
              : '1px solid transparent'};

            transition: all ease ${transitionTime.standard}ms;
          `}
          src={require(`../../../media/images/${img}`)}
          alt={type}
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
