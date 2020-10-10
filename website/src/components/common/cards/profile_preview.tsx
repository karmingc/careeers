/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React from 'react';
import { horizontalStackCss, rawSpacing, theme } from 'theme';
import { H5 } from '../system';

interface ProfileProps {
  onClick?: () => void;
  profile: {
    name: string;
    position: string;
    profileImg: string;
    profilePdf: string;
    company: string;
  };
}
/**
 * Profile Preview Card
 */
// const ProfilePreview: React.FC<ProfileProps> = ({}) => {
const ProfilePreview = React.memo<ProfileProps>(function ProfilePreviewImpl(
  props
) {
  const { name, position, profileImg, profilePdf, company } = props.profile;
  const { onClick } = props;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={onClick}
      css={css`
        min-width: 300px;
        height: 375px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 7px 65px 0px rgba(0, 0, 0, 0.15);
        margin-top: ${rawSpacing.xxl}px;
      `}
    >
      <section
        css={css`
          height: 275px;
          overflow: hidden;
        `}
      >
        {' '}
        <img
          alt="company logo"
          src={profilePdf}
          css={css`
            width: 300px;
            object-fit: cover;
          `}
        />
      </section>
      <section
        css={css`
          ${horizontalStackCss.m}

          box-sizing: border-box;
          height: 100px;
          width: 300px;
          padding: ${rawSpacing.m}px;
        `}
      >
        <img
          alt="profile"
          src={profileImg}
          css={css`
            width: 56px;
            height: 56px;
            border-radius: 50%;
          `}
        />
        <div>
          <H5>{name}</H5>
          <span
            css={css`
              font-size: 12px;
              color: ${theme.textSecondaryPurple};
            `}
          >
            {position}
          </span>
        </div>
        <img
          alt="company logo"
          src={require(`../../../medias/icons/${company}.svg`)}
          css={css`
            width: 40px;
            height: 40px;
          `}
        />
      </section>
    </div>
  );
});
export default ProfilePreview;
