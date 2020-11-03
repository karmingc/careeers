import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findPathPageNumber, findPathSlugId } from 'utilities';

/**
 * Custom hook to determine specific path's page number
 */
export const useMatchesPathPageNumber = (): number => {
  const { pathname } = useLocation();
  const currPathPageNumber = findPathPageNumber(pathname);

  return isNaN(currPathPageNumber) ? 1 : currPathPageNumber;
};

/**
 * Custom hook to determine the specific path's slug
 */
export const useMatchesPathSlugId = () => {
  const { pathname } = useLocation();
  const [slug, setSlug] = useState(findPathSlugId(pathname));

  useEffect(() => {
    setSlug(findPathSlugId(pathname));
  }, [pathname]);

  return slug;
};

export enum Scroll {
  UP = 'SCROLL_UP',
  DOWN = 'SCROLL_DOWN'
}

/**
 * Custom hook to determine scroll direction, helps with display of header
 */
export const useMatchesScrollDirection = () => {
  const [prevPosition, setPrevPosition] = useState(window.pageYOffset);
  const [scrollDirection, setScrollingDirection] = useState<
    Scroll.UP | Scroll.DOWN
  >(Scroll.UP);

  useEffect(() => {
    const handleScroll = () => {
      const currPosition = window.pageYOffset;

      if (prevPosition + 200 <= currPosition) {
        setPrevPosition(currPosition);
        setScrollingDirection(Scroll.DOWN);
      } else if (prevPosition - 200 >= currPosition) {
        setPrevPosition(currPosition);
        setScrollingDirection(Scroll.UP);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevPosition]);

  return scrollDirection;
};
