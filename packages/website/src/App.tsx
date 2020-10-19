/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { globalStyle } from 'theme/styles/global';

import Header from 'components/common/header';
import Footer from 'components/common/footer';

import NotFoundPage from 'components/common/layout/not_found';
import ScrollToTop from 'components/common/system/scroll_to_top';

import ResumesFeed from 'components/pages/resumes/feed';

import InterviewsFeed from 'components/pages/interviews/feed';
// import AboutPage from 'components/pages/about';
import ResumePage from 'components/pages/resumes';
import PrivacyPage from 'components/pages/privacy';
import InterviewPage from 'components/pages/interviews';
import ResourcesFeed from 'components/pages/resources/feed';
import HomePage from './components/pages/home';

const App = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <Global styles={globalStyle} />
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/resumes" component={ResumesFeed} />
          <Route exact path="/resumes/:id" component={ResumePage} />
          <Route exact path="/interviews" component={InterviewsFeed} />
          <Route exact path="/interviews/:id" component={InterviewPage} />
          <Route
            exact
            path={['/resources', '/resources/page/:pageId']}
            component={ResourcesFeed}
          />
          {/* <Route exact path="/about" component={AboutPage} /> */}
          <Route exact path="/privacy" component={PrivacyPage} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
