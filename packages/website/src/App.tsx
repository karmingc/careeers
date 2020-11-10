/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import AOS from 'aos';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'aos/dist/aos.css';

import HomePage from './components/pages/home';
import Footer from 'components/common/footer';
import Header from 'components/common/header';

import NotFoundPage from 'components/common/layout/not_found';
import ScrollToTop from 'components/common/system/scroll_to_top';

import InterviewPage from 'components/pages/interviews';
import InterviewsFeed from 'components/pages/interviews/feed';
// import AboutPage from 'components/pages/about';
import PrivacyPage from 'components/pages/privacy';
import ResourcesFeed from 'components/pages/resources/feed';
import ResumePage from 'components/pages/resumes';
import ResumesFeed from 'components/pages/resumes/feed';
import { ContextProviders } from 'context';
import { globalStyle } from 'theme/styles/global';

AOS.init();

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
      <ContextProviders>
        <Router>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path={['/resumes', '/resumes/page/:pageId']}
              component={ResumesFeed}
            />
            <Route exact path="/resumes/:id" component={ResumePage} />
            <Route
              exact
              path={['/interviews', '/interviews/page/:id']}
              component={InterviewsFeed}
            />
            <Route exact path="/interviews/:id" component={InterviewPage} />
            <Route
              exact
              path={['/resources', '/resources/page/:id']}
              component={ResourcesFeed}
            />
            {/* <Route exact path="/about" component={AboutPage} /> */}
            <Route exact path="/privacy" component={PrivacyPage} />

            <Route path="*" component={NotFoundPage} />
          </Switch>
          <Footer />
        </Router>
      </ContextProviders>
    </div>
  );
};

export default App;
