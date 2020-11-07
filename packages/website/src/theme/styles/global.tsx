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

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
