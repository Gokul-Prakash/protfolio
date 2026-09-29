import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { images } from '@assets/assets';
import RollingText from '../ui/RollingText';
import StripeButton from '../ui/StripeButton';
import ThemeToggle from '../ui/ThemeToggle';
import { EASE } from '../../utils/animations';
import { EMAIL, NAV_LINKS } from '../../utils/content';

// Pages whose top section is a light (paper) field — header uses dark text there
const LIGHT_HERO_ROUTES = ['/', '/contact', '/playground'];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the side menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  // While open: lock page scroll, close on Escape, close if resized up to desktop
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => desktop.matches && setMenuOpen(false);

    lenis?.stop(); // Lenis ignores overflow:hidden, so pause it explicitly
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen, lenis]);

  const light = LIGHT_HERO_ROUTES.includes(pathname) && !scrolled && !menuOpen;

  const headerClass = [
    'header',
    light ? 'tone-light' : 'tone-dark',
    scrolled && 'header--scrolled',
    menuOpen && 'header--menu-open',
  ].filter(Boolean).join(' ');

  return (
    <>
      <motion.header
        className={headerClass}
        // Over the always-dark side menu the header must use dark-theme colours
        data-theme={menuOpen ? 'dark' : undefined}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Left — logo + status */}
        <div className="header__left">
          <NavLink to="/" className="header__logo" aria-label="Gokul — home">
            <img src={images.logo.gLogo} alt="" width={26} height={26} />
            <span className="header__wordmark">Gokul</span>
          </NavLink>

          <span className="header__status">
            <span className="status-dot" aria-hidden="true" />
            Open to opportunities
          </span>
        </div>

        {/* Center — nav (tablet/desktop) */}
        <nav className="header__nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink key={path} to={path} end className="header__nav-link">
              <RollingText text={label} />
            </NavLink>
          ))}
        </nav>

        {/* Right — local time + CTA */}
        <div className="header__right">
          <span className="header__time" title="Local time in Bangalore">
            BLR {time}
          </span>
          <ThemeToggle />
          <StripeButton to="/contact" variant="framed" className="header__cta">
            Let's talk
          </StripeButton>

          {/* Burger (mobile) */}
          <button
            type="button"
            className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="side-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* Side menu — rendered outside the header so its transform/backdrop-filter
          doesn't trap the fixed-position drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="side-menu__overlay"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              id="side-menu"
              className="side-menu"
              data-theme="dark"
              data-lenis-prevent
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <nav className="side-menu__nav">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.06 }}
                  >
                    <NavLink to={path} end className="side-menu__link">
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="side-menu__footer">
                <span className="side-menu__label">Say hello</span>
                <a href={`mailto:${EMAIL}`} className="side-menu__email">
                  {EMAIL}
                </a>
                <span className="side-menu__label">BLR {time} · Open to opportunities</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
