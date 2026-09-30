import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ContactCard from '../common/ContactCard';
import CaseStudyVisual from './CaseStudyVisual';
import { fadeUp } from '../../utils/animations';
import { CaseStudy } from '../../content/caseStudies';

const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.15 } } as const;

// Markdown → site components: external links open in a new tab, wide tables scroll
const mdComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="case-study__table">
      <table>{children}</table>
    </div>
  ),
};

const slug = (title: string) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Highlights the section currently in view inside the sheet's scroll area
const useActiveSection = (ids: string[], root: HTMLElement | null) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { root, rootMargin: '-25% 0px -65% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids, root]);

  return active;
};

type CaseStudyContentProps = {
  study: CaseStudy;
  onClose: () => void;
  /** The sheet's scroll container — used for the chapter nav */
  scrollRoot: HTMLElement | null;
};

// Full case study body — rendered inside the bottom sheet (lazy-loaded with the
// Markdown renderer so it stays out of the home page bundle).
const CaseStudyContent = ({ study, onClose, scrollRoot }: CaseStudyContentProps) => {
  const ids = useMemo(() => study.sections.map((s) => `cs-${slug(s.title)}`), [study.sections]);
  const active = useActiveSection(ids, scrollRoot);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollRoot) scrollRoot.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
  };

  return (
    <article className={`case-study case-study--${study.slug}`}>
      {/* Opening — title, details, cover, at a glance */}
      <header className="case-study__header">
        {study.logo && (
          <motion.img
            className="case-study__logo"
            src={study.logo}
            alt=""
            variants={fadeUp()}
            initial="hidden"
            animate="visible"
          />
        )}
        <motion.p className="case-study__kicker" variants={fadeUp()} initial="hidden" animate="visible">
          Case study
        </motion.p>
        <motion.h2 className="case-study__title" id="case-study-title" variants={fadeUp(0.05, 40)} initial="hidden" animate="visible">
          {study.name}
        </motion.h2>
        <motion.p className="case-study__tagline" variants={fadeUp(0.1)} initial="hidden" animate="visible">
          {study.tagline}
        </motion.p>
        <motion.p className="case-study__lead" variants={fadeUp(0.15)} initial="hidden" animate="visible">
          {study.intro}
        </motion.p>

        {study.motto && (
          <motion.p className="case-study__motto" variants={fadeUp(0.18)} initial="hidden" animate="visible">
            {study.motto.map((word, i) => (
              <span key={word}>
                {i > 0 && <span className="case-study__motto-arrow" aria-hidden="true">→</span>}
                {word}
              </span>
            ))}
          </motion.p>
        )}

        <motion.dl className="case-study__meta" variants={fadeUp(0.2)} initial="hidden" animate="visible">
          {study.meta.map((m) => (
            <div key={m.label} className="case-study__meta-item">
              <dt>{m.label}</dt>
              <dd>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noreferrer">{m.value} ↗</a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>
      </header>

      <motion.figure className="case-study__cover" variants={fadeUp(0.25, 32)} initial="hidden" animate="visible">
        {study.coverVisual ? (
          <CaseStudyVisual visual={study.coverVisual} />
        ) : (
          <img src={study.cover} alt={`${study.name} website on laptop, tablet and phone`} draggable={false} />
        )}
      </motion.figure>

      {/* At a glance — Octech's ecosystem as presented on the site (not results) */}
      {study.glance && (
        <motion.dl className="case-study__glance" variants={fadeUp(0, 24)} {...reveal}>
          {study.glance.map((g) => (
            <div key={g.label} className="case-study__glance-item">
              <dt>{g.label}</dt>
              <dd>{g.value}</dd>
            </div>
          ))}
        </motion.dl>
      )}

      {/* Body — pinned chapter nav + sections */}
      <div className="case-study__body">
        <nav className="case-study__toc" aria-label="Case study sections">
          <p className="case-study__toc-label">Contents</p>
          <ol>
            {study.sections.map((section, i) => (
              <li key={section.title}>
                <button
                  type="button"
                  className={`case-study__toc-link${active === ids[i] ? ' is-active' : ''}`}
                  aria-current={active === ids[i] ? 'true' : undefined}
                  onClick={() => jumpTo(ids[i])}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-study__sections">
          {study.sections.map((section, i) => (
            <section key={section.title} id={ids[i]} className="case-study__section">
              <motion.header className="case-study__section-head" variants={fadeUp(0, 24)} {...reveal}>
                <p className="case-study__section-kicker">{section.title}</p>
                <h3 className="case-study__section-title">
                  {section.statement ? (
                    <ReactMarkdown components={{ ...mdComponents, p: ({ children }) => <>{children}</> }}>
                      {section.statement}
                    </ReactMarkdown>
                  ) : (
                    section.title
                  )}
                </h3>
              </motion.header>

              {section.body && (
                <motion.div className="case-study__prose" variants={fadeUp(0.05, 24)} {...reveal}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {section.body}
                  </ReactMarkdown>
                </motion.div>
              )}

              {section.visual && (
                <div className="case-study__visual">
                  <CaseStudyVisual visual={section.visual} />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {study.closing && (
        <motion.section className="case-study__closing" variants={fadeUp(0, 32)} {...reveal}>
          <p className="case-study__closing-title">{study.closing.title}</p>
          <p className="case-study__closing-text">{study.closing.text}</p>
        </motion.section>
      )}

      {/* Same contact card as the site footer */}
      <section className="case-study__contact">
        <ContactCard />
        <button type="button" className="case-study__back" onClick={onClose}>
          ← Back to work
        </button>
      </section>
    </article>
  );
};

export default CaseStudyContent;
