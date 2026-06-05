import { Fragment } from 'react';
import { Users, ChevronRight, GraduationCap } from 'lucide-react';
import GovChainSimulator from '../components/GovChainSimulator';

const EXPERIENCES = [
  {
    org: 'GovChain Permit, Indonesia Blockchain Center',
    role: 'Tech Lead & UX Designer',
    period: 'Aug – Dec 2025',
    bullets: [
      'Delivered ready MVP within <strong>1 month</strong> leading a cross-functional team of four; presented to Dubai Blockchain Center Representatives and Surabaya City Government.',
      'Architected decentralised permit issuance using <strong>ERC-721 smart contracts</strong> on Base Network, IPFS off-chain storage, and QR verification — achieving <strong>95% improvement</strong> in processing speed.',
      'Designed end-to-end UX flow and UI mockups in Figma integrated with Surabaya City Government\'s SSW Alfa system.',
    ],
    visual: <GovChainSimulator />,
  },
  {
    org: 'FarmSync, Indonesia Blockchain Center',
    role: 'Project Lead',
    period: 'Sep – Nov 2025',
    bullets: [
      'Led blockchain architecture for a transparent palm oil supply chain integrating IoT sensors (ESP32), EVM smart contracts, and MQTT/REST API middleware.',
      'Designed smart contract automated settlement targeting payment processing reduction from <strong>T+7–14 days to under 1 hour</strong>.',
      'Projected <strong>50% reduction in operational costs</strong> and <strong>65% improvement</strong> in system access efficiency.',
    ],
    visual: (
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span className="label-mono">Architecture Blueprint</span>
        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Palm Oil Supply Chain</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['ESP32 IoT', 'MQTT Layer', 'Smart Contract', 'Settlement'].map((n, i, arr) => (
            <Fragment key={n}>
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                background: 'var(--border)',
                border: '1px solid var(--border-hover)',
                borderRadius: '4px',
                padding: '3px 8px',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap'
              }}>{n}</span>
              {i < arr.length - 1 && <ChevronRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
            </Fragment>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
          {[['< 1 Hr', 'Settlement Speed'], ['50%', 'OpEx Reduction']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    org: 'Carbon Addons, Do Well Do Good Client Project',
    role: 'Analyst',
    period: 'Mar – Dec 2024',
    bullets: [
      'Identified five root-cause barriers to public transport adoption, structuring a problem-solution framework for carbon offset API integration with Surabaya\'s GoBis App.',
      'Architected a B2B2C API partnership model between Carbon Addons and GoBis App for real-time carbon usage detection.',
      'Awarded <strong>"Best Client Project"</strong> for exceptional research delivery.',
    ],
    visual: (
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span className="label-mono">B2B2C Model</span>
        <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>GoBis API Carbon Tracker</h4>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Calculates carbon offsets based on public transport route distance. Rewards users with loyalty points in the GoBis ecosystem.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['API Integration', 'ESG Framework', 'Loyalty Gamification'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
];

const ORGS = [
  {
    name: 'Do Well Do Good (DWDG) ITS',
    role: 'Director of Media, Marketing & Communications',
    desc: 'Grew Instagram profile to 551.4K total views (+100%), 41.9K reach (+49.5%), and 25K profile visits (+90.8%) over nine months. Implemented an Internal Development Performance (IDP) system to track team competence and punctuality.',
  },
  {
    name: 'Jakarta International MUN (JMUN)',
    role: 'Staff, Documentation & Videos',
    desc: 'Created three long-form YouTube videos, including one in collaboration with the United Nations Association Indonesia. Content generated over 400K+ views across JMUN\'s official social media channels.',
  },
];

const EDUCATION = [
  {
    uni: 'Universiti Teknologi PETRONAS',
    loc: 'Perak, Malaysia · Aug 2023 – Present',
    deg: 'Bachelor of Information Systems (Hons)',
    sub: 'Specialisation: Big Data Analytics · Minor: Corporate Management',
    cgpa: '3.52 / 4.0',
    badge: "Dean's List",
  },
  {
    uni: 'Institut Teknologi Sepuluh Nopember',
    loc: 'Surabaya, Indonesia · Aug 2023 – Present',
    deg: 'Bachelor of Information Systems',
    sub: 'ERP Systems, IT Risk Management, Predictive Modelling',
    cgpa: '3.56 / 4.0',
    badge: null,
  },
];

export default function ExperiencePage() {
  const glow = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <div className="section-container" style={{ paddingTop: '112px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="label-mono">Career Journey</span>
        <h1 style={es.title}>Experience & Education</h1>
        <p style={es.subtitle}>My academic background and professional engagements in engineering and operations.</p>
      </div>

      {/* Education Block */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={es.sectionHeading}>Education</h2>
        <div style={es.eduGrid}>
          {EDUCATION.map((edu) => (
            <div key={edu.uni} className="glass-card" style={es.eduCard} onMouseMove={glow}>
              <div style={es.eduTop}>
                <GraduationCap size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <div>
                  <h4 style={es.eduTitle}>{edu.uni}</h4>
                  <span style={es.eduLoc}>{edu.loc}</span>
                </div>
              </div>
              <p style={es.eduDeg}>{edu.deg}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{edu.sub}</p>
              <div style={es.badgeRow}>
                <span style={es.cgpaBadge}>CGPA {edu.cgpa}</span>
                {edu.badge && <span style={es.deanBadge}>{edu.badge}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Block */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={es.sectionHeading}>Professional Experience</h2>
        <div style={es.timeline}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} style={es.timelineItem}>
              <div style={es.timelineLeft}>
                <div style={es.tlHeader}>
                  <div style={es.tlDot} />
                  <div>
                    <h3 style={es.expTitle}>{exp.org}</h3>
                    <span style={es.expRole}>{exp.role} · {exp.period}</span>
                  </div>
                </div>
                <ul style={es.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={es.bullet}>
                      <span style={es.bulletDot} />
                      <span dangerouslySetInnerHTML={{ __html: b }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div style={es.timelineRight}>
                {exp.visual}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Block */}
      <div>
        <h2 style={es.sectionHeading}>Leadership & Volunteering</h2>
        <div style={es.orgGrid}>
          {ORGS.map((org, i) => (
            <div key={i} className="glass-card" style={es.orgCard} onMouseMove={glow}>
              <div style={es.orgTop}>
                <Users size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <div>
                  <h4 style={es.orgTitle}>{org.name}</h4>
                  <span style={es.orgRole}>{org.role}</span>
                </div>
              </div>
              <p style={es.orgDesc}>{org.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const es = {
  title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.04em',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--text-secondary)',
    maxWidth: '540px',
    margin: '0 auto',
  },
  sectionHeading: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
    marginBottom: '24px',
  },
  eduGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  eduCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  eduTop: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  eduTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  eduLoc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    display: 'block',
    marginTop: '2px',
  },
  eduDeg: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  badgeRow: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
    paddingTop: '8px',
  },
  cgpaBadge: {
    background: 'var(--border)',
    border: '1px solid var(--border-hover)',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  deanBadge: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#3b82f6',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
  },
  timelineItem: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  timelineLeft: {
    flex: '1 1 280px',
  },
  timelineRight: {
    flex: '1 1 280px',
  },
  tlHeader: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  tlDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    marginTop: '8px',
    flexShrink: 0,
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
  },
  expTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  expRole: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
    display: 'block',
    marginTop: '2px',
  },
  bullets: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingLeft: '20px',
    listStyle: 'none',
  },
  bullet: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  bulletDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'var(--text-muted)',
    marginTop: '9px',
    flexShrink: 0,
  },
  orgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  orgCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  orgTop: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  orgTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  orgRole: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    display: 'block',
    marginTop: '2px',
  },
  orgDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
};
