import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images, videos } from '@assets/assets';
import StripeButton from '../ui/StripeButton';
import RollingText from '../ui/RollingText';
import { EASE } from '../../utils/animations';
import { EMAIL, NAV_LINKS, SOCIAL_LINKS } from '../../utils/content';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA band — video card */}
      <motion.div
        className="footer__card tone-light"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <video className="footer__video" autoPlay muted loop playsInline aria-hidden="true">
          <source src={videos.g5} type="video/webm" />
        </video>

        <div className="footer__card-content">
          <span className="footer__kicker">Contact</span>
          <h2 className="footer__heading">
            Let's build it.
            <br />
            Or make it better.
          </h2>
          <p className="footer__subtext">
            If something feels stuck, unclear, or not working, I can help figure it out.
          </p>
          <div className="footer__actions">
            <StripeButton href={`mailto:${EMAIL}`} variant="primary">
              Get in touch
            </StripeButton>
            <StripeButton to="/contact" variant="framed">
              Contact form
            </StripeButton>
          </div>
        </div>

        <div className="footer__illustration" aria-hidden="true">
          <img src={images.footer.footerImg} alt="" draggable={false} />
        </div>
      </motion.div>

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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <RollingText text="Back to top ↑" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
