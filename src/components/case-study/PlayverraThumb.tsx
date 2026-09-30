import { PLAYVERRA_LOOP } from '../../content/playverraVisuals';
import pvLogo from '@assets/images/Case-Studies/playverra/pv-logo.svg';

// Work card thumbnail: a static phone whose screen scrolls through the core
// loop (Home → Discover → Play → Rewards) and back to Home. Motion is pure CSS
// (see .pv-thumb in _selected-work.scss); the first screen is repeated at the
// end of the track so the loop wraps without a jump.
const PlayverraThumb = () => (
  <div className="pv-thumb">
    <div className="pv-thumb__stage">
      <div className="pv-thumb__brand">
        <img className="pv-thumb__logo" src={pvLogo} alt="" draggable={false} />
        <p className="pv-thumb__tagline">
          Play.
          <br />
          Discover.
          <br />
          Earn.
        </p>
      </div>

      <div className="pv-thumb__phone">
        <div className="pv-thumb__screen">
          <div className="pv-thumb__track">
            {[...PLAYVERRA_LOOP, PLAYVERRA_LOOP[0]].map((shot, i) => (
              <img
                key={i}
                src={shot.src}
                alt={i === 0 ? shot.alt : ''}
                aria-hidden={i > 0 || undefined}
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="pv-thumb__steps" aria-hidden="true">
        {PLAYVERRA_LOOP.map((shot, i) => (
          <li key={shot.label} style={{ '--i': i } as React.CSSProperties}>
            {shot.label}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default PlayverraThumb;
