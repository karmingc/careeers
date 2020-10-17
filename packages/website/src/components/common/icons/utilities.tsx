import { css, SerializedStyles } from '@emotion/core';

/**
 * x_small: 12, small: 16, medium_small: 20
 * medium: 24, large, 32,  x_large: 36
 */
export enum IconSize {
  X_SMALL = 'X_SMALL',
  SMALL = 'SMALL',
  MEDIUM_SMALL = 'MEDIUM_SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  X_LARGE = 'X_LARGE'
}

export const dimensionsForIconSize = {
  [IconSize.X_SMALL]: 12,
  [IconSize.SMALL]: 16,
  [IconSize.MEDIUM_SMALL]: 20,
  [IconSize.MEDIUM]: 24,
  [IconSize.LARGE]: 32,
  [IconSize.X_LARGE]: 36
};

export interface IconBaseProps {
  size: IconSize;
  contentcss?: SerializedStyles | SerializedStyles[];
}

function iconDimensionsCss({ size }: IconBaseProps): SerializedStyles {
  return css`
    display: block;
    width: ${dimensionsForIconSize[size]}px;
    height: ${dimensionsForIconSize[size]}px;
  `;
}

export function iconCss(props: IconBaseProps): SerializedStyles {
  return css`
    ${iconDimensionsCss(props)}
    ${props.contentcss}
  `;
}

export enum IconName {
  ArrowLeft,
  ArrowRight
}

export interface IconProps extends IconBaseProps {
  name: IconName;
  onClick?: () => void;
}
