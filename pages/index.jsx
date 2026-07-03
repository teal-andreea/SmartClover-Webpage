import Image from 'next/image';
import Link from 'next/link';
import DiligenceLinksSection from '../components/DiligenceLinksSection';
import PageSeo, { siteUrl } from '../components/PageSeo';

const proofCards = [
  {
    kicker: 'CerviGuard proof',
    title: 'Live workspace, repository, and MDR draft are visible.',
    description:
      'Visitors can review CerviGuard through its live workspace, public repository, screenshots, MDR draft, and trust material.'
  },
  {
    kicker: 'Research context',
    title: 'Cervical-screening research stays source-linked.',
    description:
      'Two PubMed references are linked for visitors who want context on cervical screening participation and follow-up work in Romania.'
  },
  {
    kicker: 'Research track',
    title: 'DataGems sits below the product story.',
    description:
      'DataGems gives research partners a concrete surface for synthetic-data workflow discussions after the CerviGuard path is clear.'
  }
];

const portfolioCards = [
  {
    kicker: 'Flagship product',
    title: 'CerviGuard',
    description:
      'A live product for structured cervical screening workflows, AI-assisted review, and clinician-led follow-up.'
  },
  {
    kicker: 'Live research pilot',
    title: 'DataGems',
    description:
      'A live research pilot for synthetic-data workflows, schema drafting, configured generation jobs, and reviewable exports.'
  },
  {
    kicker: 'Public research directions',
    title: 'Cancer prevention and decision support',
    description:
      'SmartClover publicly discusses cancer prevention, secondary prophylaxis, early detection, and treatment-optimization research as active directions, not as released products.'
  }
];

const timelineCards = [
  {
    kicker: '2017 publication',
    title: 'Screening participation barriers documented',
    description:
      'Social Science & Medicine published field research on Roma women and cervical screening participation in Romania.'
  },
  {
    kicker: '2022 publication',
    title: 'Follow-up barriers researched in remote communities',
    description:
      'BMJ Open published a protocol on facilitators and barriers to follow-up after abnormal cervical screening results in remote Romanian communities.'
  },
  {
    kicker: '2024-2026 product build-out',
    title: 'CerviGuard moved into a live product surface',
    description:
      'The public product surface, repository, and model hub provide a concrete flagship proof layer with supporting artifacts.'
  },
  {
    kicker: 'Current routes',
    title: 'Choose the right conversation',
    description:
      'Contact, pricing, how-to-buy, proof, regulatory, and trust routes help each visitor decide where to start.'
  }
];

const pathCards = [
  {
    title: 'Book demo / Request pilot',
    description: 'For clinics, hospitals, and operators evaluating CerviGuard or a scoped product rollout.',
    href: '/contact#inquiry-form'
  },
  {
    title: 'Research partnership',
    description: 'For institutions exploring prevention, qualitative research, or model-development collaboration.',
    href: '/contact#inquiry-form'
  },
  {
    title: 'Investor inquiry',
    description: 'For investors and accelerators reviewing SmartClover\'s healthcare AI platform and public product evidence.',
    href: '/contact#inquiry-form'
  }
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SmartClover',
  url: siteUrl,
  description:
    'Healthcare AI company building CerviGuard for cervical-screening workflows, with DataGems supporting synthetic-data research.',
  logo: `${siteUrl}/smartclover-logo_v2.png`,
  sameAs: ['https://www.linkedin.com/company/smartclover'],
  founder: {
    '@type': 'Person',
    name: 'Dr. Andreea Damian'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Cernauti 17-21',
    addressLocality: 'Cluj-Napoca',
    addressCountry: 'RO'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${siteUrl}/contact`
    }
  ]
};

const Home = () => (
  <>
    <PageSeo
      title="SmartClover | Healthcare AI With Live Product Proof"
      description="SmartClover builds healthcare AI led by CerviGuard for cervical-screening teams, with DataGems for synthetic-data research."
      path="/"
      image="/images/og/brand-card_v1.png"
      jsonLd={organizationSchema}
    />

    <section className="hero-shell" aria-labelledby="home-hero-title">
      <div className="hero-grid">
        <div className="hero-panel">
          <div className="hero-kicker-row">
            <span className="tagline">Healthcare AI company</span>
            <span className="proof-pill">
              <strong>CerviGuard</strong> live product
            </span>
          </div>

          <div className="hero-copy">
            <h1 id="home-hero-title" className="hero-title">
              Clinician-led AI workflow software for cervical screening.
            </h1>
            <p>
              SmartClover builds healthcare AI where clinical work actually happens. CerviGuard helps
              cervical-screening teams structure intake, review cases with AI support, coordinate triage, and manage
              clinician-led follow-up.
            </p>
          </div>

          <div className="hero-action-row">
            <Link href="/contact#inquiry-form" className="button primary">
              Book demo
            </Link>
            <Link href="/cerviguard" className="button secondary">
              Explore CerviGuard
            </Link>
          </div>
        </div>

        <div className="detail-panel">
          <div className="visual-frame product-visual-frame">
            <Image
              src="/images/cerviguard/cerviguard-login_v3.png"
              alt="CerviGuard sign-in page at cerviguard.link, the entry to the live workspace."
              width={1600}
              height={867}
              priority
              sizes="(max-width: 1080px) 100vw, 42vw"
            />
          </div>
          <div className="visual-caption">
            <strong>CerviGuard workspace proof</strong>
            <span>The live workspace entry at cerviguard.link, captured from the running product.</span>
          </div>
        </div>
      </div>
    </section>

    <section className="surface-card proof-panel" aria-labelledby="home-proof-heading">
      <div className="section-heading">
        <h2 id="home-proof-heading">Product evidence and working routes</h2>
        <p>
          SmartClover links the live CerviGuard workflow to research context, trust material, and direct
          commercial paths for clinics, research partners, and investors.
        </p>
      </div>
      <div className="product-proof-grid">
        <div className="visual-frame product-visual-frame">
          <Image
            src="/images/cerviguard/cerviguard-add-case_v3.png"
            alt="CerviGuard add-case form for uploading a de-identified cervical image with clinical notes."
            width={864}
            height={528}
            sizes="(max-width: 879px) 100vw, 44vw"
          />
        </div>
        <div className="proof-link-grid">
          {proofCards.map((item) => (
            <article key={item.title} className="proof-link-card">
              <p className="kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="inline-link-row">
        <a href="https://cerviguard.link" className="button primary" target="_blank" rel="noopener noreferrer">
          Open live CerviGuard workspace
        </a>
        <Link href="/proof" className="button secondary">
          See product evidence
        </Link>
        <Link href="/trust" className="button tertiary">
          Check trust material
        </Link>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="home-portfolio-heading">
      <div className="section-heading">
        <h2 id="home-portfolio-heading">Research and service tracks around the flagship product</h2>
        <p>
          CerviGuard is the product teams review first. DataGems and the deployment services are the research and
          infrastructure conversations that follow.
        </p>
      </div>
      <div className="story-grid">
        {portfolioCards.map((item) => (
          <article key={item.title} className="story-card">
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="inline-link-row">
        <Link href="/products" className="button secondary">
          View product portfolio
        </Link>
        <Link href="/pricing" className="button tertiary">
          See pricing approach
        </Link>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="home-credibility-heading">
      <div className="founder-grid">
        <div className="story-card">
          <p className="kicker">Founder and research credibility</p>
          <h2 id="home-credibility-heading">SmartClover&apos;s product work starts from cervical-screening research.</h2>
          <p>
            Founder Dr. Andreea Damian leads SmartClover from Cluj-Napoca with CerviGuard as the flagship product.
            The research links below are kept as context for the cervical-screening problem space; current product
            details come from CerviGuard, product, and trust pages.
          </p>
          <div className="key-points">
            <span>PubMed 35197342 covers follow-up barriers after abnormal cervical screening results.</span>
            <span>PubMed 28460211 covers barriers to cervical screening participation in Romania.</span>
            <span>CerviGuard, GitHub, Hugging Face, and trust routes are available before outreach.</span>
          </div>
          <div className="inline-link-row">
            <a href="https://pubmed.ncbi.nlm.nih.gov/35197342/" target="_blank" rel="noopener noreferrer" className="button secondary">
              Open 2022 PubMed record
            </a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/28460211/" target="_blank" rel="noopener noreferrer" className="button tertiary">
              Open 2017 PubMed record
            </a>
          </div>
        </div>

        <div className="detail-panel artifact-proof-panel">
          <p className="kicker">Source-linked materials</p>
          <h3>Source-linked proof visitors can inspect before outreach.</h3>
          <div className="artifact-card-list">
            <a href="https://pubmed.ncbi.nlm.nih.gov/35197342/" target="_blank" rel="noopener noreferrer">
              <strong>2022 PubMed record</strong>
              <span>Follow-up barriers after abnormal cervical screening results.</span>
            </a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/28460211/" target="_blank" rel="noopener noreferrer">
              <strong>2017 PubMed record</strong>
              <span>Barriers to cervical screening participation in Romania.</span>
            </a>
            <a href="https://github.com/SmartCloverAI/CerviGuard" target="_blank" rel="noopener noreferrer">
              <strong>CerviGuard repository</strong>
              <span>Public implementation context for the flagship workflow product.</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="surface-card" aria-labelledby="home-timeline-heading">
      <div className="section-heading">
        <h2 id="home-timeline-heading">Public timeline: from screening research to a live product</h2>
        <p>These milestones connect the published screening research, the CerviGuard build, and how SmartClover works today.</p>
      </div>
      <div className="timeline-grid">
        {timelineCards.map((item) => (
          <article key={item.title} className="timeline-card">
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="surface-card" aria-labelledby="home-paths-heading">
      <div className="section-heading">
        <h2 id="home-paths-heading">Clear next steps for buyers, partners, and investors</h2>
        <p>The site keeps one primary CTA while making audience-specific entry points clear for buyers, partners, and investors.</p>
      </div>
      <div className="path-grid">
        {pathCards.map((item) => (
          <article key={item.title} className="path-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link href={item.href} className="button tertiary">
              Go to contact hub
            </Link>
          </article>
        ))}
      </div>
    </section>

    <DiligenceLinksSection
      headingId="home-diligence-links"
      heading="Trust, proof, and buying routes"
      description="Everything a buyer, partner, or investor needs to vet SmartClover before reaching out."
    />
  </>
);

export default Home;
