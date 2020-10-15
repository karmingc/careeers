/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import {
  horizontalStackCss,
  theme,
  NotoSerif,
  size,
  cssForMediaSize,
  MediaSize,
  verticalStackCss,
  useMatchesMediaSize,
  outlineFocus,
  transition,
  rawSpacing
} from 'theme';
import { H1 } from '../system';

const STYLES_HEADER = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px dotted grey;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: ${size.page.width.tablet};
      padding: ${size.page.padding.tablet};
      align-items: center;
      background-color: ${theme.backgroundGrey};
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: ${size.page.width.desktop};
      background-color: ${theme.backgroundWhite};
      padding: ${size.page.padding.desktop};
      align-items: center;
    `
  })}
`;

const STYLES_MENU_ICON = (isMenuOpen: boolean) => css`
  ${verticalStackCss.xs}
  ${outlineFocus}

  position: relative;

  :hover {
    cursor: pointer;
  }

  span {
    height: 2px;
    width: 20px;
    background-color: ${theme.backgroundGrey};
    transition: all ease ${transition.menuIcon}ms;
  }

  span:nth-of-type(2) {
    position: absolute;
    top: 6px;
  }

  ${isMenuOpen
    ? `
    span {
      background-color:white;
    }

    span:nth-of-type(1) {
      transform: translate(0, 200%);
      opacity: 0;
      width: 0;
    }
    span:nth-of-type(4) {
      transform: translate(0, -200%);
      opacity: 0;
      width: 0;
    }

    span:nth-of-type(2) {
      transform: rotate(45deg);
    }
    span:nth-of-type(3) {
      transform: rotate(-45deg);
    }`
    : ``}

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      span {
        background-color: ${theme.backgroundWhite};
      }
    `
  })}
`;

const STYLES_MENU_OVERLAY = (isMenuOpen: boolean) => css`
  position: fixed;
  ${verticalStackCss.xxxl}
  justify-content: flex-start;
  top: 75px; /* header(43px)+rawSpacing.m (16*2) */
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding-top: ${rawSpacing.xxxl}px;
  border-top: 1px solid white;

  background-size: 100% 200%;
  background-image: linear-gradient(
    to bottom,
    transparent 50%,
    ${theme.backgroundGrey} 50%
  );
  transition: background-position ${transition.overlay}ms;

  /* aligns -100% of background image to -100% of container */
  ${isMenuOpen
    ? `background-position: 0 -100%;
  height: 100vh;`
    : `animation: removeOverlay ${transition.overlay}ms;              
  @keyframes removeOverlay {
    0% {
      height: 100vh;      
    }
    100% {
      height: 0;
    }
  }`}
`;

const STYLES_NAV = ({
  selected,
  isDesktop
}: {
  selected: boolean;
  isDesktop: boolean;
}) => css`
  font-weight: bolder;
  text-decoration: none;
  transition: border-bottom ease ${transition.standard}ms;

  border-bottom: ${selected && isDesktop
    ? `1px solid ${theme.fontPrimaryGrey}`
    : selected
    ? `1px solid ${theme.fontPrimaryWhite}`
    : `1px solid transparent`};

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      color: ${theme.fontPrimaryWhite};
      animation: fade ${transition.overlay}ms;

      :hover {
        border-bottom: 1px solid ${theme.backgroundWhite};
      }
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      color: ${theme.fontPrimaryGrey};

      :hover {
        color: ${theme.fontPrimaryGrey};
        border-bottom: 1px solid ${theme.fontPrimaryGrey};
      }

      :active {
        color: ${theme.fontSecondaryGrey};
      }
    `
  })}
`;
/**
 * Find out which path
 * @param path
 */
export function removeTrailingSlash(path: string): string {
  const numSlash = (path.match(/[/]/g) || []).length;
  if (numSlash <= 1) {
    return path;
  }
  const position = path.indexOf('/', path.indexOf('/') + 1);
  return path.substring(0, position);
}

/**
 * Page header for every page
 */
const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [currentPathname, setCurrentPathname] = useState(pathname);
  const [isMenuOpen, setMenu] = useState(false);
  const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });

  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && toggleMenu) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (currentPathname !== pathname) {
      setCurrentPathname(pathname);
    }
    if (isDesktop) {
      setMenu(false);
    }
  }, [pathname, currentPathname, isDesktop]);

  const options = [
    { path: '/interviews', name: 'interviews' },
    { path: '/resumes', name: 'resumes' },
    { path: '/resources', name: 'resources' },
    { path: '/about', name: 'about' }
  ];

  // For media of size TABLET or below
  if (!isDesktop) {
    return (
      <header css={STYLES_HEADER}>
        <div
          role="button"
          css={STYLES_MENU_ICON(isMenuOpen)}
          onKeyDown={handleKeyPress}
          onClick={toggleMenu}
          tabIndex={0}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
        <Link
          to="/"
          css={css`
            text-decoration: none;
          `}
        >
          <H1
            contentCss={[
              css`
                color: ${theme.fontPrimaryWhite};
              `,
              NotoSerif
            ]}
            onClick={toggleMenu}
          >
            Careeers.
          </H1>
        </Link>
        <div></div>
        <div css={STYLES_MENU_OVERLAY(isMenuOpen)}>
          {isMenuOpen &&
            options.map((option) => {
              const { path, name } = option;
              return (
                <Link
                  key={name}
                  css={STYLES_NAV({
                    selected:
                      removeTrailingSlash(currentPathname) === path ?? false,
                    isDesktop: !!isDesktop
                  })}
                  onClick={toggleMenu}
                  to={name}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              );
            })}
        </div>
      </header>
    );
  }

  return (
    <header css={STYLES_HEADER}>
      <Link
        to="/"
        css={css`
          text-decoration: none;
        `}
      >
        <H1
          contentCss={[
            css`
              color: ${theme.fontPrimaryGrey};
            `,
            NotoSerif
          ]}
        >
          Careeers.
        </H1>
      </Link>
      <div
        css={css`
          ${horizontalStackCss.xxl}
        `}
      >
        {options.map((option) => {
          const { path, name } = option;
          return (
            <Link
              key={name}
              css={STYLES_NAV({
                selected:
                  removeTrailingSlash(currentPathname) === path ?? false,
                isDesktop: isDesktop
              })}
              to={name === 'resumes' ? path : name}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;