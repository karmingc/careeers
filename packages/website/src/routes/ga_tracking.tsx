import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

// currently using ga universal analytics as react-ga
// does not seem to support GA4 at the moment

export const useGaPageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(`${process.env.REACT_APP_GA_MEASUREMENT_ID}`);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export const setGaEvent = ({
  category,
  action,
  label
}: {
  category: string;
  action: string;
  label: string;
}) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};

export const setGaError = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.exception({
      description: 'An error ocurred',
      fatal: true
    });
  }
};
