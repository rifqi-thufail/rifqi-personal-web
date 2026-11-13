import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  Camera,
  Code,
  Compass,
  Trophy,
  Video,
} from 'lucide-react';
import Gallery from '../components/Gallery';
import ContactGate from '../components/ContactGate';

// The fact sheet beside the headline: who, where, what — readable in five seconds.
const FACTS = [
  { term: 'Role', detail: 'Information Systems student, team lead on data and blockchain projects' },
  { term: 'Based in', detail: 'Perak, Malaysia and Surabaya, Indonesia' },
  {
    term: 'Studying',
    detail: (
      <>
        Universiti Teknologi PETRONAS — CGPA 3.52, Dean&rsquo;s List
        <br />
        Institut Teknologi Sepuluh Nopember — CGPA 3.56
      </>
    ),
  },
  { term: 'Works with', detail: 'Power BI, SAP S/4HANA, Python, React, EVM smart contracts' },
  { term: 'Speaks', detail: 'English (IELTS 7.0), Bahasa Indonesia, Bahasa Melayu' },
];

const STATS = [
  { value: '1 month', label: 'From kickoff to a working GovChain Permit MVP, leading a team of four' },
  { value: '2nd of 300+', label: 'Telkomsel × IS Expo 2025 national business case competition' },
  { value: 'Top 12 of 263', label: 'Teams at the Travoy Jasamarga × Marketeers WOW Case Competition' },
  { value: '400K+', label: 'Views on videos I produced for Jakarta International MUN' },
];

const WORK = [
  {
    kicker: 'Blockchain · Tech Lead',
    title: 'GovChain Permit',
    text: 'Business permits issued as ERC-721 tokens on Base, with documents on IPFS and QR verification. Built at Indonesia Blockchain Center and presented to Surabaya City Government and Dubai Blockchain Center representatives.',
    result: 'Up to 95% faster permit verification',
    href: '/experience/',
    tags: ['ERC-721', 'Base', 'IPFS', 'Figma'],
  },
  {
    kicker: 'Supply chain · Project Lead',
    title: 'FarmSync',
    text: 'A transparent palm oil supply chain: ESP32 sensors feed an MQTT/REST layer and EVM smart contracts that settle crude palm oil transactions automatically.',
    result: 'Settlement target: from 7–14 days to under an hour',
    href: '/experience/',
    tags: ['IoT', 'Smart contracts', 'MQTT'],
  },
  {
    kicker: 'Analytics · Team Leader',
    title: 'Balanced Scorecard for PT United Tractors',
    text: 'Led six people to deliver a two-tier Power BI dashboard — strategic view for headquarters, operational view for branches — on one normalised dataset covering all four scorecard perspectives.',
    result: 'One master dataset behind every KPI',
    href: '/portfolio/untr-balanced-scorecard/',
    tags: ['Power BI', 'DAX', 'KPI design'],
  },
  {
    kicker: 'ESG · Competition, 2nd place',
    title: 'J.E.L.A.S sustainability platform',
    text: 'A five-layer ESG architecture on SAP BTP that joins IoT sensor data with SAP ERP modules, plus a carbon MRV engine for Scope 1, 2 and 3 emissions aligned with IFRS S1 and S2.',
    result: '2nd place among 300+ participants',
    href: '/#accolades',
    tags: ['SAP BTP', 'Carbon MRV', 'IFRS S1/S2'],
  },
];

const ACHIEVEMENTS = [
  {
    place: '2nd Place',
    time: 'Oct 2025',
    title: 'Telkomsel × IS Expo 2025',
    desc: 'Architected a five-layer ESG IT solution (J.E.L.A.S) on SAP BTP, integrating IoT sensors and SAP ERP modules into a unified data pipeline for real-time sustainability tracking. Designed a Carbon MRV engine covering Scope 1, 2, and 3 emissions aligned with IFRS S1 and S2.',
    sub: 'National Business Case Competition · 300+ participants',
  },
  {
    place: 'Finalist (Top 12)',
    time: 'May 2026',
    title: 'Travoy Jasamarga × Marketeers WOW Case',
    desc: 'Architected an end-to-end marketing strategy (R.O.U.T.E.) targeting 30% user growth and 9% to 20% YoY customer acquisition. Designed a three-phase influencer marketing strategy applying Innovation Adoption Theory.',
    sub: 'Held by Philip Kotler’s Markplus Inc. · 263 Teams',
  },
];

const EXTRA_ACHIEVEMENTS = [
  '1st Place, Best Expo Stand — Agile Innovation Expo ITS 2024',
  '“Best Client Project” — Do Well Do Good ITS, for Carbon Addons',
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

const HOBBIES = [
  { name: 'Videography', Icon: Video, desc: 'Long-form event films and short social clips, shot and edited myself.' },
  { name: 'Photography', Icon: Camera, desc: 'Documenting the events and people I work with.' },
  { name: 'Coding projects', Icon: Code, desc: 'Side builds in React and smart contracts — this site included.' },
  { name: 'Badminton', Icon: Activity, desc: 'Fast games to stay sharp between deadlines.' },
  { name: 'Basketball', Icon: Trophy, desc: 'Team play and strategy on the court.' },
  { name: 'Adventure', Icon: Compass, desc: 'Hiking and exploring outdoors.' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero" data-parallax>
        <div className="backdrop" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="pill rise">
              <span className="pill__dot" aria-hidden="true" />
              Available for internship · Sep 2026 – Apr 2027
            </p>

            <h1 className="hero__title rise" style={{ '--d': '60ms' }}>
              Rifqi Aufa <span>Thufail</span>
            </h1>

            <p className="hero__lead rise" style={{ '--d': '120ms' }}>
              I turn slow, paper-heavy processes into data and blockchain systems people can verify.
            </p>

            <p className="hero__sub rise" style={{ '--d': '180ms' }}>
              I&rsquo;m an Information Systems student on a dual degree between{' '}
              <strong>Universiti Teknologi PETRONAS</strong> in Malaysia and <strong>ITS Surabaya</strong> in
              Indonesia. I&rsquo;ve led teams that shipped an on-chain permit system presented to Surabaya City
              Government, a KPI dashboard for PT United Tractors, and an ESG platform that took 2nd place at a
              national case competition.
            </p>

            <div className="hero__ctas rise" style={{ '--d': '240ms' }}>
              <a className="btn btn-primary" href="#work">
                See the work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="btn btn-secondary" href="/#contact">
                Get in touch <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="card facts rise" style={{ '--d': '200ms' }} aria-label="Rifqi at a glance">
            <p className="mono-label facts__label">At a glance</p>
            <dl className="facts__list">
              {FACTS.map(({ term, detail }) => (
                <div key={term} className="facts__row">
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="container">
          <ul className="proof" aria-label="Results in numbers">
            {STATS.map(({ value, label }) => (
              <li key={value}>
                <span className="proof__value">{value}</span>
                <span className="proof__label">{label}</span>
              </li>
            ))}
          </ul>
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

      <section id="work" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">01</span>Selected Work</p>
            <h2 className="section-head__title">What I&rsquo;ve built and led</h2>
            <p className="section-head__sub">
              Four projects, each with a real client, partner or panel of judges on the other side of the table.
            </p>
          </div>

          <div className="grid grid--2">
            {WORK.map((w) => (
              <a key={w.title} href={w.href} className="card card--pad tilt work-card">
                <p className="mono-label work-card__kicker">{w.kicker}</p>
                <h3 className="work-card__title">
                  {w.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </h3>
                <p className="card__text">{w.text}</p>
                <p className="work-card__result">{w.result}</p>
                <div className="tag-row">
                  {w.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <p className="section-more">
            <a className="btn btn-secondary" href="/experience/">
              Full experience &amp; education <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn btn-secondary" href="/portfolio/">
              All portfolio projects <ArrowRight size={16} aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      <section id="accolades" className="section section--subtle">
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

          <div className="hero__showcase">
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
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container about">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">03</span>About</p>
            <h2 className="section-head__title">Who is Rifqi Aufa Thufail?</h2>
            <div className="about__prose">
              <p>
                I study Information Systems on a dual-degree track: a Bachelor of Information Systems (Hons) at
                Universiti Teknologi PETRONAS in Perak, Malaysia, specialising in Big Data Analytics with a minor
                in Corporate Management, and a Bachelor of Information Systems at Institut Teknologi Sepuluh
                Nopember in Surabaya, Indonesia.
              </p>
              <p>
                Most of my work sits where business process meets technology. At Indonesia Blockchain Center I
                was tech lead and UX designer for GovChain Permit and project lead for FarmSync. I&rsquo;ve also
                led consulting-style teams on enterprise architecture and business intelligence, and directed
                media and marketing for Do Well Do Good ITS, where our Instagram reached 551.4K views in nine
                months.
              </p>
              <p>
                I&rsquo;m looking for an internship from September 2026 to April 2027 in data analytics, business
                process improvement, or blockchain systems.
              </p>
            </div>
          </div>

          <div>
            <p className="mono-label about__label">Outside classes</p>
            <ul className="bento">
              {HOBBIES.map(({ name, Icon, desc }) => (
                <li key={name} className="card bento__cell">
                  <div className="bento__top" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <h3 className="card__title">{name}</h3>
                  <p className="card__text">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="section section--subtle">
        <div className="container contact">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow__num" aria-hidden="true">04</span>Connect</p>
            <h2 className="section-head__title">Let&rsquo;s Build Something Great</h2>
            <p className="section-head__sub">
              Hiring an intern, or want to talk through a data, process or blockchain problem? Send me a short note and
              I will get back to you personally.
            </p>
          </div>

          <ContactGate />
        </div>
      </section>
    </>
  );
}
