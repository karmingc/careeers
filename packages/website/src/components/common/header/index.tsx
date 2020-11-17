/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { H1 } from '../system';
import { Scroll, useMatchesScrollDirection } from './nav_helpers';

import { setGaEvent } from 'routes/ga_tracking';
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
  transitionTime,
  rawSpacing,
  zIndex
} from 'theme';
import { removeTrailingSlash } from 'utilities';

const STYLES_HEADER = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: ${zIndex.header};

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: ${size.page.width.tablet};
      padding: ${size.header.padding.tablet};
      align-items: center;
      background-color: ${theme.backgroundWhite};
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: ${size.page.width.desktop};
      background-color: ${theme.backgroundWhite};
      padding: ${size.header.padding.desktop};
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
    transition: all ease ${transitionTime.menuIcon}ms;
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
    : ''}

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      span {
        background-color: ${theme.backgroundGrey};
      }
    `
  })}
`;

const STYLES_MENU_OVERLAY = (isMenuOpen: boolean) => css`
  position: fixed;
  ${verticalStackCss.xl}
  justify-content: flex-start;
  top: 107px; /* header(43px)+rawSpacing.m (32*2) */
  left: 0;
  width: 100%;
  box-sizing: border-box;

  background-size: 100% 200%;
  background-image: linear-gradient(
    to bottom,
    transparent 50%,
    ${theme.backgroundWhite} 50%
  );
  transition: background-position ${transitionTime.overlay}ms;

  /* aligns -100% of background image to -100% of container */
  ${isMenuOpen
    ? `background-position: 0 -100%;    
    border-top: 1px solid ${theme.blurSoftGrey};
    padding-top: ${rawSpacing.xl}px;
  height: 100vh;`
    : `animation: removeOverlay ${transitionTime.overlay}ms;            
  @keyframes removeOverlay {
    0% {
      height: 100vh;      
    }
    100% {
      height: 0;
    }
  }`}
`;

const STYLES_NAV = ({ selected }: { selected: boolean }) => css`
  font-weight: bolder;
  text-decoration: none;
  transition: border-bottom ease ${transitionTime.standard}ms;

  border-bottom: ${selected
    ? `1px solid ${theme.fontPrimaryGrey}`
    : '1px solid transparent'};

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
      color: ${theme.fontPrimaryGrey};
      animation: fade ${transitionTime.overlay}ms;

      :hover {
        border-bottom: 1px solid ${theme.activeGrey};
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
 * Page header for every page
 */
const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [currentPathname, setCurrentPathname] = useState(pathname);
  const [isMenuOpen, setMenu] = useState(false);
  const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });
  const scrollDirection = useMatchesScrollDirection();

  const toggleMenu = (path: string) => {
    if (isMenuOpen) {
      setMenu(false);
      setGaEvent({
        category: 'page navigation',
        action: 'clicked from header',
        label: `${path}`
      });
    } else {
      setMenu(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && toggleMenu) {
      toggleMenu('/home');
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
    { path: '/resources', name: 'resources' }
    // { path: '/about', name: 'about' }
  ];

  if (scrollDirection === Scroll.DOWN) {
    return null;
  }

  // For media of size TABLET or below
  if (!isDesktop) {
    return (
      <header css={STYLES_HEADER}>
        <div
          role="button"
          css={STYLES_MENU_ICON(isMenuOpen)}
          onKeyDown={handleKeyPress}
          onClick={() => {
            toggleMenu('/home');
          }}
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
            contentCss={[NotoSerif]}
            onClick={
              isMenuOpen
                ? () => {
                    toggleMenu('/home');
                  }
                : undefined
            }
          >
            Careeers.
          </H1>
        </Link>
        <span />
        <nav css={STYLES_MENU_OVERLAY(isMenuOpen)}>
          {isMenuOpen &&
            options.map((option) => {
              const { path, name } = option;
              return (
                <Link
                  key={name}
                  css={STYLES_NAV({
                    selected:
                      removeTrailingSlash(currentPathname) === path ?? false
                  })}
                  onClick={() => {
                    toggleMenu(`${path}`);
                  }}
                  to={path}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              );
            })}
        </nav>
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
        onClick={() => {
          setGaEvent({
            category: 'page navigation',
            action: 'clicked from header',
            label: '/home'
          });
        }}
      >
        <H1 contentCss={[NotoSerif]}>Careeers.</H1>
      </Link>
      <nav
        css={css`
          ${horizontalStackCss.xl}
        `}
      >
        {options.map((option) => {
          const { path, name } = option;
          return (
            <Link
              key={name}
              css={STYLES_NAV({
                selected: removeTrailingSlash(currentPathname) === path ?? false
              })}
              to={path}
              onClick={() => {
                setGaEvent({
                  category: 'page navigation',
                  action: 'clicked from header',
                  label: `${path}`
                });
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
