import { ArrowLeft, ArrowRight, Award, Briefcase } from 'lucide-react';
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
            <a key={proj.id} href={`#portfolio/${proj.id}`} className="card tilt project-card">
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

function ProjectDetail({ project }) {
  return (
    <>
      <PageHeader
        title={project.title}
        lead={
          <a href="#portfolio" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Portfolios
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

          {project.image && (
            <figure className="card project__figure">
              <img src={project.image} alt={project.title} />
            </figure>
          )}
        </div>
      </section>
    </>
  );
}

export default function PortfolioPage({ projectId }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  return project ? <ProjectDetail project={project} /> : <ProjectList />;
}
