/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import css from '@emotion/css';
import React, { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useLocation } from 'react-router-dom';

import { horizontalStackCss, theme, rawSpacing } from 'theme';
import { H2 } from '../system';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '24px',
    height: '20px',
    right: '36px',
    top: '30px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '0',
    height: '100%',
    width: '30%'
  },
  bmMenu: {
    background: '#ffffff',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    boxShadow: '0 7px 65px 0px rgba(0, 0, 0, 0.15)'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

type NavigationProps = {
  selected: boolean;
};

export const NavigationLink = styled(Link)<NavigationProps>`
  font-weight: normal;
  color: ${theme.textPrimaryPurple};
  text-decoration: none;
  transition: border-bottom ease 300ms;

  border-bottom: ${(props: NavigationProps) =>
    props.selected
      ? `1px solid ${theme.textPrimaryPurple}`
      : `1px solid ${theme.background}`};

  :hover {
    color: ${theme.textPrimaryPurple};
    border-bottom: 1px solid ${theme.textPrimaryPurple};
  }

  :active {
    color: grey;
  }

  @media only screen and (max-width: 768px) {
    margin-bottom: ${rawSpacing.m}px;
  }
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

  useEffect(() => {
    if (currentPathname !== pathname) {
      setCurrentPathname(pathname);
    }
  }, [pathname, currentPathname]);

  const options = [
    { path: '/', name: 'resumes' },
    { path: '/resources', name: 'resources' },
    { path: '/submit', name: 'submit' },
    { path: '/contact', name: 'contact' }
  ];

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding: ${rawSpacing.xl}px 0;
      `}
    >
      <Link
        to="/"
        css={css`
          text-decoration: none;
        `}
      >
        <H2
          contentCss={css`
            color: ${theme.textPrimaryPurple};
          `}
        >
          ResumeHub
        </H2>
      </Link>
      <div
        css={css`
          ${horizontalStackCss.xxxl}

          @media only screen and (max-width: 768px) {
            display: none;
          }
        `}
      >
        {options.map((option) => {
          const { path, name } = option;
          return (
            <NavigationLink
              key={name}
              selected={removeTrailingSlash(currentPathname) === path ?? false}
              to={name === 'resumes' ? path : name}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </NavigationLink>
          );
        })}
      </div>
      <div
        css={css`
          @media only screen and (min-width: 769px) {
            display: none;
          }
        `}
      >
        <Menu styles={styles} right>
          {options.map((option) => {
            const { path, name } = option;
            return (
              <NavigationLink
                key={name}
                selected={
                  removeTrailingSlash(currentPathname) === path ?? false
                }
                to={name === 'resumes' ? path : name}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </NavigationLink>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
