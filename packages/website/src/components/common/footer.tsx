/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import { H1, A } from './system';
import { setGaEvent } from 'routes/ga_tracking';
import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  size,
  theme,
  transitionTime,
  verticalStackCss
} from 'theme';
import { fontSize, NotoSerif } from 'theme/styles/font';

const STYLES_FOOTER = css`
  box-sizing: border-box;
  background-color: ${theme.backgroundGrey};

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      ${verticalStackCss.xl}
      align-items: flex-start;

      width: ${size.page.width.tablet};
      padding: ${size.footer.padding.tablet};
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      width: ${size.page.width.desktop};
      padding: ${size.footer.padding.desktop};
      ${horizontalStackCss.zero}
      justify-content: space-between;
    `
  })}
`;

const STYLES_LOGO_SECTION = css`
  ${verticalStackCss.s}
  align-items: flex-start;
  h1 {
    ${NotoSerif}
  }
  h1,
  span {
    color: ${theme.fontPrimaryWhite};
  }
  span {
    font-size: ${fontSize.x_small}em;
  }
`;
const STYLES_NAV_SECTION = css`
  ${horizontalStackCss.xl};

  a,
  span {
    font-weight: bolder;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    color: ${theme.fontPrimaryWhite};
    transition: border-bottom ease ${transitionTime.standard}ms;

    :hover {
      color: ${theme.fontPrimaryWhite};
      border-bottom: 1px solid ${theme.fontPrimaryWhite};
    }
  }
`;

const Footer: React.FC = () => {
  const gaPrivacy = () => {
    setGaEvent({
      category: 'page navigation',
      action: 'clicked from footer',
      label: '/privacy'
    });
  };

  const gaEmail = () => {
    setGaEvent({
      category: 'page navigation',
      action: 'clicked from footer',
      label: '/email'
    });
  };

  const gaGithub = () => {
    setGaEvent({
      category: 'page navigation',
      action: 'clicked from footer',
      label: '/github'
    });
  };

  return (
    <footer css={STYLES_FOOTER}>
      <div css={STYLES_LOGO_SECTION}>
        <H1>Careeers.</H1>
        <span>© 2020 Careeers. All rights reserved.</span>
      </div>
      <div css={STYLES_NAV_SECTION}>
        <Link to="/privacy" onClick={gaPrivacy}>
          Privacy
        </Link>
        <A href="mailto:support@careeers.org" onClick={gaEmail}>
          Email
        </A>
        <A href="mailto:submission@careeers.org" onClick={gaEmail}>
          Submit
        </A>
        <A href="https://github.com/karmingc/careeers" onClick={gaGithub}>
          Github
        </A>
      </div>
    </footer>
  );
};

export default Footer;
