/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { DefaultPageLayout } from 'components/common/layout/default_page';
import { H1 } from 'components/common/system';
import { horizontalStackCss, theme } from 'theme';

const ResumePage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle={'Resume ID'}>
      <div
        css={css`
          ${horizontalStackCss.xxxl};
          justify-content: flex-start;
        `}
      >
        <img
          src={require('../../../media/images/karming_pdf.png')}
          alt="resume"
          css={css`
            width: 50%;
            border: 1px solid ${theme.activeGrey};
          `}
        />
        <div>
          <H1>Karming Chin</H1>
        </div>
      </div>
    </DefaultPageLayout>
  );
};
export default ResumePage;
