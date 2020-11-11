/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import { CloudinaryImg } from '../cloudinary_img';
import { H3, P } from '../system';
import { ProfileProps } from 'components/pages/resumes/feed';
import { rawSpacing, theme, transitionTime, verticalStackCss } from 'theme';

interface PreviewProps extends ProfileProps {
  path: string;
  margin: boolean;
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
    margin
  } = props;

  const [ref, inView] = useInView({
    threshold: 0.25
  });

  return (
    <Spring
      from={{ opacity: 0, transform: 'translateY(15%)' }}
      to={inView ? { opacity: 1, transform: 'translateY(0)' } : {}}
    >
      {(springProps) => (
        <Link
          ref={ref}
          style={springProps}
          css={STYLES_CARD({ margin })}
          to={`/${path}/${slug}`}
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
      )}
    </Spring>
  );
});

export default PreviewCard;
