import { css } from '@emotion/core';
import { theme } from 'theme/';

export const globalStyle = css`
  body,
  textarea {
    margin: 0;
    font-family: 'Noto Sans HK', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.fontPrimaryGrey};
    background-color: ${theme.backgroundWhite};
  }

  /* html default values, can modify later if needed */
  /* visit /system/typography for more */
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.17em;
  }
  h4,
  p,
  a,
  button {
    font-size: 1em;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
