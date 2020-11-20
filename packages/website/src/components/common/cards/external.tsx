/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, Spring } from 'react-spring/renderprops';

import { CloudinaryImg } from 'components/common/cloudinary_img';
import { H3, P } from 'components/common/system';
import { A } from 'components/common/system/typography';

// import { setGaEvent } from 'routes/ga_tracking';
import { ProfileLinksProps } from 'components/pages/resumes/feed';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { socialUrl } from 'utilities';
// import { prettierUrl } from 'utilities';

export interface ProfileProps {
  name: string;
  slug: string;
  company: string;
  description: string;
  website: string;
  profileCloudinaryId: string;
  /** use first available */
  profileLinks: ProfileLinksProps[];
}

interface ExternalCardProps extends ProfileProps {
  children?: React.ReactNode;
}

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;
  word-break: break-word;

  /* between pic and header */
  > div {
    ${verticalStackCss.m};
    align-items: flex-start;
  }
`;

const STYLES_IMG = css`
  width: 100%;
  transition: opacity ease ${transitionTime.standard}ms;

  :hover {
    opacity: 0.85;
  }
`;

const ExternalCard: React.FC<ExternalCardProps> = React.memo((props) => {
  const {
    profileCloudinaryId,
    description,
    company,
    name,
    children,
    profileLinks
  } = props;

  const [ref, inView] = useInView({
    threshold: 0.25
  });
  return (
    <Spring
      native
      from={{ opacity: 0, transform: 'translateY(15%)' }}
      to={inView ? { opacity: 1, transform: 'translateY(0)' } : {}}
    >
      {(springProps) => (
        <animated.div ref={ref} style={springProps} css={STYLES_CARD}>
          <div>
            <A
              href={`${socialUrl({
                platform: profileLinks[0].platform,
                handle: profileLinks[0].handle
              })}`}
            >
              <CloudinaryImg
                contentCss={STYLES_IMG}
                cloudinaryId={profileCloudinaryId}
                alt={`${name}'s logo`}
              />
            </A>
            <H3>
              {name} - {company}
            </H3>
          </div>
          <P
            contentCss={css`
              color: ${theme.fontSecondaryGrey};
            `}
          >
            {description}
          </P>
          {children}
        </animated.div>
      )}
    </Spring>
  );
});
export default ExternalCard;
