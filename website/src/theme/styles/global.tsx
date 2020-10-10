import { css } from '@emotion/core';
import { theme } from 'theme/';

export const globalStyle = css`
  body,
  textarea {
    margin: 0;
    font-family: 'Fira Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;

    height: 100%;
    background-color: ${theme.background};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
