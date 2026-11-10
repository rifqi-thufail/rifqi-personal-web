import { Fragment } from 'react';
import { Check, ChevronRight, GraduationCap, Users } from 'lucide-react';
import GovChainSimulator from '../components/GovChainSimulator';
import PageHeader from '../components/PageHeader';

const EXPERIENCES = [
  {
    org: 'GovChain Permit, Indonesia Blockchain Center',
    role: 'Tech Lead & UX Designer',
    period: 'Aug – Dec 2025',
    bullets: [
      <>
        Delivered ready MVP within <strong>1 month</strong> leading a cross-functional team of four; presented to
        Dubai Blockchain Center Representatives and Surabaya City Government.
      </>,
      <>
        Architected decentralised permit issuance using <strong>ERC-721 smart contracts</strong> on Base Network,
        IPFS off-chain storage, and QR verification — achieving <strong>95% improvement</strong> in processing
        speed.
      </>,
      <>
        Designed end-to-end UX flow and UI mockups in Figma integrated with Surabaya City Government&rsquo;s SSW
        Alfa system.
      </>,
    ],
    visual: <GovChainSimulator />,
  },
  {
    org: 'FarmSync, Indonesia Blockchain Center',
    role: 'Project Lead',
    period: 'Sep – Nov 2025',
    bullets: [
      <>
        Led blockchain architecture for a transparent palm oil supply chain integrating IoT sensors (ESP32), EVM
        smart contracts, and MQTT/REST API middleware.
      </>,
      <>
        Designed smart contract automated settlement targeting payment processing reduction from{' '}
        <strong>T+7–14 days to under 1 hour</strong>.
      </>,
      <>
        Projected <strong>50% reduction in operational costs</strong> and <strong>65% improvement</strong> in
        system access efficiency.
      </>,
    ],
    visual: (
      <div className="card card--pad">
        <p className="mono-label">Architecture Blueprint</p>
        <h4 className="card__title">Palm Oil Supply Chain</h4>
        <div className="flow">
          {['ESP32 IoT', 'MQTT Layer', 'Smart Contract', 'Settlement'].map((node, i, arr) => (
            <Fragment key={node}>
              <span className="tag">{node}</span>
              {i < arr.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
            </Fragment>
          ))}
        </div>
        <div className="stat-row">
          {[
            ['< 1 Hr', 'Settlement Speed'],
            ['50%', 'OpEx Reduction'],
          ].map(([value, label]) => (
            <div key={label}>
              <span className="stat__value">{value}</span>
              <span className="stat__label">{label}</span>
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
      <>
        Identified five root-cause barriers to public transport adoption, structuring a problem-solution framework
        for carbon offset API integration with Surabaya&rsquo;s GoBis App.
      </>,
      <>
        Architected a B2B2C API partnership model between Carbon Addons and GoBis App for real-time carbon usage
        detection.
      </>,
      <>
        Awarded <strong>&ldquo;Best Client Project&rdquo;</strong> for exceptional research delivery.
      </>,
    ],
    visual: (
      <div className="card card--pad">
        <p className="mono-label">B2B2C Model</p>
        <h4 className="card__title">GoBis API Carbon Tracker</h4>
        <p className="card__text">
          Calculates carbon offsets based on public transport route distance. Rewards users with loyalty points in
          the GoBis ecosystem.
        </p>
        <div className="tag-row">
          {['API Integration', 'ESG Framework', 'Loyalty Gamification'].map((t) => (
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
    desc: 'Created three long-form YouTube videos, including one in collaboration with the United Nations Association Indonesia. Content generated over 400K+ views across JMUN’s official social media channels.',
  },
];

const EDUCATION = [
  {
    uni: 'Universiti Teknologi PETRONAS',
    loc: 'Perak, Malaysia · Aug 2023 – Present',
    deg: 'Bachelor of Information Systems (Hons)',
    sub: 'Specialisation: Big Data Analytics · Minor: Corporate Management',
    cgpa: '3.52 / 4.0',
    badge: 'Dean’s List',
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
  return (
    <>
      <PageHeader eyebrow="Career Journey" title="Experience & Education">
        My academic background and professional engagements in engineering and operations.
      </PageHeader>

      <section className="section">
        <div className="container">
          <h2 className="block-title"><span className="eyebrow__num" aria-hidden="true">01</span>Education</h2>
          <div className="grid grid--2">
            {EDUCATION.map((edu) => (
              <article key={edu.uni} className="card card--pad">
                <div className="card__head">
                  <div className="icon-tile" aria-hidden="true">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="card__title">{edu.uni}</h3>
                    <p className="card__meta">{edu.loc}</p>
                  </div>
                </div>
                <p className="edu__degree">{edu.deg}</p>
                <p className="card__text">{edu.sub}</p>
                <div className="tag-row">
                  <span className="tag">CGPA {edu.cgpa}</span>
                  {edu.badge && <span className="tag tag--accent">{edu.badge}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <h2 className="block-title"><span className="eyebrow__num" aria-hidden="true">02</span>Professional Experience</h2>
          <div className="exp-list">
            {EXPERIENCES.map((exp) => (
              <article key={exp.org} className="exp">
                <div>
                  <p className="mono-label">{exp.period}</p>
                  <h3 className="exp__org">{exp.org}</h3>
                  <p className="exp__role">{exp.role}</p>
                  <ul className="check-list">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>
                        <Check size={16} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{exp.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="block-title"><span className="eyebrow__num" aria-hidden="true">03</span>Leadership &amp; Volunteering</h2>
          <div className="grid grid--2">
            {ORGS.map((org) => (
              <article key={org.name} className="card card--pad">
                <div className="card__head">
                  <div className="icon-tile" aria-hidden="true">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="card__title">{org.name}</h3>
                    <p className="card__meta">{org.role}</p>
                  </div>
                </div>
                <p className="card__text">{org.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
