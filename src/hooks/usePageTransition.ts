import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const location = useLocation();

  return {
    key: location.pathname,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  };
};
