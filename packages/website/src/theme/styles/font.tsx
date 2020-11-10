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
  x_small: 0.87,
  /**
   * p size, used for normal text
   */
  small: 1,
  /**
   * h3 size, card title, headers for p size
   */
  medium: 1.17,
  /**
   * h2 size - page sub titles
   */
  large: 1.5,
  /**
   * h1 size - used for page titles
   */
  x_large: 2
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
