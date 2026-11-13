const deck = (slug, pages) => ({
  slug,
  pages,
  src: (n) => `/projects/${slug}/p-${String(n).padStart(2, '0')}.webp`,
});

export const PROJECTS = [
  {
    id: 'untr-balanced-scorecard',
    title: 'PT. United Tractors (UNTR) — Balanced Scorecard',
    subtitle: 'Executive KPI Dashboard',
    description: 'Led a six-person cross-functional team to design and deliver a two-tier Power BI dashboard, covering both Strategic HQ and Operational Branch levels. Normalised and merged datasets from all four Balanced Scorecard perspectives into a single master spreadsheet. This step ensured clean data ingestion and seamless relationship mapping in Power BI.',
    tags: ['Power BI', 'DAX Modeling', 'Balanced Scorecard', 'Data Normalisation'],
    image: '/projects/untr/hq-financial.webp',
    gallery: [
      { src: '/projects/untr/hq-financial.webp', caption: 'HQ view — Financial perspective: revenue growth, operating margin, ROE and debt-to-equity across all branches.' },
      { src: '/projects/untr/hq-customer.webp', caption: 'HQ view — Customer perspective: CSI, retention, NPS and contract renewal.' },
      { src: '/projects/untr/branch-financial.webp', caption: 'Branch view (Jawa-Jakarta) — Financial KPIs against targets.' },
      { src: '/projects/untr/branch-process-alt.webp', caption: 'Branch view — Internal process KPIs: ESG compliance, equipment uptime, supply chain reliability, digitalisation.' },
      { src: '/projects/untr/branch-internal-process.webp', caption: 'Branch view — Internal process KPIs by month and quarter.' },
      { src: '/projects/untr/branch-learning-growth.webp', caption: 'Branch view — Learning & Growth: certification, UT SMART hours, digital projects, engagement.' },
      { src: '/projects/untr/hq-financial-alt.webp', caption: 'HQ view — Financial perspective with interactive filters (alternate layout).' }
    ],
    achievements: [
      'Successfully consolidated financial, customer, internal process, and learning datasets.',
      'Designed executive-level gauges and operational branch tables for business performance analysis.',
      'Reduced management review preparation time through automated report refreshes.'
    ]
  },
  {
    id: 'velox-bicycles-ea',
    title: 'Enterprise Architecture — Velox Bicycles',
    subtitle: 'The P.E.D.A.L Strategy: EA Transformation & Communication Plan',
    description: 'Led a four-person consulting team to turn Velox Bicycles, a global manufacturer of road, gravel and mountain bikes, from fragmented, spreadsheet-driven operations into an integrated, smart and sustainable manufacturer. Assessed the as-is state with the EA3 Cube framework, then designed the P.E.D.A.L solution (Platform Integration, Enterprise Alignment, Digital Shop-Floor, Authentic Traceability, Long-term Governance) alongside a stakeholder communication strategy.',
    tags: ['Enterprise Architecture', 'EA3 Cube', 'Dynamics 365', 'Change Communication'],
    image: '/projects/velox/p-01.webp',
    document: deck('velox', 42),
    achievements: [
      'Diagnosed a strategy-to-execution gap: siloed MES, Finance and Inventory, spreadsheets in five departments, and 24-hour dealer order delays.',
      'Proposed Microsoft Dynamics 365 as the integration hub, with master data management and OPC-UA/Azure IoT shop-floor sensing.',
      'Designed per-unit QR "digital genealogy" to make sustainability claims verifiable, and defined a Digital Transformation Lead governance role.',
      'Drafted a stakeholder communication plan built on strategic alignment, governance clarity, change readiness, accountability and progress visibility.'
    ]
  },
  {
    id: 'alphabet-dylos',
    title: 'Alphabet Inc. — DYLOS Treasury Model',
    subtitle: 'Dynamic Yield & Liquidity Optimization Subsystem',
    description: 'Finance Information Systems final project at Universiti Teknologi PETRONAS. Proposed a rule-based dynamic asset allocation framework that helps Alphabet put its US$126.8 Bn cash pile to work toward a ~10% FY26 yield, subject to liquidity, volatility and FCF-to-debt constraints. Combines allocation scoring, Excel bear/bull forecasting with Monte-Carlo simulation, and a Power BI monitoring dashboard. An independent academic exercise, not affiliated with Alphabet.',
    tags: ['Treasury Modelling', 'Monte-Carlo Simulation', 'Power BI', 'Excel Forecasting'],
    image: '/projects/fis/p-01.webp',
    document: deck('fis', 23),
    achievements: [
      'Framed the treasury problem with a Situation–Complication–Question–Answer storyline using FY25 cash, free cash flow and debt data.',
      'Designed an asset allocation model with liquidity and volatility scoring plus an FCF-to-debt ratio constraint.',
      'Built dynamic forecasting in Excel (bear/base/bull cases and Monte-Carlo) and tracked realized vs. target yield in Power BI.'
    ]
  },
  {
    id: 'grabfood-nudge-theory',
    title: 'GrabFood Malaysia — Nudge Theory',
    subtitle: 'Consumer Behavior Analysis',
    description: 'Consumer behavior assignment analysing how GrabFood nudges users in Malaysia. Breaks down the post-order "Grab More with FREE delivery" screen into scarcity and urgency, incentive and visual salience, sizes the addressable user base from population to ~3.5–4.0 million GrabFood users, and projects the upsell opportunity.',
    tags: ['Nudge Theory', 'Consumer Behavior', 'Market Sizing', 'Digital Marketing'],
    image: '/projects/grabfood/p-01.webp',
    document: deck('grabfood', 14),
    achievements: [
      'Mapped three nudges in one screen: countdown timer, free-delivery incentive and contrasting colour.',
      'Built a user funnel from 36.1 M Malaysians to an estimated 3.5–4.0 M active GrabFood users.',
      'Estimated a US$400M+ additional annualised GMV from a 10% post-purchase conversion uplift.'
    ]
  },
  {
    id: 'unilever-3c-strategy',
    title: 'Unilever Indonesia — 3C Strategy',
    subtitle: 'Corporate Communications in the Post-Boycott Era',
    description: 'Corporate communications case study on how Unilever Indonesia can rebuild trust after the 2023 consumer boycott. Deconstructs boycott dynamics and consumer behavior in a Muslim-majority FMCG market, then proposes an integrated image-restoring 3C strategy: Community, Clean Up and Clarity.',
    tags: ['Corporate Communications', 'Crisis Recovery', 'Brand Trust', 'FMCG'],
    image: '/projects/unilever/p-01.webp',
    document: deck('unilever', 21),
    achievements: [
      'Diagnosed the root causes behind Unilever Indonesia\'s lack of growth after the boycott.',
      'Community: "Wajah Indonesia" puts Unilever employees forward as the human face of the brand.',
      'Clean Up: reduce ties to Israel and launch Muslim-friendly products. Clarity: month-on-month asset and investment reports for transparency.'
    ]
  }
];
