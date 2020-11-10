import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/**
 *
 */
const ScrollToTop: React.FC = () => {
  const { action } = useHistory();
  const { pathname } = useLocation();
  const [currPath, setCurrPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currPath) {
      setCurrPath(pathname);
    }

    if (action !== 'POP') {
      window.scrollTo({
        left: 0,
        top: 0
      });
    }
  }, [pathname, action, currPath]);

  return null;
};

export default ScrollToTop;
