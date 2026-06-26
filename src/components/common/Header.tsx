import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { images } from '@assets/assets';

const NAV_LINKS = [
  { label: '[ Works ]', path: '/works' },
  { label: '[ Playground ]', path: '/playground' },
  { label: '[ Contact ]', path: '/contact' },
];

const MARQUEE_TEXT = '/ Open to opportunities ';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Left — logo + marquee */}
      <div className="header__left">
        <NavLink to="/" className="header__logo" aria-label="Home">
          <img src={images.logo.gLogo} alt="g" width={32} height={32} />
        </NavLink>

        <div className="header__marquee" aria-hidden="true">
          <div className="header__marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>

        {/* Timer at end of left section */}
        <span className="header__time">
          {time}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Right — nav only */}
      <nav className="header__nav" aria-label="Main navigation">
        {NAV_LINKS.map(({ label, path }) => (
          <NavLink key={path} to={path} className="header__nav-link">
            {label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
};

export default Header;
