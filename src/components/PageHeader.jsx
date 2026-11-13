// `lead` renders above the title (e.g. a back link) and `footer` below the intro.
import HeroShell from './HeroShell';

export default function PageHeader({ eyebrow, title, lead, footer, children }) {
  return (
    <HeroShell as="header" compact>
      {lead}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {children && <p className="page-header__sub">{children}</p>}
      {footer}
    </HeroShell>
  );
}
