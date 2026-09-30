import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ContactCard from '../common/ContactCard';
import CaseStudyVisual from './CaseStudyVisual';
import { fadeUp } from '../../utils/animations';
import { CaseStudy, SHOW_DRAFTS } from '../../content/caseStudies';

const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.15 } } as const;

// Markdown → site components: external links open in a new tab, wide tables scroll
const mdComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  ),
  // Draft markers arrive as inline code starting "NEEDS INPUT" / "NOTE" (dev only)
  code: ({ children }: { children?: React.ReactNode }) => {
    const text = String(children ?? '');
    return /^(NEEDS INPUT|NOTE)\b/.test(text) ? <mark className="draft-chip">{text}</mark> : <code>{children}</code>;
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="case-study__table">
      <table>{children}</table>
    </div>
  ),
};

// Full case study body — rendered inside the bottom sheet (lazy-loaded with the
// Markdown renderer so it stays out of the home page bundle).
const CaseStudyContent = ({ study, onClose }: { study: CaseStudy; onClose: () => void }) => {
  const meta = study.meta.filter((m) => SHOW_DRAFTS || !m.draft);

  return (
    <article className="case-study">
      {/* Title */}
      <header className="case-study__header">
        <p className="case-study__kicker">Case study</p>
        <h2 className="case-study__title" id="case-study-title">{study.name}</h2>
        <p className="case-study__tagline">{study.tagline}</p>
      </header>

      <motion.figure className="case-study__cover" variants={fadeUp(0, 32)} initial="hidden" animate="visible">
        <img src={study.cover} alt={`${study.name} website on laptop, tablet and phone`} draggable={false} />
      </motion.figure>

      {/* Intro + meta */}
      <section className="case-study__intro">
        <motion.p className="case-study__lead" variants={fadeUp()} {...reveal}>
          {study.intro}
        </motion.p>

        <motion.dl className="case-study__meta" variants={fadeUp(0.1)} {...reveal}>
          {meta.map((m) => (
            <div key={m.label} className="case-study__meta-item">
              <dt>{m.label}</dt>
              <dd>
                {m.draft ? (
                  <mark className="draft-chip">{m.value}</mark>
                ) : m.href ? (
                  <a href={m.href} target="_blank" rel="noreferrer">{m.value} ↗</a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.p className="case-study__contribution" variants={fadeUp(0.15)} {...reveal}>
          <strong>My contribution</strong> {study.contribution.text}
          {SHOW_DRAFTS && study.contribution.draft && <mark className="draft-chip">NEEDS INPUT — confirm wording</mark>}
        </motion.p>
      </section>

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

      {SHOW_DRAFTS && (
        <p className="case-study__draft-banner">
          Draft view — highlighted items are dev-only and removed from production builds.
        </p>
      )}

      {/* Sections — title on the left, content on the right */}
      <div className="case-study__sections">
        {study.sections.map((section) => (
          <section key={section.title} className="case-study__section">
            {/* Title + prose share a grid so the sticky title stays within the text, never over the visual */}
            <div className="case-study__section-text">
              <motion.h3 className="case-study__section-title" variants={fadeUp(0, 24)} {...reveal}>
                {section.title}
              </motion.h3>
              <motion.div className="case-study__prose" variants={fadeUp(0.05, 24)} {...reveal}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {section.body}
                </ReactMarkdown>
              </motion.div>
            </div>
            {section.visual && (
              <div className="case-study__visual">
                <CaseStudyVisual visual={section.visual} />
              </div>
            )}
          </section>
        ))}
      </div>

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
