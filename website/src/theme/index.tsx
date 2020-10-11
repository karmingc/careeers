import { truncateText } from 'theme/styles/font';
import {
  rawSpacing,
  horizontalStackCss,
  verticalStackCss,
  calcSpaceConstraints
} from 'theme/styles/spacing';
import {
  cssForMediaSize,
  MediaSize,
  useMatchesMediaSize
} from './mediaQueries';

/* Heavily inspired from Flat Design
https://htmlcolorcodes.com/color-chart/flat-design-color-chart/
*/

/**
 * palette used everywhere in app
 */
export const palette = {
  lightSky: '#ffffff',
  black: '#000000',
  secondaryBlack: 'rgba(0,0,0,0.8)',
  lightPurple: '#f8f8fb',
  purple: '#495378',
  secondaryPurple: 'rgba(73,83,120, 0.8)',
  orange: '#EE7367'
};

/**
 * zIndex for components
 */
export const zIndex = {
  page: 1,
  header: 2,
  sidebar: 3,
  modal: 4
};

/**
 * Global theme used throughout
 */
export const theme = {
  background: palette.lightSky,
  backgroundSecondary: palette.lightPurple,
  textPrimaryBlack: palette.black,
  textSecondaryBlack: palette.secondaryBlack,
  textPrimaryPurple: palette.purple,
  textSecondaryPurple: palette.secondaryPurple
};

export {
  truncateText,
  calcSpaceConstraints,
  rawSpacing,
  horizontalStackCss,
  verticalStackCss,
  cssForMediaSize,
  MediaSize,
  useMatchesMediaSize
};
