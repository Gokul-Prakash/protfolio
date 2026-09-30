import { useLenis } from 'lenis/react';
import { Link } from 'react-router-dom';
import RollingText from '../ui/RollingText';
import { EMAIL, NAV_LINKS, SOCIAL_LINKS } from '../../utils/content';
import ContactCard from './ContactCard';

const Footer = () => {
  const year = new Date().getFullYear();
  const lenis = useLenis();

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer className="footer">
      {/* CTA band — video card */}
      <ContactCard />

      {/* Nav columns */}
      <nav className="footer__nav" aria-label="Footer">
        <div className="footer__col">
          <h3 className="footer__col-title">Site</h3>
          <Link to="/" className="footer__link"><RollingText text="Home" /></Link>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} className="footer__link">
              <RollingText text={label} />
            </Link>
          ))}
        </div>

        <div className="footer__col">
          <h3 className="footer__col-title">Social</h3>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="footer__link" target="_blank" rel="noreferrer">
              <RollingText text={label} />
            </a>
          ))}
        </div>

        <div className="footer__col footer__col--wide">
          <h3 className="footer__col-title">Say hello</h3>
          <a href={`mailto:${EMAIL}`} className="footer__email">{EMAIL}</a>
          <p className="footer__note">
            Based in Bangalore, India — working with teams worldwide.
          </p>
        </div>
      </nav>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">© {year} Gokul · Terms &amp; Conditions</p>
        <button
          type="button"
          className="footer__top"
          onClick={toTop}
        >
          <RollingText text="Back to top ↑" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
