import css, { SerializedStyles } from '@emotion/css/macro';
import { mapValues } from 'utilities/index';
import { rawSpacing } from 'theme/styles/spacing';

// font families
/**
 * Font for articles
 */
export const NotoSerif = css`
  font-family: 'Noto Serif', serif;
`;

/**
 * General font used
 */
export const NotoSansHK = css`
  font-family: 'Noto Sans HK', sans-serif;
`;

/**
 * text sizes
 */
const rawTextSize = {
  text: 14,
  title: 16,
  sectionHeader: 18.72,
  header: 24
};

/**
 * font size used throughtout
 * refer to rawTextSize for sizing
 * text: 13.28 / h5, title: 16 / h4, sectionHeader: 18.72 / h3, header: 24 /h2
 */
export const fontSize: {
  [key: string]: SerializedStyles;
} = mapValues({
  obj: rawTextSize,
  mapper: (sizePx: number) => css`
    font-size: ${sizePx}px;
  `
});

/**
 * truncating text to # maxLine
 * need to verify if cross-browser
 */
export const truncateText = (maxLine: number) => {
  return css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${maxLine};
    -webkit-box-orient: vertical;
  `;
};

/* styles for font */
export const STYLES_FONT_NORMAL = css`
  font-weight: 400;
`;

export const STYLES_FONT_HEIGHT = css`
  line-height: 1.5;
`;

export const STYLES_FONT_UPPERCASE = css`
  text-transform: uppercase;
`;

/**
 * margins for normal H2
 */
export const STYLES_H2_SPACING = css`
  margin-top: ${rawSpacing.xl}px;
  margin-bottom: ${rawSpacing.xl}px;
`;
