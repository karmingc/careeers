/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { globalStyle } from 'theme/styles/global';

import Header from 'components/common/header';
import Footer from 'components/common/footer';
import HomePage from './components/pages/home';
import NotFoundPage from 'components/common/layout/not_found';
import ScrollToTop from 'components/common/system/scroll_to_top';
import ResumesFeed from 'components/pages/resumes/feed';
import ResourcesPage from 'components/pages/resources';
import InterviewsPage from 'components/pages/interviews';
import AboutPage from 'components/pages/about';
import ResumePage from 'components/pages/resumes';

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
          <Route exact path="/interviews" component={InterviewsPage} />
          <Route exact path="/resources" component={ResourcesPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
