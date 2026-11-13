import PageHeader from '../components/PageHeader';

// Small objects built from CSS 3D transforms, one per category. They share
// their parts (cubes, speech bubbles) with the home page bento.
const CUBES = [
  { x: '58px', y: '34px', s: '62px', t: '7s', d: '0s' },
  { x: '10px', y: '12px', s: '34px', t: '6s', d: '-2s', tone: 'orange' },
  { x: '24px', y: '88px', s: '24px', t: '5s', d: '-1s' },
];

const ART = {
  cubes: (
    <div className="skill-art skill-art--cubes" aria-hidden="true">
      <div className="art-cubes__stage">
        {CUBES.map((c) => (
          <div
            key={c.x}
            className={`cube${c.tone ? ` cube--${c.tone}` : ''}`}
            style={{ '--x': c.x, '--y': c.y, '--s': c.s, '--t': c.t, '--d': c.d }}
          >
            <span /><span /><span /><span /><span /><span />
          </div>
        ))}
      </div>
    </div>
  ),
  layers: (
    <div className="skill-art skill-art--layers" aria-hidden="true">
      <div className="layers">
        <i /><i /><i />
      </div>
    </div>
  ),
  seal: (
    <div className="skill-art skill-art--seal" aria-hidden="true">
      <div className="seal">
        <i /><i />
        <b />
      </div>
    </div>
  ),
  bubbles: (
    <div className="skill-art art-bubbles" aria-hidden="true">
      <i>EN</i><i>ID</i><i>MS</i>
    </div>
  ),
};

const CATEGORIES = [
  {
    title: 'Technical Competencies',
    tone: 'sky',
    art: 'cubes',
    sub: 'Development & analysis',
    items: [
      { name: 'Python & JavaScript', detail: 'Data processing & logic' },
      { name: 'Blockchain Engineering', detail: 'Smart contracts, EVM, Base Network' },
      { name: 'Business Intelligence', detail: 'ETL, Power BI, DAX, Reporting' },
      { name: 'Project Management', detail: 'Scrum, Agile frameworks' },
    ],
  },
  {
    title: 'Systems & Platforms',
    tone: 'blue',
    art: 'layers',
    sub: 'Enterprise software',
    items: [
      { name: 'SAP S/4HANA ERP', detail: 'SD, MM, PP Modules' },
      { name: 'Microsoft Power BI', detail: 'Advanced DAX modelling' },
      { name: 'Figma & DevMode', detail: 'UI/UX flows, prototyping' },
      { name: 'Linux & Shell', detail: 'Administration, scripting' },
    ],
  },
  {
    title: 'Certifications',
    tone: 'orange',
    art: 'seal',
    sub: 'Industry validated',
    items: [
      { name: 'AWS Cloud Practitioner', detail: 'Core cloud solutions' },
      { name: 'Alibaba Cloud', detail: 'MySQL & Cloud Development' },
      { name: 'SAP S/4HANA (GBI 4.2)', detail: 'Academic specification' },
      { name: 'RevoU Software Eng.', detail: 'Full-stack fundamentals' },
    ],
  },
  {
    title: 'Languages',
    tone: 'ink',
    art: 'bubbles',
    sub: 'Cross-border communication',
    items: [
      { name: 'English', detail: 'IELTS 7.0 — Professional' },
      { name: 'Bahasa Indonesia', detail: 'Native' },
      { name: 'Bahasa Melayu', detail: 'Conversational' },
      { name: 'Corporate Communication', detail: 'Stakeholder alignment' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <PageHeader eyebrow="Skillsets" title="Technical Stack & Certifications">
        Validated academic knowledge, enterprise tooling expertise, and multi-cultural communication skills.
      </PageHeader>

      <div className="sheet">
      <section className="section">
        <div className="container grid grid--2">
          {CATEGORIES.map((cat) => (
            <article key={cat.title} className="card tilt skill-card">
              <div className={`skill-card__head skill-card__head--${cat.tone}`}>
                <h2 className="card__title">{cat.title}</h2>
                <p className="mono-label">{cat.sub}</p>
                {ART[cat.art]}
              </div>
              <ul className="skill-list">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <span className="skill__name">{item.name}</span>
                    <span className="skill__detail">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
