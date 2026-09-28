import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// On navigation: jump to #hash targets (e.g. /#work), otherwise start at the top
const useScrollOnNavigate = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
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
