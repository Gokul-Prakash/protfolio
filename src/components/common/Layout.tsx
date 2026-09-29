import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import Header from './Header';
import Footer from './Footer';

// On navigation: jump to #hash targets (e.g. /#work), otherwise start at the top
// (Lenis when active, native scrolling otherwise)
const useScrollOnNavigate = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered
      requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return;
        if (lenis) lenis.scrollTo(target); // scroll-padding-top keeps it clear of the header
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
    // lenis is intentionally not a dependency: only navigation should scroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);
};

const Layout = () => {
  useScrollOnNavigate();

  return (
    <div className="layout">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <div className="main-content" id="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
