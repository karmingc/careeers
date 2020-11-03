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
