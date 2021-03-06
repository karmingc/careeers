/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { animated, Spring } from 'react-spring/renderprops';

import { CloudinaryImg } from '../cloudinary_img';
import { H3, P } from '../system';
import { ProfileProps } from 'components/pages/resumes/feed';
import { setGaEvent } from 'routes/ga_tracking';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';

interface PreviewProps extends ProfileProps {
  path: string;
  margin: boolean;
  /**
   * for GA, knowing if it's from feed or related
   */
  source?: string;
}

const STYLES_CARD = ({ margin }: { margin: boolean }) => css`
  ${verticalStackCss.s}
  margin-bottom: ${margin ? rawSpacing.xxxxxl : 0}px;
  align-items: flex-start;
  text-decoration: none;

  > div {
    ${verticalStackCss.m}
    align-items: flex-start;
    width: 100%;
  }

  :hover {
    cursor: pointer;

    > div > img {
      opacity: 0.85;
    }
    > div > h3 {
      opacity: 0.75;
    }
  }
`;

/**
 * Resume preview card
 */
const PreviewCard: React.FC<PreviewProps> = React.memo((props) => {
  const {
    name,
    company,
    description,
    profileCloudinaryId,
    slug,
    path,
    margin,
    source
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
        <animated.div style={springProps}>
          <Link
            ref={ref}
            css={STYLES_CARD({ margin })}
            to={`/${path}/${slug}`}
            onClick={() => {
              setGaEvent({
                category: 'cards',
                action: `clicked from ${source}`,
                label: `/${path}/${slug}`
              });
            }}
          >
            <div>
              <CloudinaryImg
                contentCss={css`
                  width: 100%;
                  transition: all ease ${transitionTime.standard}ms;
                `}
                cloudinaryId={profileCloudinaryId}
                alt={`${name}'s profile image`}
              />
              <H3>
                {name} — {company}
              </H3>
            </div>
            <P
              contentCss={css`
                color: ${theme.fontSecondaryGrey};
              `}
            >
              {description}
            </P>
          </Link>
        </animated.div>
      )}
    </Spring>
  );
});

export default PreviewCard;
