import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, GraduationCap, Users,
  ChevronRight, Mail, Phone, Copy, Check, ExternalLink,
  ArrowUp
} from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 16} height={props.size || 16}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

import Header         from './components/Header';
import Hero           from './components/Hero';
import DashboardMockup from './components/DashboardMockup';
import GovChainSimulator from './components/GovChainSimulator';
import Skills         from './components/Skills';
import CommandMenu    from './components/CommandMenu';
import Gallery        from './components/Gallery';

// ── Reusable section label + heading ─────────────────────────────────────────
function SectionHeader({ label, title, center = false }) {
  return (
    <div style={{ marginBottom: '48px', textAlign: center ? 'center' : 'left' }}>
      <span className="label-mono" style={{ display: 'block', marginBottom: '10px' }}>{label}</span>
      <h2 style={sh.heading}>{title}</h2>
    </div>
  );
}
const sh = {
  heading: { fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }
};

// ── Mouse-tracking glow handler ───────────────────────────────────────────────
function useMouseGlow() {
  return (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [cmdOpen,       setCmdOpen]       = useState(false);
  const [copied,        setCopied]        = useState('');
  const [formData,      setFormData]      = useState({ name: '', email: '', message: '' });
  const [formSent,      setFormSent]      = useState(false);
  const [showTop,       setShowTop]       = useState(false);
  const mouseGlow = useMouseGlow();

  useEffect(() => {
    const s = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSent(true);
      setTimeout(() => { setFormSent(false); setFormData({ name: '', email: '', message: '' }); }, 4500);
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* Header */}
      <Header onOpenCommandMenu={() => setCmdOpen(true)} />

      {/* Command Menu */}
      <CommandMenu isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* ── Hero ── */}
      <Hero onOpenCommandMenu={() => setCmdOpen(true)} />

      {/* ───────────────────────────── About & Education ─────────────────────── */}
      <section id="about" className="section-container">
        <div style={s.split}>

          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={s.col}
          >
            <SectionHeader label="About" title="Building Systems at Scale" />
            <p style={s.body}>
              Results-driven Information Systems leader specialising in{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Big Data Analytics</strong>,{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Blockchain Systems</strong>, and{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>SAP ERP compliance</strong>. Dual-degree student across
              Malaysia and Indonesia, seeking an internship opportunity to apply predictive data
              modelling, business intelligence, and process improvement skills within a global
              energy or tech-driven environment from{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>September 2026 to April 2027</strong>.
            </p>
            <div style={s.divider} />
            <div style={s.contactRow}>
              {[
                { key: 'email', icon: <Mail size={13} />, text: 'rifqi_26000130@utp.edu.my' },
                { key: 'phone', icon: <Phone size={13} />, text: '+60108228354' },
              ].map(({ key, icon, text }) => (
                <button key={key} onClick={() => copy(text, key)} style={s.copyPill} className="copy-pill">
                  {icon}
                  <span>{text}</span>
                  {copied === key
                    ? <Check size={12} style={{ color: '#4ade80' }} />
                    : <Copy size={11} style={{ opacity: 0.4 }} />}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...s.col, gap: '16px', display: 'flex', flexDirection: 'column' }}
          >
            <span className="label-mono">Education</span>
            {[
              {
                uni: 'Universiti Teknologi PETRONAS', loc: 'Perak, Malaysia · Aug 2023 – Present',
                deg: 'Bachelor of Information Systems (Hons)', sub: 'Specialisation: Big Data Analytics · Minor: Corporate Management',
                cgpa: '3.52 / 4.0', badge: "Dean's List",
              },
              {
                uni: 'Institut Teknologi Sepuluh Nopember', loc: 'Surabaya, Indonesia · Aug 2023 – Present',
                deg: 'Bachelor of Information Systems', sub: 'ERP Systems, IT Risk Management, Predictive Modelling',
                cgpa: '3.56 / 4.0', badge: null,
              },
            ].map((edu) => (
              <div key={edu.uni} className="glass-card" style={s.eduCard} onMouseMove={mouseGlow}>
                <div style={s.eduTop}>
                  <GraduationCap size={18} style={{ color: 'rgba(167,139,250,0.8)', flexShrink: 0 }} />
                  <div>
                    <h4 style={s.eduTitle}>{edu.uni}</h4>
                    <span style={s.eduLoc}>{edu.loc}</span>
                  </div>
                </div>
                <p style={s.eduDeg}>{edu.deg}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{edu.sub}</p>
                <div style={s.badgeRow}>
                  <span style={s.cgpaBadge}>CGPA {edu.cgpa}</span>
                  {edu.badge && <span style={s.deanBadge}>{edu.badge}</span>}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────── Experience ─────────────────────────────── */}
      <section id="experience" className="section-container">
        <SectionHeader label="Career Journey" title="Professional Experience" center />

        <div style={s.timeline}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} style={s.timelineItem}>
              <div style={s.timelineLeft}>
                <div style={s.tlHeader}>
                  <div style={s.tlDot} />
                  <div>
                    <h3 style={s.expTitle}>{exp.org}</h3>
                    <span style={s.expRole}>{exp.role} · {exp.period}</span>
                  </div>
                </div>
                <ul style={s.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={s.bullet}>
                      <span style={s.bulletDot} />
                      <span dangerouslySetInnerHTML={{ __html: b }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div style={s.timelineRight}>
                {exp.visual}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────── Projects ───────────────────────────────── */}
      <section id="projects" className="section-container">
        <div style={s.split}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ ...s.col, flex: '1 1 420px' }}
          >
            <SectionHeader label="Consulting & Dashboards" title="Designing for Executive Clarity" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h4 style={s.projTitle}>PT. United Tractors (UNTR) — Balanced Scorecard</h4>
                <p style={s.body}>Led a 6-person cross-functional team to design and deliver a two-tier Power BI dashboard (Strategic HQ + Operational Branch). Merged all four BSC perspective datasets into a single master Excel with normalised date columns for clean Power BI ingestion.</p>
                <div style={s.tagRow}>
                  {['Power BI', 'DAX Modeling', 'Balanced Scorecard'].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div style={s.divider} />
              <div>
                <h4 style={s.projTitle}>Enterprise Architecture — Velox Bicycles</h4>
                <p style={s.body}>Led a 4-person consulting team to deliver an EA Transformation & Communication Plan for a global high-performance bicycle manufacturer. Produced governance structures and strategic mapping deliverables.</p>
                <div style={s.tagRow}>
                  {['ArchiMate', 'EA Governance', 'TOGAF'].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ flex: '1 2 480px' }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────── Achievements ───────────────────────────── */}
      <section id="achievements" className="section-container" style={{ zIndex: 12 }}>
        <SectionHeader label="Accolades" title="National Competitions & Honours" center />

        <div style={s.achGrid}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="glass-card" style={s.achCard} onMouseMove={mouseGlow}>
              <div style={s.achTop}>
                <span style={{ ...s.achPlace, color: a.placeColor, borderColor: a.placeBorder }}>{a.place}</span>
                <span style={s.achTime}>{a.time}</span>
              </div>
              <h3 style={s.achTitle}>{a.title}</h3>
              <p style={s.body}>{a.desc}</p>
              <div style={{ ...s.divider, marginTop: 'auto', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{a.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={s.achExtras}>
          {EXTRA_ACHIEVEMENTS.map((e, i) => (
            <div key={i} style={s.achExtra}>
              <Award size={14} style={{ color: 'rgba(167,139,250,0.7)', flexShrink: 0 }} />
              <span>{e}</span>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <Gallery />
      </section>

      {/* ───────────────────────────── Leadership ─────────────────────────────── */}
      <section id="leadership" className="section-container">
        <SectionHeader label="Leadership" title="Organisations & Volunteering" center />
        <div style={s.orgGrid}>
          {ORGS.map((org, i) => (
            <div key={i} className="glass-card" style={s.orgCard} onMouseMove={mouseGlow}>
              <div style={s.orgTop}>
                <Users size={16} style={{ color: 'rgba(167,139,250,0.7)', flexShrink: 0 }} />
                <div>
                  <h4 style={s.orgTitle}>{org.name}</h4>
                  <span style={s.orgRole}>{org.role}</span>
                </div>
              </div>
              <p style={s.body}>{org.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────── Skills ─────────────────────────────────── */}
      <Skills />

      {/* ───────────────────────────── Contact ────────────────────────────────── */}
      <section id="contact" className="section-container" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={s.split}>
          <div style={s.col}>
            <SectionHeader label="Connect" title={"Let's Build\nSomething Great"} />
            <p style={s.body}>
              Looking for an internship from <strong style={{ color: 'rgba(255,255,255,0.8)' }}>September 2026 to April 2027</strong>.
              Eager to contribute to data pipelines, business process automation, or blockchain-based solutions.
            </p>
            <div style={s.contactLinks}>
              {[
                { href: 'mailto:rifqi_26000130@utp.edu.my', icon: <Mail size={15}/>, text: 'rifqi_26000130@utp.edu.my' },
                { href: 'tel:+60108228354',                  icon: <Phone size={15}/>, text: '+60108228354' },
                { href: 'https://linkedin.com/in/rifqiaufathufail/', icon: <LinkedinIcon size={15}/>, text: 'linkedin.com/in/rifqiaufathufail', ext: true },
              ].map(({ href, icon, text, ext }) => (
                <a key={href} href={href} target={ext ? '_blank' : undefined} rel="noreferrer" style={s.contactLink} className="contact-link">
                  {icon}<span>{text}</span>{ext && <ExternalLink size={11} style={{ opacity: 0.4 }} />}
                </a>
              ))}
            </div>
          </div>

          <div style={{ ...s.col, flex: '1 1 380px' }}>
            <div className="glass-card" style={{ padding: '32px' }} onMouseMove={mouseGlow}>
              {formSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={s.successBox}>
                  <div style={s.successCircle}>
                    <Check size={20} style={{ color: '#4ade80' }} />
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600 }}>Message received!</h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                    I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    { id: 'name',    label: 'Name',          type: 'text',  ph: 'Your name' },
                    { id: 'email',   label: 'Email Address', type: 'email', ph: 'your@email.com' },
                  ].map(({ id, label, type, ph }) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor={id} style={s.fLabel}>{label}</label>
                      <input
                        id={id} type={type} required placeholder={ph}
                        className="form-input"
                        value={formData[id]}
                        onChange={e => setFormData(p => ({ ...p, [id]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="message" style={s.fLabel}>Message</label>
                    <textarea
                      id="message" rows={4} required
                      placeholder="Hello Rifqi, I'd like to connect about..."
                      className="form-input"
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message <ChevronRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Footer ──────────────────────────────────── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <span style={s.footerText}>© {new Date().getFullYear()} Rifqi Aufa Thufail</span>
          <span style={s.footerRight}>Built with React & Framer Motion</span>
        </div>
      </footer>

      {/* ───────────────────────────── Back to Top ──────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={s.bttBtn}
            className="back-to-top-btn"
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
            <span>Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Global inline styles ── */}
      <style>{`
        .copy-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 6px 14px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: monospace;
          white-space: nowrap;
        }
        .copy-pill:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.8);
        }
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s ease;
        }
        .contact-link:hover { color: rgba(255,255,255,0.85); }
      `}</style>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    org: 'GovChain Permit, Indonesia Blockchain Center',
    role: 'Tech Lead & UX Designer', period: 'Aug – Dec 2025',
    bullets: [
      'Delivered ready MVP within <strong>1 month</strong> leading a cross-functional team of 4; presented to Dubai Blockchain Center Representatives & Surabaya City Government.',
      'Architected decentralized permit issuance using <strong>ERC-721 smart contracts</strong> on Base Network, IPFS off-chain storage, and QR verification — achieving <strong>95% improvement</strong> in processing speed.',
      'Designed end-to-end UX flow and UI mockups in Figma integrated with Surabaya City Government\'s SSW Alfa system.',
    ],
    visual: <GovChainSimulator />,
  },
  {
    org: 'FarmSync, Indonesia Blockchain Center',
    role: 'Project Lead', period: 'Sep – Nov 2025',
    bullets: [
      'Led blockchain architecture for a transparent palm oil supply chain integrating IoT sensors (ESP32), EVM smart contracts, and MQTT/REST API middleware.',
      'Designed smart contract automated settlement targeting payment processing reduction from <strong>T+7–14 days to under 1 hour</strong>.',
      'Projected <strong>50% reduction in operational costs</strong> and <strong>65% improvement</strong> in system access efficiency.',
    ],
    visual: (
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span className="label-mono">Architecture Blueprint</span>
        <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>Palm Oil Supply Chain</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['ESP32 IoT', 'MQTT Layer', 'Smart Contract', 'Settlement'].map((n, i, arr) => (
            <React.Fragment key={n}>
              <span style={{
                fontSize: '0.65rem', fontFamily: 'monospace',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px', padding: '3px 8px',
                color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap'
              }}>{n}</span>
              {i < arr.length - 1 && <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
          {[['< 1 Hr', 'Settlement Speed'], ['50%', 'OpEx Reduction']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{v}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    org: 'Carbon Addons, Do Well Do Good Client Project',
    role: 'Analyst', period: 'Mar – Dec 2024',
    bullets: [
      'Identified 5 root-cause barriers to public transport adoption, structuring a problem-solution framework for carbon offset API integration with Surabaya\'s GoBis App.',
      'Architected a B2B2C API partnership model between Carbon Addons and GoBis App for real-time carbon usage detection.',
      'Awarded <strong>"Best Client Project"</strong> for exceptional research delivery.',
    ],
    visual: (
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span className="label-mono">B2B2C Model</span>
        <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>GoBis API Carbon Tracker</h4>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
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

const ACHIEVEMENTS = [
  {
    place: '2nd Place', placeColor: 'rgba(250,204,21,0.9)', placeBorder: 'rgba(250,204,21,0.25)',
    time: 'Oct 2025',
    title: 'Telkomsel × IS Expo 2025',
    desc: 'Architected a 5-layer ESG IT solution (J.E.L.A.S) on SAP BTP, integrating IoT sensors and SAP ERP modules into a unified data pipeline for real-time sustainability tracking. Designed a Carbon MRV engine covering Scope 1, 2, and 3 emissions aligned with IFRS S1 & S2.',
    sub: 'National Business Case Competition · 300+ participants',
  },
  {
    place: 'Finalist (Top 12)', placeColor: 'rgba(167,139,250,0.9)', placeBorder: 'rgba(124,58,237,0.3)',
    time: 'May 2026',
    title: 'Travoy Jasamarga × Marketeers WOW Case',
    desc: 'Architected an end-to-end marketing strategy (R.O.U.T.E.) targeting 30% user growth and 9–20% YoY customer acquisition. Designed a 3-phase influencer marketing strategy applying Innovation Adoption Theory.',
    sub: 'Held by Philip Kotler\'s Markplus Inc. · 263 Teams',
  },
];

const EXTRA_ACHIEVEMENTS = [
  '1st Place, Best Expo Stand — Agile Innovation Expo ITS 2024',
  'ISCOM Game Application Development 2024 Finalist',
  'Markplus Institute bluChamp Business Plan Certified',
];

const ORGS = [
  {
    name: 'Do Well Do Good (DWDG) ITS',
    role: 'Director of Media, Marketing & Communications',
    desc: 'Grew Instagram profile to 551.4K total views (+100%), 41.9K reach (+49.5%), and 25K profile visits (+90.8%) over 9 months. Implemented an Internal Development Performance (IDP) system to track team competence and punctuality.',
  },
  {
    name: 'Jakarta International MUN (JMUN)',
    role: 'Staff, Documentation & Videos',
    desc: 'Created 3 long-form YouTube videos, including one in collaboration with the United Nations Association Indonesia. Content generated over 400K+ views across JMUN\'s official social media channels.',
  },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  split: { display: 'flex', gap: '48px', flexWrap: 'wrap' },
  col:   { flex: '1 1 360px', display: 'flex', flexDirection: 'column' },
  body:  { fontSize: 'var(--font-size-base)', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)' },
  divider: { height: '1px', background: 'rgba(255,255,255,0.07)', margin: '20px 0' },
  contactRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },

  // Education
  eduCard: { padding: '20px' },
  eduTop:  { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' },
  eduTitle: { fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#ffffff', marginBottom: '2px' },
  eduLoc:  { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.35)' },
  eduDeg:  { fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: '6px' },
  badgeRow: { display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' },
  cgpaBadge: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px', padding: '2px 8px', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
  },
  deanBadge: {
    background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
    borderRadius: '4px', padding: '2px 8px', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'rgba(167,139,250,0.85)',
  },

  // Timeline
  timeline: { display: 'flex', flexDirection: 'column', gap: '56px' },
  timelineItem: { display: 'flex', gap: '40px', flexWrap: 'wrap' },
  timelineLeft: { flex: '1 1 400px' },
  timelineRight: { flex: '1 1 360px' },
  tlHeader: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' },
  tlDot: {
    width: '7px', height: '7px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
    marginTop: '8px', flexShrink: 0,
    boxShadow: '0 0 10px rgba(124,58,237,0.5)',
  },
  expTitle: { fontSize: 'var(--font-size-md)', fontWeight: 700, color: '#ffffff' },
  expRole:  { fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', display: 'block', marginTop: '2px' },
  bullets:  { display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px', listStyle: 'none' },
  bullet:   { display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 },
  bulletDot: { width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', marginTop: '9px', flexShrink: 0 },

  // Projects
  projTitle: { fontSize: 'var(--font-size-md)', fontWeight: 700, color: '#ffffff', marginBottom: '8px' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' },

  // Achievements
  achGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  achCard: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' },
  achTop:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  achPlace: {
    fontSize: 'var(--font-size-xs)', fontWeight: 700, letterSpacing: '0.08em',
    border: '1px solid', borderRadius: '4px', padding: '2px 7px', textTransform: 'uppercase',
  },
  achTime:  { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' },
  achTitle: { fontSize: 'var(--font-size-md)', fontWeight: 700, color: '#ffffff' },
  achExtras: { display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px', justifyContent: 'center' },
  achExtra: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px', padding: '9px 14px', fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.55)',
  },

  // Orgs
  orgGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  orgCard: { padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' },
  orgTop:  { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  orgTitle: { fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#ffffff' },
  orgRole:  { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: '2px' },

  // Contact
  contactLinks: { display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '24px' },
  contactLink: { transition: 'color 0.2s ease' },
  fLabel: { fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'rgba(255,255,255,0.55)' },
  successBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '12px', padding: '40px 0',
  },
  successCircle: {
    width: '44px', height: '44px', borderRadius: '50%',
    background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  // Footer
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '28px 24px', position: 'relative', zIndex: 10,
    background: 'rgba(0,0,0,0.4)',
  },
  footerInner: {
    maxWidth: '1100px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
  },
  footerText:  { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.25)' },
  footerRight: { fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' },

  // Back to top
  bttBtn: {
    position: 'fixed', bottom: '28px', right: '28px', zIndex: 1000,
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'rgba(15,15,15,0.9)', backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.75)', padding: '9px 16px',
    borderRadius: '100px', fontSize: 'var(--font-size-xs)', fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.2s ease',
    boxShadow: '0 8px 24px -6px rgba(0,0,0,0.5)',
  },
};
