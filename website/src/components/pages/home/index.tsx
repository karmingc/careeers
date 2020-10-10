/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ProfilePreview from 'components/common/cards/profile_preview';
import ModalComponent from 'components/common/modal';
import { useState } from 'react';
import { horizontalStackCss, rawSpacing, theme, verticalStackCss } from 'theme';

import { ProfileCard, ExperienceCard } from 'components/common/cards/';
import { H2, H3 } from 'components/common/system';

import Banner from './banner';

const HomePage: React.FC = () => {
  const [isOpen, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const profiles = [
    {
      name: 'Karming C.',
      position: 'Software Engineer Intern',
      profileImg: require('../../../medias/images/side.jpeg'),
      profilePdf: require('../../../medias/images/karming_pdf.png'),
      company: 'linkedin'
    },
    {
      name: 'Karming Chi.',
      position: 'Software Engineer Intern',
      profileImg: require('../../../medias/images/side.jpeg'),
      profilePdf: require('../../../medias/images/karming_pdf.png'),
      company: 'linkedin'
    },
    {
      name: 'Karming Chino.',
      position: 'Software Engineer Intern',
      profileImg: require('../../../medias/images/side.jpeg'),
      profilePdf: require('../../../medias/images/karming_pdf.png'),
      company: 'linkedin'
    }
  ];
  return (
    <div
      css={css`
        ${verticalStackCss.xxxl}
        align-items: center;

        @media only screen and (min-width: 769px) {
          width: 1000px;
        }
      `}
    >
      <Banner />
      <ModalComponent isOpen={isOpen} closeModal={closeModal}>
        <div
          css={css`
            ${verticalStackCss.xxxl}
            width: 90vw;
            margin-bottom: ${rawSpacing.xxxl}px;
          `}
        >
          <section
            css={css`
              ${horizontalStackCss.xxxl}
              align-items: flex-start;
            `}
          >
            <img
              alt="resume"
              src={require('../../../medias/images/karming_pdf.png')}
              css={css`
                width: 600px;
              `}
            />
            <div
              css={css`
                ${verticalStackCss.l}
              `}
            >
              <ProfileCard />
              <ExperienceCard />
            </div>
          </section>
          <section>
            <H3
              contentCss={css`
                color: ${theme.background};
              `}
            >
              Other interns from Twitter
            </H3>
            <div
              css={css`
                ${horizontalStackCss.l}
              `}
            >
              <ProfilePreview profile={profiles[0]} />
              <ProfilePreview profile={profiles[0]} />
              <ProfilePreview profile={profiles[0]} />
            </div>
          </section>
        </div>
      </ModalComponent>
      <div
        css={css`
          padding: ${rawSpacing.xl}px;
          background-color: white;
          box-shadow: 0 7px 65px 0px rgba(0, 0, 0, 0.15);
          border-radius: 25px;
        `}
      >
        <label htmlFor="company">
          <div
            css={css`
              ${horizontalStackCss.m}
            `}
          >
            <H2>Company</H2>
            <select
              name="company"
              css={css`
                padding: ${rawSpacing.s}px;
              `}
            >
              <option disabled selected>
                Choose a company
              </option>
              <option>swag</option>
            </select>
          </div>
        </label>
      </div>
      <section
        css={css`
          @media only screen and (min-width: 769px) {
            display: flex;

            flex-wrap: wrap;

            div {
              margin-right: 50px;
            }

            div:nth-of-type(3n) {
              margin-right: 0px;
            }
          }

          @media only screen and (max-width: 768px) {
            display: block;
          }
        `}
      >
        {profiles.map((profile) => {
          const { name } = profile;
          return (
            <ProfilePreview key={name} profile={profile} onClick={openModal} />
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
