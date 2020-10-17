import css from '@emotion/css';

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
 * font size
 */
export const fontSize = {
  /**
   * h5 size
   */
  x_small: 13.28,
  /**
   * p size, used for normal text
   */
  small: 16,
  /**
   * h3 size, card title, headers for p size
   */
  medium: 18.72,
  /**
   * h2 size - page sub titles
   */
  large: 24,
  /**
   * h1 size - used for page titles
   */
  x_large: 32
};

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
