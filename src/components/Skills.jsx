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

export default function Skills() {
  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <section id="skills" className="section-container">
      {/* Header */}
      <div style={st.header}>
        <span className="label-mono" style={{ display: 'block', marginBottom: '10px' }}>Skillsets</span>
        <h2 style={st.heading}>Technical Stack & Certifications</h2>
        <p style={st.sub}>
          Validated academic knowledge, enterprise tooling expertise, and multi-cultural communication skills.
        </p>
      </div>

      {/* Grid */}
      <div style={st.grid}>
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="glass-card" style={st.card} onMouseMove={glow}>
            <div style={st.cardHead}>
              <h3 style={st.cardTitle}>{cat.title}</h3>
              <span style={st.cardSub}>{cat.sub}</span>
            </div>
            <div style={st.items}>
              {cat.items.map((item) => (
                <div key={item.name} style={st.item}>
                  <div style={st.itemDot} />
                  <div>
                    <span style={st.itemName}>{item.name}</span>
                    <span style={st.itemDetail}>{item.detail}</span>
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
  header: { textAlign: 'center', marginBottom: '48px' },
  heading: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 800, color: '#ffffff',
    letterSpacing: '-0.03em', marginBottom: '10px',
  },
  sub: { fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  card: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' },
  cardHead: { borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' },
  cardTitle: { fontSize: 'var(--font-size-md)', fontWeight: 700, color: '#ffffff', marginBottom: '3px' },
  cardSub: { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.3)' },
  items: { display: 'flex', flexDirection: 'column', gap: '14px' },
  item: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  itemDot: {
    width: '5px', height: '5px', borderRadius: '50%',
    background: 'rgba(167,139,250,0.5)', marginTop: '8px', flexShrink: 0,
  },
  itemName: { fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'rgba(255,255,255,0.8)', display: 'block' },
  itemDetail: { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: '1px' },
};
