import { css, keyframes } from '@emotion/core';

const fadeInKey = keyframes`
  from, 0%, to {
    opacity: 0;
  }

  100% {
    opacity: 1
  }
`;

const fadeInAnim = css`
  animation: ${fadeInKey} 1500ms ease;
`;

export { fadeInAnim };
