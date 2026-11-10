import Globe from './Globe';

// `lead` renders above the title (e.g. a back link) and `footer` below the intro.
export default function PageHeader({ eyebrow, title, lead, footer, children }) {
  return (
    <header className="page-header" data-parallax>
      <div className="backdrop" aria-hidden="true" />
      <Globe className="page-header__globe" />
      <div className="container page-header__inner">
        {lead}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {children && <p className="page-header__sub">{children}</p>}
        {footer}
      </div>
    </header>
  );
}
