import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CaseStudySheet from '../case-study/CaseStudySheet';
import SectionHeading from '../ui/SectionHeading';
import { fadeUp } from '../../utils/animations';
import { SELECTED_WORK } from '../../utils/content';
import { CASE_STUDIES } from '../../content/caseStudies';

const FEATURED = CASE_STUDIES.octech;

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const MyWork = () => {
  // Open case study lives in the URL (?case=octech) so it can be linked to and
  // the browser back button closes it.
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const openStudy = CASE_STUDIES[params.get('case') ?? ''] ?? null;

  const open = (slug: string) => setParams({ case: slug }, { state: { sheet: true }, preventScrollReset: true });
  const close = useCallback(() => {
    // Opened from this page → step back in history; opened from a shared link → just drop the param
    if ((location.state as { sheet?: boolean } | null)?.sheet) navigate(-1);
    else setParams({}, { replace: true, preventScrollReset: true });
  }, [location.state, navigate, setParams]);

  return (
    <section className="selected-work" id="work">
      <SectionHeading
        label="Selected work"
        title="A glimpse of my work."
        description="A selection of projects focused on clarity, interaction, and building better experiences."
        action={{ label: "Start a project", to: '/contact' }}
      />

      <div className="selected-work__grid">
        {/* Case study — first cell of the grid, opens the bottom sheet */}
        <motion.button
          type="button"
          onClick={() => open(FEATURED.slug)}
          aria-haspopup="dialog"
          className="work-card work-card--case-study"
          variants={fadeUp(0, 40)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="work-card__media">
            <img src={FEATURED.cover} alt={FEATURED.name} loading="lazy" draggable={false} />
          </div>

          <div className="work-card__row">
            <div className="work-card__text">
              <h3 className="work-card__title">{FEATURED.name}</h3>
              <p className="work-card__tags">Website / Product / UX/UI</p>
            </div>
            <span className="work-card__action" aria-hidden="true">
              <Arrow />
            </span>
          </div>
        </motion.button>

        {SELECTED_WORK.map((p, i) => (
          <motion.article
            key={p.id}
            className="work-card"
            variants={fadeUp(((i + 1) % 3) * 0.1, 40)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="work-card__media">
              <img src={p.img} alt={p.title} loading="lazy" draggable={false} />
            </div>

            <div className="work-card__row">
              <div className="work-card__text">
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__tags">{p.tags.join(' / ')}</p>
              </div>
              <span className="work-card__action" aria-hidden="true">
                <Arrow />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      <CaseStudySheet study={openStudy} onClose={close} />
    </section>
  );
};

export default MyWork;
