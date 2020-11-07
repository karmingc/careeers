/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import ResourcesCard from '../resources/card';
import Support from '../../../media/images/support.jpg';
import { ProfileProps } from '../resumes/feed';
import PreviewCard from 'components/common/cards/preview';
import { Icon, IconName, IconSize } from 'components/common/icons';
import CardGridLayout from 'components/common/layout/card_grid';
import { DefaultPageLayout } from 'components/common/layout/default_page';

import { H1 } from 'components/common/system';
import {
  fadeInAnim,
  horizontalStackCss,
  MediaSize,
  rawSpacing,
  theme,
  transitionTime,
  useMatchesMediaSize,
  verticalStackCss
} from 'theme';

interface HomeSectionProps {
  children: React.ReactNode;

  path: string;
}

const HomeSection: React.FC<HomeSectionProps> = React.memo((props) => {
  const { children, path } = props;
  return (
    <section
      css={css`
        ${verticalStackCss.xl};
        align-items: flex-start;
        justify-content: flex-start;
      `}
    >
      {' '}
      <Link
        to={path}
        css={css`
          ${horizontalStackCss.s}
          text-decoration: none;
          justify-content: flex-start;

          :hover {
            path {
              transform: translate(10%);
            }
          }
          :active {
            h1 {
              color: ${theme.blurStrongGrey};
            }
            path {
              fill: ${theme.blurStrongGrey};
            }
          }
        `}
      >
        <H1>{path.charAt(0).toUpperCase() + path.slice(1)}</H1>
        <Icon
          name={IconName.ArrowRight}
          size={IconSize.X_LARGE}
          contentcss={css`
            padding-top: 8px;
            path {
              transition: all ease ${transitionTime.standard}ms;
              fill: ${theme.activeGrey};
            }
          `}
        />
      </Link>
      <CardGridLayout>{children}</CardGridLayout>
    </section>
  );
});

const HomePage: React.FC = () => {
  const isDesktop = useMatchesMediaSize({ min: MediaSize.DESKTOP });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [resumes, setResumes] = useState<ProfileProps[]>();
  const [interviews, setInterviews] = useState<ProfileProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [resumesList, interviewsList] = await Promise.all([
          axios.get('/api/profiles/resumes/random'),
          axios.get('/api/profiles/interviews/random')
        ]);
        setResumes(resumesList.data);
        setInterviews(interviewsList.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DefaultPageLayout
      pageTitle="Home"
      isError={isError}
      isLoading={isLoading}
      contentCss={css`
        ${verticalStackCss.xxl};
        align-items: flex-start;
        justify-content: flex-start;
        ${fadeInAnim}
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <H1
          contentCss={css`
            position: absolute;
            top: ${rawSpacing.l}px;
            left: ${rawSpacing.xxl}px;
            color: ${theme.fontPrimaryWhite};
          `}
        >
          Educate. <br />
          Empower. <br />
          Grow. <br />
          Together.
        </H1>
        <img
          src={Support}
          alt="banner"
          css={css`
            max-height: 500px;
            object-fit: cover;
            width: 100%;
          `}
        />
      </div>
      {interviews && (
        <HomeSection path="interviews">
          {interviews.slice(0, isDesktop ? 4 : 2).map((interview) => {
            return (
              <PreviewCard
                key={interview.name}
                name={interview.name}
                company={interview.company}
                description={interview.description}
                profileCloudinaryId={interview.profileCloudinaryId}
                slug={interview.slug}
                path="interviews"
              />
            );
          })}
        </HomeSection>
      )}
      {resumes && (
        <HomeSection path="resumes">
          {resumes.slice(0, isDesktop ? 4 : 2).map((resume) => {
            return (
              <PreviewCard
                key={resume.name}
                name={resume.name}
                company={resume.company}
                description={resume.description}
                profileCloudinaryId={resume.profileCloudinaryId}
                slug={resume.slug}
                path="resumes"
              />
            );
          })}
        </HomeSection>
      )}
      {/* <HomeSection path="resources">
        <ResourcesCard />
      </HomeSection> */}
    </DefaultPageLayout>
  );
};

export default HomePage;
