import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Award,
  Camera,
  Check,
  Code,
  Compass,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  Trophy,
  Video,
} from 'lucide-react';
import Gallery from '../components/Gallery';
import Globe from '../components/Globe';
import { LinkedinIcon } from '../components/icons';
import { CONTACT } from '../data/site';
import { copyToClipboard } from '../utils/clipboard';

const HOBBIES = [
  { name: 'Photography', Icon: Camera, desc: 'Capturing moments through visual storytelling. Details coming soon.' },
  { name: 'Videography', Icon: Video, desc: 'Directing and editing short cinematic clips. Details coming soon.' },
  { name: 'Coding Projects', Icon: Code, desc: 'Architecting decentralised systems and web tools. Details coming soon.' },
  { name: 'Badminton', Icon: Activity, desc: 'Staying active on court with competitive speed. Details coming soon.' },
  { name: 'Basketball', Icon: Trophy, desc: 'Team play, strategy, and precision on the court. Details coming soon.' },
  { name: 'Adventure', Icon: Compass, desc: 'Exploring nature, hiking, and outdoor discovery. Details coming soon.' },
];

const ACHIEVEMENTS = [
  {
    place: '2nd Place',
    time: 'Oct 2025',
    title: 'Telkomsel × IS Expo 2025',
    desc: 'Architected a five-layer ESG IT solution on SAP BTP, integrating IoT sensors and SAP ERP modules into a unified data pipeline for real-time sustainability tracking. Designed a Carbon MRV engine covering Scope 1, 2, and 3 emissions aligned with IFRS S1 and S2.',
    sub: 'National Business Case Competition · 300+ participants',
  },
  {
    place: 'Finalist (Top 12)',
    time: 'May 2026',
    title: 'Travoy Jasamarga × Marketeers WOW Case',
    desc: 'Architected an end-to-end marketing strategy targeting 30% user growth and 9% to 20% YoY customer acquisition. Designed a three-phase influencer marketing strategy applying Innovation Adoption Theory.',
    sub: 'Held by Philip Kotler’s Markplus Inc. · 263 Teams',
  },
];

const EXTRA_ACHIEVEMENTS = [
  '1st Place, Best Expo Stand — Agile Innovation Expo ITS 2024',
  'ISCOM Game Application Development 2024 Finalist',
  'Markplus Institute bluChamp Business Plan Certified',
];

const PARTNERS = [
  { name: 'Indonesia Blockchain Center', logo: '/partners/indonesia-blockchain-center.png' },
  { name: 'Universiti Teknologi PETRONAS', logo: '/partners/universiti-teknologi-petronas.png' },
  { name: 'Institut Teknologi Sepuluh Nopember', logo: '/partners/institut-teknologi-sepuluh-nopember.svg' },
  { name: 'PT. United Tractors', logo: '/partners/pt-united-tractors.svg' },
  { name: 'Jasa Marga', logo: '/partners/jasa-marga.png' },
  { name: 'Travoy', logo: '/partners/travoy.png' },
  { name: 'Telkomsel', logo: '/partners/telkomsel.png' },
  { name: 'MarkPlus Inc', logo: '/partners/markplus-inc.png' },
];

const CONTACT_LINKS = [
  { label: 'WhatsApp Chat', value: CONTACT.phone, href: CONTACT.whatsappUrl, Icon: Phone, action: 'Open Chat', external: true },
  { label: 'Email Address', value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: Mail, action: 'Send Mail' },
  { label: 'LinkedIn Profile', value: CONTACT.linkedinLabel, href: CONTACT.linkedinUrl, Icon: LinkedinIcon, action: 'Connect', external: true },
];

function Rise({ delay = 0, className, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage({ onContact }) {
  const [copied, setCopied] = useState('');
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyValue = async (value, label) => {
    const ok = await copyToClipboard(value);
    if (!ok) return;
    setCopied(label);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(''), 2000);
  };

  return (
    <>
      <section className="hero" data-parallax>
        <div className="backdrop" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <Rise>
              <p className="pill">
                <span className="pill__dot" aria-hidden="true" />
                Available for internship · Sep 2026 – Apr 2027
              </p>
            </Rise>

            <Rise delay={0.06}>
              <p className="hero__intro">Hello! 👋 My name is</p>
              <h1 className="hero__title">
                Rifqi Aufa <span>Thufail</span>
              </h1>
            </Rise>

            <Rise delay={0.12}>
              <p className="hero__sub">
                Information Systems leader specialising in <strong>Big Data Analytics</strong>,{' '}
                <strong>Blockchain Architecture</strong>, and <strong>SAP ERP</strong>. Dual-degree student across
                Malaysia and Indonesia building digital systems that scale.
              </p>
            </Rise>

            <Rise delay={0.18} className="hero__ctas">
              <a className="btn btn-primary" href="#portfolio">
                View Portfolio <ArrowRight size={16} aria-hidden="true" />
              </a>
              <button type="button" className="btn btn-secondary" onClick={onContact}>
                Contact Info <ArrowRight size={16} aria-hidden="true" />
              </button>
            </Rise>
          </div>

          <div className="hero__visual">
            <Globe labels />
          </div>
        </div>

        <div className="container">
          <Rise delay={0.26} className="hero__showcase">
            <div className="browser">
              <div className="browser__bar" aria-hidden="true">
                <div className="browser__dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="browser__url">thufail.dev/gallery</div>
              </div>
              <div className="browser__body">
                <Gallery />
              </div>
            </div>
          </Rise>

          <div className="grid grid--2 hero__overview">
            <article className="card card--pad">
              <div className="meter" style={{ '--value': '80%' }} aria-hidden="true" />
              <h2 className="card__title">Life Overview</h2>
              <p className="card__text">
                I lead an active academic life pursuing a dual degree program between Malaysia and Indonesia. I
                focus on big data ecosystems, predictive modelling, and enterprise architectures.
              </p>
              <div className="stat-row">
                <div>
                  <span className="stat__value">UTP Malaysia</span>
                  <span className="mono-label">CGPA 3.52</span>
                </div>
                <div>
                  <span className="stat__value">ITS Indonesia</span>
                  <span className="mono-label">CGPA 3.56</span>
                </div>
              </div>
            </article>

            <article className="card card--pad">
              <div className="meter meter--hot" style={{ '--value': '20%' }} aria-hidden="true" />
              <h2 className="card__title">Achievements</h2>
              <p className="card__text">
                Validated business case strategies, blockchain solutions, and digital marketing accomplishments
                across national stages.
              </p>
              <div className="stat-row">
                <div>
                  <span className="stat__value">2×</span>
                  <span className="mono-label">Finalist</span>
                </div>
                <div>
                  <span className="stat__value">400K+</span>
                  <span className="mono-label">Views</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="partners" aria-label="Collaborated with and studied at">
        <p className="mono-label partners__label">Collaborated With &amp; Studied At</p>
        <div className="marquee">
          <div className="marquee__track">
            {PARTNERS.map((p) => (
              <img key={p.name} className="marquee__logo" src={p.logo} alt={p.name} title={p.name} />
            ))}
          </div>
          <div className="marquee__track" aria-hidden="true">
            {PARTNERS.map((p) => (
              <img key={p.name} className="marquee__logo" src={p.logo} alt="" />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">01</span>My Hobbies</p>
            <h2 className="section-head__title">What I Do Outside Classes</h2>
            <p className="section-head__sub">
              A preview of interests and activities. Detailed stories will be filled in later.
            </p>
          </div>

          <ul className="bento">
            {HOBBIES.map(({ name, Icon, desc }, i) => (
              <li key={name} className="card bento__cell">
                <div className="bento__top" aria-hidden="true">
                  <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={20} />
                </div>
                <h3 className="card__title">{name}</h3>
                <p className="card__text">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">02</span>Accolades</p>
            <h2 className="section-head__title">Competitions &amp; Honours</h2>
          </div>

          <div className="grid grid--2">
            {ACHIEVEMENTS.map((a) => (
              <article key={a.title} className="card card--pad tilt">
                <div className="accolade__top">
                  <span className="tag tag--hot">{a.place}</span>
                  <span className="mono-label">{a.time}</span>
                </div>
                <h3 className="card__title">{a.title}</h3>
                <p className="card__text">{a.desc}</p>
                <p className="card__foot">{a.sub}</p>
              </article>
            ))}
          </div>

          <ul className="honours">
            {EXTRA_ACHIEVEMENTS.map((e) => (
              <li key={e}>
                <Award size={16} aria-hidden="true" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container contact">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">03</span>Connect</p>
            <h2 className="section-head__title">Let&rsquo;s Build Something Great</h2>
            <p className="section-head__sub">
              Looking for an internship from September 2026 to April 2027. Reach out directly to discuss how I can
              contribute to your data pipelines, processes, or systems.
            </p>
          </div>

          <ul className="contact__list">
            {CONTACT_LINKS.map(({ label, value, href, Icon, action, external }) => (
              <li key={label} className="card contact-card">
                <div className="icon-tile" aria-hidden="true">
                  <Icon size={18} />
                </div>
                <div className="contact-card__body">
                  <span className="mono-label">{label}</span>
                  <span className="contact-card__value">{value}</span>
                </div>
                <div className="contact-card__actions">
                  <a
                    className="btn btn-primary btn-sm"
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                  >
                    {action}
                    {external && <ExternalLink size={13} aria-hidden="true" />}
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyValue(value, label)}
                    aria-label={`Copy ${label}`}
                  >
                    {copied === label ? (
                      <>
                        <Check size={14} aria-hidden="true" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <span className="sr-only" role="status">
            {copied ? `${copied} copied to clipboard` : ''}
          </span>
        </div>
      </section>
    </>
  );
}
