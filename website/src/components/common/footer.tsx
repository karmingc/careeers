/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { theme } from 'theme';

const Footer: React.FC = () => {
  return (
    <footer
      css={css`
        height: 100px;
        width: 100%;
        background-color: ${theme.backgroundGrey};
      `}
    >
      hi
    </footer>
  );
};

export default Footer;
