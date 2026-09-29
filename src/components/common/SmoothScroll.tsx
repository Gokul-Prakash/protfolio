import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Lenis smooth scrolling for the whole page (https://lenis.dev).
// Skipped for users who prefer reduced motion — they get native scrolling.
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION).matches);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,                      // smooth-scroll in-page #links (honours scroll-padding-top)
        allowNestedScroll: true,            // let the side menu scroll on its own
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
