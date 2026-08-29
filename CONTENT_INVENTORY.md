# SmartClover Content Inventory

Prepared: 2026-05-11

## Human-Facing Routes

| Route | Source File | Primary Audience | Primary Job | Rewrite Priority |
| --- | --- | --- | --- | --- |
| `/` | `pages/index.jsx` | clinics, researchers, investors, procurement reviewers | Explain SmartClover, CerviGuard, DataGems, trust routes, and next action | High |
| `/about` | `pages/about.jsx` | partners, investors, clinics, public reviewers | Explain leadership, domain focus, research context, and company principles | High |
| `/cerviguard` | `pages/cerviguard.jsx` | cervical-screening teams, clinical/programme leads | Explain the flagship workflow product and evidence boundaries | High |
| `/products` | `pages/products.jsx` | buyers, research partners, investors | Present CerviGuard first, DataGems as a live product, and platform capabilities clearly | High |
| `/research` | `pages/research.jsx` | healthcare operators, research partners, IT/security teams, procurement | Explain applied research, product-development programmes, cloud-on-edge infrastructure, and cybersecurity/resilience R&D | High |
| `/cloud-architecture` | `pages/cloud-architecture.jsx` | healthcare IT/security leads | Explain permissioned cloud-on-edge deployment boundaries and records | High |
| `/cybersecurity` | `pages/cybersecurity.jsx` | healthcare IT/security leads | Explain cybersecurity/resilience services with scoped claims | High |
| `/decentralized` | `pages/decentralized.jsx` | technical buyers | Explain provider-neutral cloud-on-edge execution and traceability | Medium |
| `/trust` and `/trust/*` | `pages/trust/*.jsx` | security, legal, procurement | Provide privacy, security, data-processing, incident-response, and terms context | High |
| `/proof` | `pages/proof.jsx` | investors, buyers, reviewers | Separate verified evidence, qualified evidence, gaps, and pending metrics | High |
| `/regulatory` | `pages/regulatory.jsx` | regulatory, clinical, procurement | Preserve draft status and avoid approval/certification overclaims | High |
| `/pricing` | `pages/pricing.jsx` | procurement, buyers | Explain RFQ scope and commercial next steps | Medium |
| `/how-to-buy` | `pages/how-to-buy.jsx` | procurement, buyers | Explain qualification and activation process | Medium |
| `/contact` | `pages/contact.jsx` | all inbound readers | Route demo, research, investor, and general inquiries | Medium |
| `/values` | `pages/values.jsx` | partners, candidates, reviewers | Explain company values without slogan stack | Medium |
| `/blog` and `/blog/[slug]` | `pages/blog/*.jsx` | clinical, research, security, and technical readers | Render editorial material cleanly and safely | High |

## Blog And Editorial

| Post | Source File | Current Role | Rewrite Priority |
| --- | --- | --- | --- |
| CerviGuard field screening | `posts/cerviguard-remote-screening-foundations.md` | CerviGuard workflow and research context | High |
| Healthcare cybersecurity | `posts/cybersecurity-healthcare-ledger.md` | Healthcare cybersecurity/resilience context | High |
| Healthcare AI research | `posts/healthcare-ai-research.md` | Research positioning and source-backed context | High |
| Cloud-on-edge deployment | `posts/on-prem-ledger-ci-cd.md` | Permissioned cloud-on-edge deployment explanation | High |
| DataGems synthetic-data workflow | `posts/datagems-synthetic-data-workflows.md` | Planned DataGems research article | High when created |

## Metadata And Machine-Readable Surfaces

| Surface | Source File | Downstream Consumer | Rewrite Priority |
| --- | --- | --- | --- |
| Page SEO and JSON-LD | `pages/*.jsx`, `components/PageSeo.jsx` | search, social previews, structured-data consumers | High |
| API status docs | `pages/docs/api.jsx`, `public/openapi.json`, `public/.well-known/api-catalog` | technical reviewers and API clients | Medium |
| Blog markdown rendering | `lib/posts.js`, `pages/blog/[slug].jsx` | public article readers | Medium |
| Layout/footer/navigation | `components/Layout.jsx` | all public readers | High |

## Public Documents

| Artifact | Source File | Risk | Action |
| --- | --- | --- | --- |
| Old public one-page pitch deck | `public/docs/SmartClover_1pagepitchdeck.pdf` | May conflict with current positioning | Replace through `PITCH_PLAN.md` |
| Draft MDR self-assessment | `public/docs/CerviGuard_MDR_Class_I_Self_Assessment_Draft.pdf` | Draft status must remain clear | Keep qualified and date-aware |
| Gender Equality Plan PDF | `public/docs/SmartClover_Gender_Equality_Plan_2026_2028.pdf` | Governance artifact, low copy-risk | Keep aligned with `/gender-equality-plan` |
| Citations file | `public/docs/smartclover-cerviguard-citations.bib` | Research/source continuity | Keep citation-only, not persuasion copy |
