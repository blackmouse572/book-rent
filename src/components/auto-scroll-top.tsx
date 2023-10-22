import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AutoScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    null
  );
}

export default AutoScrollToTop;
