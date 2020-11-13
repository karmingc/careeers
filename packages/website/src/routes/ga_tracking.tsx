import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

export const useGaPageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_GA_MEASUREMENT_ID}`);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};
