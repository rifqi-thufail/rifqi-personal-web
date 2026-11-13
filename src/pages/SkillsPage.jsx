import PageHeader from '../components/PageHeader';

const CATEGORIES = [
  {
    title: 'Technical Competencies',
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
            <article key={cat.title} className="card">
              <div className="skill-card__head">
                <h2 className="card__title">{cat.title}</h2>
                <p className="mono-label">{cat.sub}</p>
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
