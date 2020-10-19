/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import css, { SerializedStyles } from '@emotion/css';

import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  rawSpacing,
  verticalStackCss
} from 'theme/';
import { H1, H2, P } from 'components/common/system';

import { DefaultPageLayout } from 'components/common/layout/default_page';
import { fontSize } from 'theme/styles/font';

const AppUrl = 'Careeers';
const AppName = 'Careeers';

interface SectionProps {
  title?: string;
  text?: string;
  children?: React.ReactNode;
  contentCss?: SerializedStyles;
}

export const PrivacySection: React.FC<SectionProps> = ({
  title,
  text,
  children,
  contentCss
}) => {
  return (
    <section
      css={[
        css`
          ${verticalStackCss.m};
          align-items: flex-start;
        `,
        contentCss
      ]}
    >
      {title && (
        <H2
          contentCss={css`
            text-transform: uppercase;
          `}
        >
          {title}
        </H2>
      )}
      {text && (
        <P
          contentCss={css`
            font-size: ${fontSize.medium}px;
          `}
        >
          {text}
        </P>
      )}
      {children}
    </section>
  );
};

const STYLES_MAIN = css`
  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      ${verticalStackCss.xxxl};
      align-items: flex-start;
      justify-content: flex-start;

      /* consistent with resume one */
      div:first-of-type {
        width: 100%;
      }
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      ${horizontalStackCss.xxxl}
      justify-content: space-between;
      align-items: flex-start;

      /* consistent with resume one */
      div:first-of-type {
        width: 30%;
      }
    `
  })}
`;

const STYLES_CONTENT = css`
  ${verticalStackCss.xxxl}

  align-items: flex-start;

  ${cssForMediaSize({
    max: MediaSize.TABLET,
    contentCss: css`
      width: 100%;
    `
  })}

  ${cssForMediaSize({
    min: MediaSize.DESKTOP,
    contentCss: css`
      margin-top: ${rawSpacing.m}px;
      width: 70%;
    `
  })}
`;
const PrivacyPage: React.FC = () => {
  return (
    <DefaultPageLayout pageTitle="Privacy" contentCss={STYLES_MAIN}>
      <div>
        <H1>Privacy</H1>
      </div>
      <div css={STYLES_CONTENT}>
        <PrivacySection
          title="ONLINE PRIVACY POLICY"
          text={`By using or accessing ${AppUrl} in any manner, you acknowledge that
          you accept the practices and policies outlined below, and you hereby
          consent that we will collect, use and share your information as
          described in this Online Privacy Policy.`}
        />
        <PrivacySection
          title="Cookies"
          text="Our website uses cookies to improve user experience. If you do not feel comfortable about it, please consider clearing your cookies or disabling them."
        />
        <PrivacySection
          title="License"
          text={`Unless stated otherwise, ${AppName} and/or its licensors own all the intellectual property rights to all the materials on ${AppUrl}. All intellectual property rights are reserved. You may access this from ${AppUrl} for your personal use subjected to restrictions established by our site.`}
        />
        <PrivacySection title="You must not in any situation:">
          {' '}
          <li>Reproduce, duplicate or copy material from {AppUrl}</li>
          <li>Redistribute, sell, rent or sub-license content from {AppUrl}</li>
        </PrivacySection>
        <PrivacySection
          title={"Children's Information"}
          text={`${AppName} does not knowingly collect any personal information from children under the age of 13. If you think your child provided this kind of information on our website, we encourage you to contact us and we'll remove any information from our records.`}
        />
        <PrivacySection
          title="Support"
          text="If there is any unanswered issues, policies or conditions, do not hesitate to contact us."
        />
      </div>
    </DefaultPageLayout>
  );
};

export default PrivacyPage;
