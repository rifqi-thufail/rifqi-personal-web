
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
  const glow = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <section className="section-container" style={{ paddingTop: '112px' }}>
      {/* Header */}
      <div style={st.header}>
        <span className="label-mono">Skillsets</span>
        <h1 style={st.heading}>Technical Stack & Certifications</h1>
        <p style={st.sub}>
          Validated academic knowledge, enterprise tooling expertise, and multi-cultural communication skills.
        </p>
      </div>

      {/* Grid */}
      <div style={st.grid}>
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="glass-card skill-card" style={st.card} onMouseMove={glow}>
            <div className="skill-card-head" style={st.cardHead}>
              <h3 className="skill-card-title" style={st.cardTitle}>{cat.title}</h3>
              <span className="skill-card-sub" style={st.cardSub}>{cat.sub}</span>
            </div>
            <div className="skill-items" style={st.items}>
              {cat.items.map((item) => (
                <div key={item.name} className="skill-item" style={st.item}>
                  <div className="skill-item-dot" style={st.itemDot} />
                  <div>
                    <span className="skill-item-name" style={st.itemName}>{item.name}</span>
                    <span className="skill-item-detail" style={st.itemDetail}>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const st = {
  header: { textAlign: 'center', marginBottom: '56px' },
  heading: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.04em',
    marginBottom: '8px',
  },
  sub: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    maxWidth: '540px',
    margin: '0 auto',
    lineHeight: 1.6
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  card: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' },
  cardHead: { borderBottom: '1px solid var(--border)', paddingBottom: '14px' },
  cardTitle: { fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' },
  cardSub: { fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' },
  items: { display: 'flex', flexDirection: 'column', gap: '14px' },
  item: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  itemDot: {
    width: '5px', height: '5px', borderRadius: '50%',
    background: 'rgba(59, 130, 246, 0.5)', marginTop: '8px', flexShrink: 0,
  },
  itemName: { fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-secondary)', display: 'block' },
  itemDetail: { fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', display: 'block', marginTop: '1px' },
};
