/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { H1, H4 } from 'components/common/system';
import { palette, rawSpacing, theme, verticalStackCss } from 'theme';

const Banner: React.FC = () => {
  const features = [
    { category: 'resumes', amount: 74 },
    { category: 'industries', amount: 10 },
    { category: 'companies', amount: 10 },
    { category: 'resources', amount: 65 }
  ];
  return (
    <section
      css={css`
        display: flex;
        height: 500px;
        width: 1000px;
        background-color: ${theme.backgroundSecondary};
        border-radius: 25px;

        @media only screen and (max-width: 768px) {
          position: relative;
          margin-top: 200px;
          padding-top: 50px;
          flex-direction: column;
          width: 305px;
        }
      `}
    >
      <div
        css={css`
          ${verticalStackCss.l}

          @media only screen and (min-width: 769px) {
            width: 350px;
            margin: auto;
          }

          @media only screen and (max-width: 768px) {
            padding: ${rawSpacing.xl}px;
            margin: auto;
          }
        `}
      >
        <H1>Discover and learn.</H1>
        <H4
          contentCss={css`
            color: ${theme.textSecondaryPurple};
            font-weight: lighter;
            line-height: 1.5;
          `}
        >
          A collection of resumes and resources to increase your chances of
          landing your next software engineering internship
        </H4>
        <div
          css={css`
            display: flex;

            @media only screen and (min-width: 769px) {
              div {
                border-right: 1px solid #e5e5ed;
                padding: ${rawSpacing.m}px;
              }

              div:first-child {
                padding-left: 0px;
              }

              div:last-child {
                border-right: 1px solid ${theme.backgroundSecondary};
              }
            }

            @media only screen and (max-width: 768px) {
              flex-wrap: wrap;
              justify-content: center;

              > div {
                width: 100px;
              }

              div:nth-of-type(n + 3) {
                margin-top: ${rawSpacing.m}px;
              }
            }
          `}
        >
          {features.map((feature) => {
            const { category, amount } = feature;
            return (
              <div
                key={category}
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                `}
              >
                <H1
                  contentCss={css`
                    font-size: 40px;
                    font-weight: normal;
                  `}
                >
                  {amount}
                </H1>
                <H4
                  contentCss={css`
                    margin-top: ${rawSpacing.s}px;
                    font-weight: lighter;
                    color: ${theme.textSecondaryPurple};
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </H4>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          css={css`
            margin-right: auto;
            padding: ${rawSpacing.l}px ${rawSpacing.xxxl}px;
            background-color: ${palette.purple};
            color: ${theme.background};
            font-size: 16px;
            font-weight: bold;
            border-radius: 50px;
            outline: none;
            border: none;

            @media only screen and (max-width: 768px) {
              display: none;
            }
          `}
        >
          Browse Resumes
        </button>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          width: 50%;
        `}
      >
        <img
          css={css`
            width: 350px;

            @media only screen and (max-width: 768px) {
              position: absolute;
              top: -25%;
              left: 50%;
              transform: translate(-50%);
              width: 150px;
            }
          `}
          src={require('../../../medias/icons/resume.svg')}
          alt="resume icon"
        />
      </div>
    </section>
  );
};

export default Banner;
