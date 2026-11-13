import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Camera,
  Code,
  Compass,
  FolderOpen,
  Layers,
  Mail,
  Trophy,
  Video,
} from 'lucide-react';
import Gallery from '../components/Gallery';
import ContactGate from '../components/ContactGate';
import HeroShell from '../components/HeroShell';
import PartnerMarquee from '../components/PartnerMarquee';

// The glass cards along the bottom of the hero: one door per part of the site.
const DOORS = [
  {
    Icon: Briefcase,
    label: 'Experience',
    line: 'Tech lead on GovChain Permit, project lead on FarmSync.',
    href: '/experience/',
  },
  {
    Icon: FolderOpen,
    label: 'Portfolio',
    line: 'A Power BI scorecard and an enterprise architecture plan, slide by slide.',
    href: '/portfolio/',
  },
  {
    Icon: Layers,
    label: 'Skills',
    line: 'Power BI, SAP S/4HANA, Python, React and EVM smart contracts.',
    href: '/skills/',
  },
  {
    Icon: Mail,
    label: 'Contact',
    line: 'Open to internships from September 2026 to April 2027.',
    href: '/#contact',
  },
];

// Decorative glass blocks in the first bento tile.
const CUBES = [
  { x: '96px', y: '70px', s: '104px', t: '7s', d: '0s' },
  { x: '18px', y: '28px', s: '56px', t: '6s', d: '-2s', tone: 'orange' },
  { x: '44px', y: '158px', s: '40px', t: '5s', d: '-1s' },
];

const STUDY = [
  { uni: 'Universiti Teknologi PETRONAS', note: 'Perak, Malaysia · Dean’s List', cgpa: '3.52' },
  { uni: 'Institut Teknologi Sepuluh Nopember', note: 'Surabaya, Indonesia', cgpa: '3.56' },
];

const TOOLS = ['Power BI', 'SAP S/4HANA', 'Python', 'React', 'EVM smart contracts'];

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


// Lucide has no badminton icon, so this is a shuttlecock in the same stroke style.
function Shuttlecock({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="7" cy="17" r="3" />
      <path d="M9.2 14.8 L18.5 5.5" />
      <path d="M12 12 L13.5 6.5 L20 4" />
      <path d="M12 12 L17.5 10.5 L20 4" />
      <path d="M10.5 13.5 L11 8.5" />
    </svg>
  );
}

const HOBBIES = [
  { name: 'Videography', Icon: Video, desc: 'Long-form event films and short social clips, shot and edited myself.' },
  { name: 'Photography', Icon: Camera, desc: 'Documenting the events and people I work with.' },
  { name: 'Coding projects', Icon: Code, desc: 'Side builds in React and smart contracts — this site included.' },
  { name: 'Badminton', Icon: Shuttlecock, desc: 'Fast games to stay sharp between deadlines.' },
  { name: 'Basketball', Icon: Trophy, desc: 'Team play and strategy on the court.' },
  { name: 'Adventure', Icon: Compass, desc: 'Hiking and exploring outdoors.' },
];

export default function HomePage() {
  return (
    <>
      <HeroShell>
        <h1 className="hero__title rise">
          Rifqi Aufa Thufail
          <span>builds systems people can verify</span>
        </h1>

        <p className="hero__lead rise" style={{ '--d': '140ms' }}>
          I turn slow, paper-heavy processes into data analytics, blockchain and ERP systems, as an
          Information Systems student leading teams across Malaysia and Indonesia.
        </p>

        <div className="hero__ctas rise" style={{ '--d': '200ms' }}>
          <a className="btn btn-primary" href="#work">
            See the work <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a className="btn btn-ghost" href="/#contact">
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <nav className="doors rise" style={{ '--d': '260ms' }} aria-label="Explore the site">
          {DOORS.map(({ Icon, label, line, href }) => (
            <a key={label} className="door" href={href}>
              <span className="door__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="door__label">{label}</span>
              <span className="door__line">{line}</span>
              <span className="door__arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </nav>
      </HeroShell>

      <div className="sheet">
      <section className="partners" aria-label="Collaborated with and studied at">
        <p className="mono-label partners__label">Collaborated With &amp; Studied At</p>
        <PartnerMarquee />
      </section>

      <section id="glance" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">At a glance</p>
            <h2 className="section-head__title">
              Data, blockchain and ERP systems, <em>led end to end</em>
            </h2>
            <p className="section-head__sub">
              I&rsquo;m an Information Systems student on a dual degree between{' '}
              <strong>Universiti Teknologi PETRONAS</strong> in Malaysia and <strong>ITS Surabaya</strong> in
              Indonesia. I&rsquo;ve led teams that shipped an on-chain permit system presented to Surabaya City
              Government, a KPI dashboard for PT United Tractors, and an ESG platform that took 2nd place at a
              national case competition.
            </p>
          </div>

          <ul className="bento-grid" aria-label="Rifqi at a glance">
            <li className="tile tilt tile--role">
              <p className="tile__label">Role</p>
              <p className="tile__text">Information Systems student, team lead on data and blockchain projects</p>
              <div className="tile__art art-cubes" aria-hidden="true">
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
            </li>

            <li className="tile tilt tile--blue">
              <p className="tile__label">Kickoff to MVP</p>
              <p className="tile__value">1 month</p>
              <p className="tile__desc">From kickoff to a working GovChain Permit MVP, leading a team of four</p>
              <div className="tile__art art-permit" aria-hidden="true">
                <div className="permit permit--back" />
                <div className="permit">
                  <i /><i /><i /><i /><i />
                  <b>Verified</b>
                </div>
              </div>
            </li>

            <li className="tile tilt tile--based">
              <p className="tile__label">Based in</p>
              <p className="tile__desc">Perak, Malaysia and Surabaya, Indonesia</p>
              <div className="tile__art art-globe" aria-hidden="true">
                <i /><i />
              </div>
            </li>

            <li className="tile tilt tile--speaks">
              <p className="tile__label">Speaks</p>
              <p className="tile__desc">English (IELTS 7.0), Bahasa Indonesia, Bahasa Melayu</p>
              <div className="tile__art art-bubbles" aria-hidden="true">
                <i>EN</i><i>ID</i><i>MS</i>
              </div>
            </li>

            <li className="tile tilt tile--grey">
              <p className="tile__label">National case competition</p>
              <p className="tile__value">2nd of 300+</p>
              <p className="tile__desc">Telkomsel × IS Expo 2025 national business case competition</p>
              <div className="tile__art art-podium" aria-hidden="true">
                <i style={{ '--h': '62px' }} /><i style={{ '--h': '88px' }} /><i style={{ '--h': '42px' }} />
              </div>
            </li>

            <li className="tile tilt tile--orange">
              <p className="tile__label">Finalist</p>
              <p className="tile__value">Top 12 of 263</p>
              <p className="tile__desc">Teams at the Travoy Jasamarga × Marketeers WOW Case Competition</p>
              <div className="tile__art art-coins" aria-hidden="true">
                <i style={{ '--x': '0px', '--y': '44px' }} />
                <i style={{ '--x': '6px', '--y': '28px' }} />
                <i style={{ '--x': '-2px', '--y': '10px' }} />
              </div>
            </li>

            <li className="tile tilt tile--ink">
              <p className="tile__label">Reach</p>
              <p className="tile__value">400K+</p>
              <p className="tile__desc">Views on videos I produced for Jakarta International MUN</p>
              <div className="tile__art art-play" aria-hidden="true" />
            </li>

            <li className="tile tilt tile--study">
              <p className="tile__label">Studying</p>
              <ul className="study">
                {STUDY.map(({ uni, note, cgpa }) => (
                  <li key={uni}>
                    <span className="study__uni">
                      {uni}
                      <small>{note}</small>
                    </span>
                    <span className="study__cgpa">CGPA {cgpa}</span>
                  </li>
                ))}
              </ul>
            </li>

            <li className="tile tilt tile--tools">
              <p className="tile__label">Works with</p>
              <ul className="keys">
                {TOOLS.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </li>
          </ul>
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
                <li key={name} className="card tilt bento__cell">
                  <div className="bento__top" aria-hidden="true">
                    <Icon size={22} />
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
      </div>
    </>
  );
}
