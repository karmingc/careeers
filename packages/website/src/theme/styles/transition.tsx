import { css } from '@emotion/core';

/**
 * transition + animation speed
 */
const transitionTime = {
  /**
   * 500
   */
  standard: 500,
  overlay: 1000,
  menuIcon: 500
};

const STYLES_IMAGE_HOVER = css`
  transition: opacity ease 500ms;
  :hover {
    opacity: 0.85;
  }
`;
export { transitionTime, STYLES_IMAGE_HOVER };
