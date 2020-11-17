/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, Spring } from 'react-spring/renderprops';

import { ResourcesProps } from './feed';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { H3, P } from 'components/common/system';
import { A } from 'components/common/system/typography';
import { setGaEvent } from 'routes/ga_tracking';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';
import { prettierUrl } from 'utilities';

const STYLES_CARD = css`
  ${verticalStackCss.s}
  margin-bottom: ${rawSpacing.xxxxl}px;
  align-items: flex-start;
  text-decoration: none;
  word-break: break-word;

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

const ResourcesCard: React.FC<ResourcesProps> = React.memo((props) => {
  const { cloudinaryId, description, link, name } = props;
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
              href={link}
              onClick={() => {
                setGaEvent({
                  category: 'cards',
                  action: 'image clicked from resources feed',
                  label: `${name}`
                });
              }}
            >
              <CloudinaryImg
                contentCss={STYLES_IMG}
                cloudinaryId={cloudinaryId}
                alt={`${name}'s logo`}
              />
            </A>
            <H3>{name}</H3>
          </div>
          <P
            contentCss={css`
              color: ${theme.fontSecondaryGrey};
            `}
          >
            {description}
          </P>
          <A
            href={link}
            contentCss={css`
              word-wrap: break-word;
            `}
            onClick={() => {
              setGaEvent({
                category: 'cards',
                action: 'link clicked from resources feed',
                label: `${name}`
              });
            }}
          >
            {prettierUrl(link)}
          </A>
        </animated.div>
      )}
    </Spring>
  );
});
export default ResourcesCard;
