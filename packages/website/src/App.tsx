/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProviders } from 'context';

import { Routes } from 'routes';

import { globalStyle } from 'theme/styles/global';

const App = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 100vh;
      `}
    >
      <Global styles={globalStyle} />
      <Router>
        <ContextProviders>
          <Routes />
        </ContextProviders>
      </Router>
    </div>
  );
};

export default App;
