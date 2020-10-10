/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { globalStyle } from 'theme/styles/global';

import Header from 'components/common/header';
import Footer from 'components/common/footer';
import HomePage from './components/pages/home';
import ResourcesPage from './components/pages/resources';

const App = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > * {
          width: 85%;
        }
      `}
    >
      <Global styles={globalStyle} />
      <Router>
        <Header />
        <Switch>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
          >
            <Route exact path="/" component={HomePage} />
            <Route exact path="/resources" component={ResourcesPage} />
          </div>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
