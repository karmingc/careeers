import css, { SerializedStyles } from '@emotion/css';
import { useEffect, useState } from 'react';
import { mapValues } from 'utilities';

export enum MediaSize {
  PHONE = 'PHONE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  LARGE_DESKTOP = 'LARGE_DESKTOP'
}

const MediaSizeASC = [
  MediaSize.PHONE,
  MediaSize.TABLET,
  MediaSize.DESKTOP,
  MediaSize.LARGE_DESKTOP
];

const MediaSizeDESC = MediaSizeASC.slice(0).reverse();

/**
 * Breakpoints for the media queries
 * Phone: 0, 600
 * Tablet: 600, 899
 * Desktop: 900, 1199
 * Large Desktop: 1200
 */
const mediaBreakpoints: {
  [MediaSize.PHONE]: [number, number];
  [MediaSize.TABLET]: [number, number];
  [MediaSize.DESKTOP]: [number, number];
  [MediaSize.LARGE_DESKTOP]: [number];
} = {
  [MediaSize.PHONE]: [0, 599],
  [MediaSize.TABLET]: [600, 899],
  [MediaSize.DESKTOP]: [900, 1199],
  [MediaSize.LARGE_DESKTOP]: [1200]
};

/**
 * Mapping mediaBreakpoints and converting them to pixels
 */
const mediaQueries: { [key: string]: string[] } = mapValues({
  obj: mediaBreakpoints,
  mapper: (breakpoints: number[]) =>
    breakpoints.length <= 1
      ? [`${breakpoints[0]}px`]
      : [`${breakpoints[0]}px`, `${breakpoints[1]}px`]
});

/**
 * Returns the css for a given constraint on media size
 * @param props contentCss, min, max
 */
export const cssForMediaSize = (
  props: {
    contentCss: SerializedStyles | SerializedStyles[];
  } & (
    | ({ min: MediaSize } & {
        max?: Exclude<MediaSize, MediaSize.LARGE_DESKTOP>;
      })
    | ({ min?: MediaSize } & {
        max: Exclude<MediaSize, MediaSize.LARGE_DESKTOP>;
      })
  )
): SerializedStyles => {
  const { contentCss, min, max } = props;
  return css`
    @media ${[
        min && `(min-width: ${mediaQueries[min][0]})`,
        max && `(max-width: ${mediaQueries[max][1]})`
      ]
        .filter((query) => !!query)
        .join(' and ')} {
      ${contentCss}
    } ;
  `;
};

/**
 * Returns the first MediaSize that current window size is larger than
 * @param windowSize inner window width
 */
const minMediaSize = (windowSize: number) => {
  return (
    MediaSizeDESC.find((media) => windowSize >= mediaBreakpoints[media][0]) ||
    MediaSize.PHONE
  );
};

/**
 * Custom hook that returns MediaSize based on resizing
 */
export const useMediaSize = () => {
  const [currMediaSize, setMediaSize] = useState<MediaSize>(
    minMediaSize(window.innerWidth)
  );
  useEffect(() => {
    const handleResize = () => {
      setMediaSize(minMediaSize(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  return currMediaSize;
};

/**
 * Helper function to return the smallest media size
 * @param toCompare compare two MediaSize
 */
const compareMediaSizeMin = (props: {
  toCompare: [MediaSize, MediaSize];
}): MediaSize => {
  const { toCompare } = props;
  return toCompare
    .slice(0)
    .sort((a, b) => MediaSizeASC.indexOf(a) - MediaSizeASC.indexOf(b))[0];
};

/**
 * Helper function to return the largest media size
 * @param toCompare compare two MediaSize
 */
const compareMediaSizeMax = (props: {
  toCompare: [MediaSize, MediaSize];
}): MediaSize => {
  const { toCompare } = props;
  return toCompare
    .slice(0)
    .sort((a, b) => MediaSizeASC.indexOf(b) - MediaSizeASC.indexOf(a))[0];
};

/**
 * Returns boolean based on the media size constraints
 * @param props min & max MediaSize
 */
export const useMatchesMediaSize = (
  props:
    | ({ min: MediaSize } & {
        max?: Exclude<MediaSize, MediaSize.LARGE_DESKTOP>;
      })
    | ({ min?: MediaSize } & {
        max: Exclude<MediaSize, MediaSize.LARGE_DESKTOP>;
      })
): boolean | null => {
  const currMediaSize = useMediaSize();
  const { min, max } = props;
  if (currMediaSize === null) {
    return null;
  }
  const satisfyMinBound =
    !!currMediaSize &&
    !!min &&
    compareMediaSizeMin({ toCompare: [currMediaSize, min] }) === min;
  const satisfyMaxBound =
    !!currMediaSize &&
    !!max &&
    compareMediaSizeMax({ toCompare: [currMediaSize, max] }) === max;

  return !!min && !!max
    ? satisfyMinBound && satisfyMaxBound
    : satisfyMinBound || satisfyMaxBound;
};
