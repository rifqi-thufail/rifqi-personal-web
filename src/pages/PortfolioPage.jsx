import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Briefcase, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { PROJECTS } from '../data/portfolioData';

function ProjectList() {
  return (
    <>
      <PageHeader eyebrow="Hall of Fame" title="Portfolio & Projects">
        A record of consulting projects, technical designs, and corporate strategies.
      </PageHeader>

      <section className="section">
        <div className="container grid grid--2">
          {PROJECTS.map((proj) => (
            <a key={proj.id} href={`/portfolio/${proj.id}/`} className="card tilt project-card">
              {proj.image && (
                <div className="project-card__media">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                </div>
              )}
              <div className="project-card__body">
                <p className="mono-label project-card__kicker">
                  <Briefcase size={14} aria-hidden="true" />
                  {proj.tags[0]}
                </p>
                <h2 className="project-card__title">{proj.title}</h2>
                <p className="card__text">{proj.subtitle}</p>
                <p className="card__foot">
                  <span className="project-card__cta">
                    View details <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

// View-only slide viewer. The source PDFs are never shipped: slides are served
// as images, with the context menu, drag, text selection and printing disabled.
function DeckViewer({ deck, title }) {
  const [page, setPage] = useState(1);
  const frame = useRef(null);
  const go = useCallback(
    (delta) => setPage((p) => Math.min(deck.pages, Math.max(1, p + delta))),
    [deck.pages],
  );

  useEffect(() => {
    [page + 1, page + 2].filter((n) => n <= deck.pages).forEach((n) => {
      new Image().src = deck.src(n);
    });
  }, [page, deck]);

  const block = (e) => e.preventDefault();
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    else if ((e.metaKey || e.ctrlKey) && ['s', 'p'].includes(e.key.toLowerCase())) block(e);
  };
  const fullscreen = () => frame.current?.requestFullscreen?.();

  return (
    <div className="deck" ref={frame} tabIndex={0} onKeyDown={onKeyDown} onContextMenu={block}>
      <div className="deck__stage" onDragStart={block}>
        <img
          key={page}
          src={deck.src(page)}
          alt={`${title} — slide ${page} of ${deck.pages}`}
          draggable={false}
          className="deck__img"
        />
        <div className="deck__shield" aria-hidden="true" />
      </div>
      <div className="deck__bar">
        <button type="button" className="deck__btn" onClick={() => go(-1)} disabled={page === 1} aria-label="Previous slide">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className="deck__count mono-label">{page} / {deck.pages}</span>
        <button type="button" className="deck__btn" onClick={() => go(1)} disabled={page === deck.pages} aria-label="Next slide">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
        <button type="button" className="deck__btn deck__btn--end" onClick={fullscreen} aria-label="Full screen">
          <Maximize2 size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="deck__note">View only. Use the arrow keys or buttons to move between slides.</p>
    </div>
  );
}

function ProjectDetail({ project }) {
  return (
    <>
      <PageHeader
        title={project.title}
        lead={
          <a href="/portfolio/" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </a>
        }
        footer={
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        }
      >
        {project.subtitle}
      </PageHeader>

      {project.document ? (
        <>
          <section className="section section--tight">
            <div className="container">
              <DeckViewer deck={project.document} title={project.title} />
            </div>
          </section>
          <section className="section section--tight">
            <div className="container project project--below">
            <div>
              <h2 className="project__heading">Overview</h2>
              <p className="project__text">{project.description}</p>
            </div>
            <div>
              <h2 className="project__heading">Key Accomplishments</h2>
              <ul className="check-list">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>
                    <Award size={16} aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </section>
        </>
      ) : (
      <section className="section">
        <div className="container project">
          <div>
            <h2 className="project__heading">Overview</h2>
            <p className="project__text">{project.description}</p>

            <h2 className="project__heading">Key Accomplishments</h2>
            <ul className="check-list">
              {project.achievements.map((achievement) => (
                <li key={achievement}>
                  <Award size={16} aria-hidden="true" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          {project.gallery ? (
            <div className="project__gallery">
              {project.gallery.map((g) => (
                <figure key={g.src} className="card project__figure">
                  <img src={g.src} alt={g.caption} loading="lazy" />
                  <figcaption className="project__caption">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            project.image && (
              <figure className="card project__figure">
                <img src={project.image} alt={project.title} />
              </figure>
            )
          )}
        </div>
      </section>
      )}
    </>
  );
}

export default function PortfolioPage({ projectId }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  return project ? <ProjectDetail project={project} /> : <ProjectList />;
}
