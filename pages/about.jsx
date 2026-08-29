import Link from 'next/link';
import PageSeo, { siteUrl } from '../components/PageSeo';

const founderAnchors = [
  {
    title: 'PubMed 35197342',
    description: 'BMJ Open protocol on follow-up barriers after abnormal cervical screening in remote Romanian communities.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/35197342/'
  },
  {
    title: 'PubMed 28460211',
    description: 'Social Science & Medicine research on cervical screening participation in Romania.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/28460211/'
  },
  {
    title: 'CerviGuard public repository',
    description: 'Implementation-facing artifact for the flagship product surface.',
    href: 'https://github.com/SmartCloverAI/CerviGuard'
  },
  {
    title: 'SmartClover citations file',
    description: 'Reusable BibTeX source for the public research references used by the site.',
    href: '/docs/smartclover-cerviguard-citations.bib'
  }
];

const valueCards = [
  {
    title: 'Creativity',
    description:
      'SmartClover makes room for original thinking, but the work has to be useful for clinicians, researchers, and operating teams.'
  },
  {
    title: 'Digitalization',
    description:
      'The company focuses on turning difficult workflows into maintainable digital systems rather than delivering one-off experiments.'
  },
  {
    title: 'Clinician-led AI for good',
    description:
      'Clinicians, researchers, and operators remain decision owners while AI accelerates triage, communication, and analysis.'
  }
];

const operatingPrinciples = [
  {
    kicker: 'Product ownership',
    title: 'Build products with defined scope.',
    description:
      'SmartClover uses product surfaces, public repositories, defined operating boundaries, and applied R&D programmes to develop and commercialize proprietary software products.'
  },
  {
    kicker: 'Evidence before claims',
    title: 'Named sources support high-stakes claims.',
    description:
      'Citations, current product proof, and dated trust material sit close to claims where accuracy matters most.'
  },
  {
    kicker: 'Trust-aware deployment',
    title: 'Deployment language stays specific.',
    description:
      'Security, privacy, governance, and procurement routes are written for clinics, research teams, procurement reviewers, and investors.'
  }
];

const companyTimeline = [
  {
    kicker: 'Research context',
    title: 'Cervical-screening work shaped the company focus',
    description:
      'Public research from 2017 and 2022 gives context for SmartClover\'s focus on screening participation and follow-up.'
  },
  {
    kicker: 'Productization',
    title: 'CerviGuard established the flagship product line',
    description:
      'The company moved from research intent into a live product surface with workflow evidence and a public implementation trail.'
  },
  {
    kicker: 'Company shape',
    title: 'SmartClover added DataGems and trust pages',
    description:
      'DataGems, trust routes, pricing, buying, and blog pages make the wider company easier to review.'
  },
  {
    kicker: 'Current stance',
    title: 'Clear paths for serious conversations',
    description:
      'Clinics, research teams, procurement reviewers, and investors can choose the route that fits their question.'
  }
];

const aboutSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SmartClover',
    url: `${siteUrl}/about`,
    description:
      'Healthcare AI company page covering SmartClover leadership, CerviGuard, research context, operating principles, and values.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Andreea Damian',
    affiliation: {
      '@type': 'Organization',
      name: 'SmartClover',
      url: siteUrl
    },
    sameAs: ['https://pubmed.ncbi.nlm.nih.gov/35197342/', 'https://pubmed.ncbi.nlm.nih.gov/28460211/']
  }
];

const About = () => (
  <>
    <PageSeo
      title="About SmartClover | Healthcare AI For Cervical Screening"
      description="SmartClover is a research-driven healthcare AI product company developing CerviGuard and DataGems through product ownership and applied R&D."
      path="/about"
      jsonLd={aboutSchema}
    />

    <header className="page-header">
      <span className="tagline">About SmartClover</span>
      <h1>A research-driven healthcare AI product company.</h1>
      <p>
        SMARTCLOVER S.R.L. was founded in July 2024. Dr. Andreea Damian leads healthcare research, consortium programmes,
        and product adoption; Prof. Dr. Andrei Ionut Damian leads AI, software, and technical R&amp;D. SmartClover develops
        and owns CerviGuard and DataGems and commercializes them through B2B software subscriptions, licensing, private
        SaaS/PaaS deployments, API access, and product-specific integration.
      </p>
    </header>

    <section className="surface-card" aria-labelledby="about-founder-heading">
      <div className="founder-grid">
        <div className="story-card">
          <p className="kicker">Founder and product focus</p>
          <h2 id="about-founder-heading">SmartClover is built around cervical-screening workflows.</h2>
          <p>
            Dr. Andreea Damian leads SmartClover with CerviGuard as the flagship product: a live workspace built for
            how cervical-screening teams already run cases, triage, and follow-up.
          </p>
          <p>
            The research links on this page provide context on screening participation and follow-up barriers in
            Romania. They are kept as references, not as a substitute for current product proof.
          </p>
          <div className="key-points">
            <span>CerviGuard is our flagship workflow product for cervical-screening teams.</span>
            <span>DataGems supports the research side of our healthcare AI work.</span>
            <span>Trust, pricing, procurement, and regulatory pages are reachable from the same public site.</span>
          </div>
        </div>

        <div className="founder-proof-list artifact-proof-panel">
          <p className="kicker">Research references and product routes</p>
          <h3>Research context and product access in one place.</h3>
          <p>Use these links for research context, product access, and citation details.</p>
          <ul className="list-reset">
            {founderAnchors.map((item) => (
              <li key={item.title}>
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {item.title}
                </a>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="about-gep-heading">
      <div className="section-heading">
        <h2 id="about-gep-heading">Leadership representation is backed by public policy and accountability.</h2>
        <p>
          SmartClover is led by a female founder and CEO. The public Gender Equality Plan documents commitments on
          recruitment, leadership, organisational culture, monitoring, training, and measures against gender-based
          violence and sexual harassment.
        </p>
      </div>
      <div className="story-grid">
        <article className="story-card">
          <p className="kicker">Public governance artifact</p>
          <h3>Gender Equality Plan 2026-2028</h3>
          <p>
            The plan is published as a formal document and as a readable public route so partners, funders, and future
            team members can review SmartClover&apos;s equality commitments in the open.
          </p>
        </article>
        <article className="story-card">
          <p className="kicker">Why it matters</p>
          <h3>Leadership identity is supported by process.</h3>
          <p>
            SmartClover links leadership credibility to concrete governance: annual monitoring, inclusive recruitment
            practice, awareness training, and a defined reporting route for misconduct concerns.
          </p>
        </article>
      </div>
      <div className="cta-links">
        <Link href="/gender-equality-plan" className="button secondary">
          Open Gender Equality Plan
        </Link>
        <a
          href="/docs/SmartClover_Gender_Equality_Plan_2026_2028.pdf"
          className="button tertiary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download GEP PDF
        </a>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="about-history-heading">
      <div className="section-heading">
        <h2 id="about-history-heading">From published screening research to a live product</h2>
        <p>
          The main milestones, in order.
        </p>
      </div>
      <div className="timeline-grid">
        {companyTimeline.map((item) => (
          <article key={item.title} className="timeline-card">
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="about-values-heading">
      <div className="section-heading">
        <h2 id="about-values-heading">What we value</h2>
        <p>
          The values below are the ones we actually apply to leadership, products, and deployment.
        </p>
      </div>
      <div className="story-grid">
        {valueCards.map((item) => (
          <article key={item.title} className="story-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="about-principles-heading">
      <div className="section-heading">
        <h2 id="about-principles-heading">Operating principles</h2>
        <p>
          SmartClover states these principles publicly so partners know how we scope and run products.
        </p>
      </div>
      <div className="story-grid">
        {operatingPrinciples.map((item) => (
          <article key={item.title} className="story-card">
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="about-next-step-heading">
      <div className="section-heading">
        <h2 id="about-next-step-heading">Where to go next</h2>
        <p>
          About establishes confidence. CerviGuard, Trust, and Contact turn that confidence into product review,
          trust review, and conversation.
        </p>
      </div>
      <div className="inline-link-row">
        <Link href="/cerviguard" className="button primary">
          Explore CerviGuard
        </Link>
        <Link href="/trust" className="button secondary">
          Open trust center
        </Link>
        <Link href="/contact#inquiry-form" className="button tertiary">
          Start a conversation
        </Link>
      </div>
    </section>
  </>
);

export default About;
