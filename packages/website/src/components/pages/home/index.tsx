/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Spring, config, animated } from 'react-spring/renderprops';

import { ProfileRecommendationsProps } from '../recommendations/feed';
import ResourcesCard from '../resources/card';
import { ResourcesProps } from '../resources/feed';
import { ProfileProps } from '../resumes/feed';
import { ExternalCard } from 'components/common/cards/external';
import PreviewCard from 'components/common/cards/preview';
import { CloudinaryImg } from 'components/common/cloudinary_img';
import { Icon, IconName, IconSize } from 'components/common/icons';
import CardGridLayout from 'components/common/layout/card_grid';
import { DefaultPageLayout } from 'components/common/layout/default_page';

import { A, H1, P } from 'components/common/system';
import { setGaEvent } from 'routes/ga_tracking';
import {
  cssForMediaSize,
  horizontalStackCss,
  MediaSize,
  rawSpacing,
  theme,
  transitionTime,
  useMatchesMediaSize,
  verticalStackCss
} from 'theme';
import { fontSize } from 'theme/styles/font';

interface HomeSectionProps {
  children: React.ReactNode;

  path: string;
}

const HomeSection: React.FC<HomeSectionProps> = React.memo((props) => {
  const { children, path } = props;
  return (
    <section
      css={css`
        ${verticalStackCss.l};
        align-items: flex-start;
        justify-content: flex-start;
      `}
    >
      {' '}
      <Link
        to={`/${path}`}
        onClick={() => {
          setGaEvent({
            category: 'page navigation',
            action: 'clicked from home',
            label: `/${path}`
          });
        }}
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

  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [resumes, setResumes] = useState<ProfileProps[]>();
  const [interviews, setInterviews] = useState<ProfileProps[]>();
  const [resources, setResources] = useState<ResourcesProps[]>();
  const [recommendations, setRecommendations] = useState<
    ProfileRecommendationsProps[]
  >();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const [
          resumesList,
          interviewsList,
          resourcesList,
          recommendationsList
        ] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_API_ORIGIN}/api/profiles/resumes/random`
          ),
          axios.get(
            `${process.env.REACT_APP_API_ORIGIN}/api/profiles/interviews/random`
          ),
          axios.get(`${process.env.REACT_APP_API_ORIGIN}/api/resources/random`),
          axios.get(
            `${process.env.REACT_APP_API_ORIGIN}/api/recommendations/random`
          )
        ]);
        setResumes(resumesList.data);
        setInterviews(interviewsList.data);
        setResources(resourcesList.data);
        setRecommendations(recommendationsList.data);
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
        ${verticalStackCss.xl};
        align-items: flex-start;
        justify-content: flex-start;
      `}
    >
      <div
        css={css`
          position: relative;
          overflow: hidden;
        `}
      >
        <Spring
          from={{ opacity: 0, transform: 'translateY(15%)' }}
          to={{ opacity: 1, transform: 'translateY(0%)' }}
          config={config.slow}
        >
          {(springProps) => (
            <H1
              style={springProps}
              contentCss={css`
                position: absolute;
                top: ${rawSpacing.xl}px;
                left: ${rawSpacing.xxl}px;
                color: ${theme.fontPrimaryWhite};
                z-index: 1;

                /* for small phones */
                ${cssForMediaSize({
                  max: MediaSize.PHONE,
                  contentCss: css`
                    ${fontSize.medium}em
                  `
                })}
              `}
            >
              Educate. <br />
              Empower. <br />
              Grow. <br />
              Together.
            </H1>
          )}
        </Spring>
        <Spring
          native
          from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
          to={{ opacity: 1, transform: 'translate(0%, 0%)' }}
          config={config.slow}
        >
          {(springProps) => (
            <animated.div style={springProps}>
              <CloudinaryImg
                cloudinaryId="careeers/base/support_af6lxm"
                alt="Two kids walking on a road"
                contentCss={css`
                  max-height: 500px;
                  object-fit: cover;
                  width: 100%;
                  z-index: 0;
                `}
                onLoad={() => {
                  setIsBannerLoaded(true);
                }}
              />
            </animated.div>
          )}
        </Spring>
      </div>

      {isBannerLoaded && interviews && (
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
                margin={false}
                source="home"
              />
            );
          })}
        </HomeSection>
      )}
      {isBannerLoaded && resumes && (
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
                margin={false}
                source="home"
              />
            );
          })}
        </HomeSection>
      )}
      {isBannerLoaded && resources && (
        <HomeSection path="resources">
          {resources.slice(0, isDesktop ? 4 : 2).map((resource) => {
            return (
              <ResourcesCard
                key={resource.name}
                name={resource.name}
                description={resource.description}
                link={resource.link}
                cloudinaryId={resource.cloudinaryId}
              />
            );
          })}
        </HomeSection>
      )}
      {isBannerLoaded && recommendations && (
        <HomeSection path="recommendations">
          {recommendations.slice(0, isDesktop ? 4 : 2).map((profile) => {
            return (
              <ExternalCard
                key={profile.name}
                name={profile.name}
                description={profile.description}
                profileCloudinaryId={profile.profileCloudinaryId}
                website={profile.website}
                slug={profile.slug}
                company={profile.company}
                profileLinks={profile.profileLinks}
                path="/home"
              >
                <span>~</span>
                <ul
                  css={css`
                    ${verticalStackCss.m}
                    list-style-type: none;
                    margin-top: ${rawSpacing.zero}px;
                    padding: 0;

                    > li {
                      /* margin: 0; */
                      ${verticalStackCss.s}
                      align-items: flex-start;
                      width: 100%;
                    }
                  `}
                >
                  {profile.recommendations.map((recommendation) => {
                    const { link, type, title, description } = recommendation;
                    if (type === 'RESOURCE' && link) {
                      return (
                        <li key={title}>
                          <A
                            href={link}
                            contentCss={css`
                              font-weight: bold;
                            `}
                            onClick={() => {
                              setGaEvent({
                                category: 'cards',
                                action: 'link clicked from home feed',
                                label: `${title}`
                              });
                            }}
                          >
                            {title}{' '}
                          </A>
                          <P>{description}</P>
                        </li>
                      );
                    }
                    return (
                      <li key={title}>
                        <P
                          contentCss={css`
                            font-weight: bold;
                          `}
                        >
                          {title}
                        </P>
                        <P>{description}</P>
                      </li>
                    );
                  })}
                </ul>
              </ExternalCard>
            );
          })}
        </HomeSection>
      )}
    </DefaultPageLayout>
  );
};

export default HomePage;
