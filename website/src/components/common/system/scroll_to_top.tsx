import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/**
 *
 */
const ScrollToTop: React.FC = () => {
  const { action } = useHistory();
  const { pathname } = useLocation();
  const [currPath, setPath] = useState(pathname);

  useEffect(() => {
    // don't scroll to the top when navigating around history
    // const prevPathname = currPath;
    if (pathname !== currPath) {
      setPath(pathname);
    }

    if (
      action !== 'POP'
      // don't scroll to top if path name didnt change
      //   stripTrailingSlash(prevPathname) !== stripTrailingSlash(pathname)
    ) {
      window.scrollTo({
        left: 0,
        top: 0
      });
    }
  }, [pathname, action, currPath]);

  return null;
};

export default ScrollToTop;
