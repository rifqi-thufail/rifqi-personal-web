import { CONTACT, NAV } from '../data/site';
import { PROJECTS } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a href="/" className="brand" aria-label="thufail.dev — home">
              <span className="brand__mark" aria-hidden="true" />
              <span>thufail.dev</span>
            </a>
            <p>
              Rifqi Aufa Thufail — Information Systems student building data analytics, blockchain and
              SAP ERP systems across Malaysia and Indonesia.
            </p>
            <p className="site-footer__loc">Perak, Malaysia</p>
          </div>

          <nav className="site-footer__col" aria-label="Site">
            <h2>Site</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.page}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Projects">
            <h2>Projects</h2>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.id}><a href={`/portfolio/${p.id}/`}>{p.subtitle}</a></li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>Email</a></li>
              <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href={CONTACT.linkedinUrl} target="_blank" rel="me noreferrer">LinkedIn</a></li>
              <li><a href={CONTACT.githubUrl} target="_blank" rel="me noreferrer">GitHub</a></li>
              <li><a href="/#contact">All contact details</a></li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Rifqi Aufa Thufail</span>
          <span>Built with React &amp; Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
