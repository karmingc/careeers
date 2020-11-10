import { css } from '@emotion/core';
import {
  cssForMediaSize,
  MediaSize,
  useMatchesMediaSize
} from './media_queries';
import { fadeInAnim } from './styles/animation';
import { NotoSerif, NotoSansHK } from './styles/font';
import { transitionTime, STYLES_IMAGE_HOVER } from './styles/transition';
import { truncateText } from 'theme/styles/font';
import {
  rawSpacing,
  horizontalStackCss,
  verticalStackCss,
  calcSpaceConstraints
} from 'theme/styles/spacing';

// material design palette
// https://htmlcolorcodes.com/color-chart/material-design-color-chart/

/**
 * palette used everywhere in app
 */
export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  secondaryBlack: 'rgba(0,0,0,0.8)',
  grey10: '#fafafa',
  grey20: '#f5f5f5',
  grey30: '#eeeeee',
  grey40: '#e0e0e0',
  grey50: '#bdbdbd',
  grey60: '#9e9e9e',
  grey70: '#757575',
  grey80: '#616161',
  grey90: '#424242',
  grey100: '#212121',
  blue10: '#E3F2FD',
  blue40: '#64B5F6',
  blue60: '#2196F3',
  blue70: '#1E88E5',
  blue90: '#1565C0',
  blue100: '#0D47A1'
};

/**
 * zIndex for components
 */
const zIndex = {
  title: 1,
  header: 2
};

/**
 * Global theme used throughout
 */
const theme = {
  backgroundWhite: palette.white,
  backgroundGrey: palette.grey100,
  activeBlue: palette.blue90,
  activeGrey: palette.grey100,
  blurStrongGrey: palette.grey70,
  blurSoftGrey: palette.grey50,
  fontPrimaryGrey: palette.grey100,
  fontSecondaryGrey: palette.grey90,
  fontPrimaryWhite: 'white',
  buttonBgBlur: palette.grey30,
  buttonBgHover: palette.grey50,
  buttonBgActive: palette.grey100,
  outlineBlue: palette.blue60
};

const pagePaddingHorizontalDesktop = rawSpacing.xxxl;
const pagePaddingHorizontalTablet = rawSpacing.l;
/**
 * Global sizes for references
 */
const size = {
  page: {
    width: {
      desktop: '100%',
      tablet: '100%'
    },
    padding: {
      desktop: `${rawSpacing.zero}px ${pagePaddingHorizontalDesktop}px ${rawSpacing.xxxxl}px`,
      tablet: `${rawSpacing.zero}px ${pagePaddingHorizontalTablet}px ${rawSpacing.xxxxl}px`
    },
    maxWidth: '1200px'
  },
  header: {
    padding: {
      desktop: `${rawSpacing.xl}px ${pagePaddingHorizontalDesktop}px`,
      tablet: `${rawSpacing.xl}px ${pagePaddingHorizontalTablet}px`
    }
  },
  footer: {
    padding: {
      desktop: `${rawSpacing.xl}px ${pagePaddingHorizontalDesktop}px`,
      tablet: `${rawSpacing.xl}px ${pagePaddingHorizontalTablet}px`
    }
  },
  card: {}
};

export const outlineFocus = css`
  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 4px solid ${theme.outlineBlue};
    /* background: transparent; */
  }
`;

export {
  theme,
  zIndex,
  size,
  transitionTime,
  STYLES_IMAGE_HOVER,
  fadeInAnim,
  truncateText,
  calcSpaceConstraints,
  rawSpacing,
  horizontalStackCss,
  verticalStackCss,
  cssForMediaSize,
  MediaSize,
  useMatchesMediaSize,
  NotoSerif,
  NotoSansHK
};
