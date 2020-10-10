/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { H5, P } from 'components/common/system';
import { horizontalStackCss, rawSpacing, verticalStackCss } from 'theme';

const ResourcesPage: React.FC = () => {
  const resources = [
    'feed',
    'communities',
    'courses',
    'books',
    'blogs',
    'videos',
    'podcasts',
    'practices',
    'stories'
  ];
  return (
    <div
      css={css`
        ${horizontalStackCss.m}
        width: 1000px;
      `}
    >
      <section>
        {resources.map((resource) => {
          return (
            <div
              key={resource}
              css={css`
                padding: ${rawSpacing.s}px;
                border-radius: 5px;
                transition: background-color ease 0.5s;
                :hover {
                  background-color: #e1e1e1;
                  cursor: pointer;
                }
              `}
            >
              {resource}
            </div>
          );
        })}
      </section>
      <section>
        <div
          css={css`
            ${verticalStackCss.m}

            border: 1px solid #e1e1e1;
            padding: ${rawSpacing.m}px;
          `}
        >
          <div
            css={css`
              ${horizontalStackCss.m}
              align-items: flex-start;
            `}
          >
            {' '}
            <img
              src={require('../../../medias/images/side.jpeg')}
              alt="resource"
            />
            <div
              css={css`
                ${verticalStackCss.m}
              `}
            >
              <H5>Article</H5>
              <H5
                contentCss={css`
                  font-weight: normal;
                `}
              >
                This is resource about career change...
              </H5>
            </div>
          </div>
          <span
            css={css`
              border-top: 1px solid #e1e1e1;
            `}
          ></span>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                background-color: #777777;
                padding: ${rawSpacing.s}px;
                border-radius: 5px;
                color: white;
              `}
            >
              weekly
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          css={css`
            ${verticalStackCss.xl}
            width: 200px;
            height: 200px;
            border: 1px solid #e1e1e1;
            text-align: center;
            padding: ${rawSpacing.m}px;
          `}
        >
          <P>quote of the day</P>
          <P>"Be Great"</P>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
