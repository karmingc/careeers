/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconName, IconSize } from './icons';
import { setGaEvent } from 'routes/ga_tracking';
import { horizontalStackCss, theme, transitionTime } from 'theme';
import { fontSize } from 'theme/styles/font';

interface PreviousLinkProps {
  path: string;
  pageIndex: number;
}

const STYLES_MAIN = css`
  ${horizontalStackCss.s}
  text-decoration: none;
  justify-content: flex-start;

  :hover {
    span {
      transform: translate(5%);
    }
    path {
      transform: translate(-5%);
    }
  }
  :active {
    span {
      color: ${theme.blurStrongGrey};
    }
    path {
      fill: ${theme.blurStrongGrey};
    }
  }
`;
/**
 * Adding previous page button to the top of page
 * @param path add the path for it
 */
const PreviousLink: React.FC<PreviousLinkProps> = React.memo((props) => {
  const { path, pageIndex } = props;
  return (
    <Link
      to={`/${path}/page/${pageIndex}`}
      css={STYLES_MAIN}
      onClick={() => {
        setGaEvent({
          category: 'page navigation',
          action: `clicked from ${path}`,
          label: `/${path}/back/${pageIndex}`
        });
      }}
    >
      <Icon
        name={IconName.ArrowLeft}
        size={IconSize.MEDIUM}
        contentcss={css`
          padding-top: 2px;
          path {
            transition: all ease ${transitionTime.standard}ms;
            fill: ${theme.activeGrey};
          }
        `}
      />
      <span
        css={css`
          font-size: ${fontSize.medium}em;
          font-weight: bolder;
          text-decoration: none;
          transition: all ease 500ms;
          color: ${theme.activeGrey};
        `}
      >
        {path.charAt(0).toUpperCase() + path.slice(1)}
      </span>
    </Link>
  );
});

export default PreviousLink;
