/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { horizontalStackCss, rawSpacing, theme, verticalStackCss } from 'theme';
import { H3, H4, H5 } from '../system';

const STYLES_CARD = css`
  background-color: white;
  box-sizing: border-box;
  width: 350px;
  height: 150px;
  border-radius: 10px;
  padding: ${rawSpacing.l}px;
`;

export const ProfileCard = React.memo((props) => {
  return (
    <div
      css={[
        STYLES_CARD,
        css`
          ${horizontalStackCss.xl}
        `
      ]}
    >
      <img
        alt="profile pic"
        src={require('../../../medias/images/side.jpeg')}
        css={css`
          width: 72px;
          height: 72px;
          border-radius: 50%;
        `}
      />
      <div
        css={css`
          ${verticalStackCss.s}
        `}
      >
        <H3
          contentCss={css`
            color: ${theme.textPrimaryBlack};
          `}
        >
          Karming C.
        </H3>
        <H4
          contentCss={css`
            font-weight: normal;
            color: ${theme.textSecondaryBlack};
          `}
        >
          McGill University
        </H4>
        <div
          css={css`
            ${horizontalStackCss.m}
          `}
        >
          <a
            href="https://www.linkedin.com/in/karmingc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              css={css`
                width: 40px;
                height: 40px;
              `}
              alt="linked"
              src={require(`../../../medias/icons/linkedin.svg`)}
            />
          </a>
          <a
            href="https://www.github.com/karmingc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              css={css`
                width: 40px;
                height: 40px;
              `}
              alt="linked"
              src={require(`../../../medias/icons/github.svg`)}
            />
          </a>
        </div>
      </div>
    </div>
  );
});

export const ExperienceCard = React.memo((props) => {
  return (
    <div
      css={[
        STYLES_CARD,
        css`
          ${horizontalStackCss.xl}
        `
      ]}
    >
      <img
        alt="profile pic"
        src={require('../../../medias/icons/linkedin.svg')}
        css={css`
          width: 64px;
          height: 64px;
        `}
      />
      <div
        css={css`
          ${verticalStackCss.s}
        `}
      >
        <H4
          contentCss={css`
            color: ${theme.textPrimaryBlack};
          `}
        >
          Software Engineering Intern
        </H4>
        <H5
          contentCss={css`
            font-weight: normal;
            color: ${theme.textSecondaryBlack};
          `}
        >
          Menlo Park • Summer 2019
        </H5>
      </div>
    </div>
  );
});
