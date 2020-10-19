import { useLocation } from 'react-router-dom';
import { findPathPageNumber } from 'utilities';

/**
 * Custom hook to determine specific path's page number
 */
export const useMatchesPathPageNumber = (): number => {
  const { pathname } = useLocation();
  const currPathPageNumber = findPathPageNumber(pathname);

  return isNaN(currPathPageNumber) ? 1 : currPathPageNumber;
};
