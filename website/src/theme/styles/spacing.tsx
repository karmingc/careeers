import css, { SerializedStyles } from '@emotion/css/macro';
import { mapValues } from 'utilities/index';

/**
 * Spacing in terms of pixels
 * usinng 8pt grid
 * xs: 4, s: 8, m: 16, l: 24, xl: 32
 * xxl: 40, xxxl: 48, xxxxl: 56
 */
export const rawSpacing = {
  zero: 0,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  xxxxl: 56
};

/**
 * Horizontal flex display
 * xs: 4, s: 8, m: 16, l: 24, xl: 32
 * xxl: 40, xxxl: 48, xxxxl: 56
 */
export const horizontalStackCss: {
  [key: string]: SerializedStyles;
} = mapValues({
  obj: rawSpacing,
  mapper: (sizePx: number) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > :not(:last-child) {
      margin-right: ${sizePx}px;
    }

    > *:last-child {
      margin-right: 0px;
    }
  `
});

/**
 * Vertical flex display
 * xs: 4, s: 8, m: 16, l: 24, xl: 32
 * xxl: 40, xxxl: 48, xxxxl: 56
 */
export const verticalStackCss: {
  [key: string]: SerializedStyles;
} = mapValues({
  obj: rawSpacing,
  mapper: (sizePx: number) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > :not(:last-child) {
      margin-bottom: ${sizePx}px;
    }

    > *:last-child {
      margin-bottom: 0px;
    }
  `
});

/**
 * Space constraints to subtract from each card width
 * @param cardsPerRow self explanatory
 * @param paddingInCard self explanatory
 */
export const calcSpaceConstraints = ({
  spacing,
  cardsPerRow,
  paddingInCard
}: {
  spacing: number;
  cardsPerRow: number;
  paddingInCard: number;
}) => {
  // keep spacing constant throughout cards
  const totalSpacing = spacing * (cardsPerRow - 1);
  const totalBorder = 2 * cardsPerRow;
  const totalPadding = 2 * paddingInCard * cardsPerRow;

  return totalSpacing + totalBorder + totalPadding;
};
