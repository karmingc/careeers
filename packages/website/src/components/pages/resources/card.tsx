/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { H3, P } from 'components/common/system';
import { A } from 'components/common/system/typography';
import React from 'react';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { prettierUrl } from 'utilities';

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;
`;

const ResourcesCard: React.FC = React.memo(() => {
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
            src={require('../../../media/images/typewolf.png')}
            alt="typewolf"
          />
        </A>
        <H3>Typewolf</H3>
      </div>
      <P
        contentCss={css`
          color: ${theme.fontSecondaryGrey};
        `}
      >
        Typewolf is an independent typography resource created by Jeremiah
        Shoaf.
      </P>
      <A href="https://www.typewolf.com">
        {prettierUrl('https://www.typewolf.com')}
      </A>
    </div>
  );
});
export default ResourcesCard;
