/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  calcSpaceConstraints,
  cssForMediaSize,
  MediaSize,
  rawSpacing,
  theme,
  transition,
  verticalStackCss
} from 'theme';
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

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-top: ${rawSpacing.xxxxl}px;
  align-items: flex-start;

  a {
    ${verticalStackCss.m}
    align-items: flex-start;
  }

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: calc(
        (
            100% -
              ${calcSpaceConstraints({
                spacing: rawSpacing.xxl,
                cardsPerRow: 2,
                paddingInCard: 0
              })}px
          ) / 2
      );
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: calc(
        (
            100% -
              ${calcSpaceConstraints({
                spacing: rawSpacing.xxl,
                cardsPerRow: 4,
                paddingInCard: 0
              })}px
          ) / 4
      );
    `
  })}
`;

/**
 * Resume preview card
 */
const PreviewCard = React.memo<PreviewProps>((props) => {
  const { name, company, description, img } = props.resume;
  const { type } = props;
  return (
    <div css={STYLES_CARD}>
      <Link
        to="/resumes/karming"
        css={css`
          text-decoration: none;
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
        `}
      >
        <img
          css={css`
            width: 100%;
            box-sizing: border-box;
            border: ${type === 'resume'
              ? `1px solid ${theme.blurSoftGrey}`
              : '1px solid transparent'};

            transition: all ease ${transition.standard}ms;
          `}
          src={require(`../../../media/images/${img}`)}
          alt={'resume'}
        />
        <H3>
          {name} — {company}
        </H3>
      </Link>
      <P
        contentCss={css`
          color: ${theme.fontSecondaryGrey};
        `}
      >
        {description}
      </P>
    </div>
  );
});

export default PreviewCard;
