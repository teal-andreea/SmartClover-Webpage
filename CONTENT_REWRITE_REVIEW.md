# SmartClover Content Rewrite Review

Prepared: 2026-05-11

## Surgical Target List

Batch: Introspection and reader-value sweep

| File | Existing fragment | Failure class | Replacement intent | Verification |
| --- | --- | --- | --- | --- |
| `pages/about.jsx` | `CerviGuard is the live product at the center of the company story.` | Introspective status narration | Explain CerviGuard as the flagship workflow product for cervical-screening teams | Tone test blocks `center of the company story`; online `/about` scan passes |
| `pages/about.jsx` | `DataGems remains a live research pilot, not the main commercial product.` | Introspective status narration | Explain DataGems as the synthetic-data research workflow surface | Tone test blocks `not the main commercial product`; online `/about` scan passes |
| `pages/products.jsx` | `It is not presented as the main commercial product.` | Internal positioning disclaimer | Explain DataGems reader value while keeping CerviGuard first | Tone test blocks `not presented as the main commercial product`; online `/products` scan passes |
| `pages/index.jsx` | `flagship live product publicly visible through CerviGuard.` | Proof-as-copy / introspective evidence wording | State how a visitor can review CerviGuard through live workspace, repository, and trust material | Tone test blocks `publicly visible through`; online `/` scan passes |
| `pages/index.jsx` | `live research pilot publicly visible through DataGems.` | Proof-as-copy / introspective evidence wording | State what DataGems gives research/data partners to discuss or review | Tone test blocks `publicly visible through`; online `/` scan passes |
| `pages/index.jsx` | `Current company posture` | Internal positioning label | Frame the timeline step as reader routing and conversation choice | Tone test blocks `current company posture`; online `/` scan passes |

## Batch Review: Introspection And Reader-Value Sweep

Files reviewed:
- `pages/index.jsx`
- `pages/about.jsx`
- `pages/products.jsx`
- `tests/public-copy-tone.test.mjs`

First-principles findings:
- The failing fragments do not help the reader decide what to do; they describe company status or perception.
- Replacement copy must answer what CerviGuard and DataGems help readers review, test, or discuss.

Evidence findings:
- CerviGuard public workspace, repository references, screenshots, and trust routes are already present in public source.
- DataGems screenshots and repository/product links are already present on the products page.

Redaction findings:
- No earlier publication-name or named-coauthor text is needed for these replacements.

S-WRITER findings:
- Replace passive/evaluator phrases with direct product and workflow language using `our` where it improves accountability.

VC-EXPERT findings:
- Keep CerviGuard clearly first. DataGems should be framed as useful research infrastructure without pretending to be the commercial lead.

CQ-VERIFIER findings:
- Add regression tests for introspective wording before rewriting the fragments.

CONTENT-VALIDATOR findings:
- Run source scans and local test/build commands before commit. After push, verify online HTML for the same banned phrases.

Client/buyer findings:
- Clinics should see what CerviGuard helps them operate.
- Research partners should see what DataGems helps them test.
- Investors should see product hierarchy without analyst-style self-description.

Required changes before publish:
- Add the introspection banned phrases to `tests/public-copy-tone.test.mjs`.
- Replace only the target fragments listed above.

Residual risks:
- Broader blog and visual work remain separate batches.

## Online Verification Finding: Footer Reader-Value Follow-Up

Observed after deploying version `3.18`:

| File | Existing fragment | Failure class | Replacement intent | Verification |
| --- | --- | --- | --- | --- |
| `components/Layout.jsx` | `DataGems remains the live research pilot.` | Status-management copy using the same `remains` pattern | Explain DataGems as supporting synthetic-data research workflows | Tone test blocks `remains the live research pilot`; online footer scan passes |

Required follow-up:
- Replace the footer sentence with reader-value copy.
- Increment `version.json` again because the issue was found after online verification.
- Commit, push, wait for deployment, and re-run online checks.

## Follow-Up Sweep: Nearby Status Wording

Observed after version `3.19` online checks:

| File | Existing fragment | Failure class | Replacement intent | Verification |
| --- | --- | --- | --- | --- |
| `pages/index.jsx` | `CerviGuard remains the primary commercial product` | Internal product-status narration | Explain that CerviGuard is the product readers review first | Tone test blocks `remains the primary commercial product`; online `/` scan passes |
| `pages/products.jsx` | `DataGems operating as a live research pilot` | Status-management copy | Explain that DataGems supports synthetic-data research workflows | Tone test blocks `operating as a live research pilot`; online `/products` scan passes |
| `pages/about.jsx` | `DataGems as a live research pilot` in SEO description | Status-management metadata | Align metadata with reader-value DataGems language | Online `/about` metadata scan passes |

## Surgical Target List: DataGems Blog Publication

| File | Existing fragment | Failure class | Replacement intent | Verification |
| --- | --- | --- | --- | --- |
| `tasks/drafts/datagems_blog.md` | `not our flagship clinical product`, `CerviGuard remains the flagship product`, `belongs beside CerviGuard`, `not in front of it` | Internal portfolio-status narration | Publish only reader-value language about schema-first synthetic-data workflows | Tone test blocks rejected fragments; online blog scan passes |
| `tasks/drafts/datagems_blog.md` | `approved peers` | Overstated governance wording | Use `configured peers`, matching the current peer configuration evidence | Tone test blocks `approved peers`; online blog scan passes |
| `tasks/drafts/datagems_blog.md` and `pages/products.jsx` | `SLM-first generation` | Strategy claim not evidenced by the reviewed source files | Use current evidence for internal inference path and saved external inference profiles | Tone test blocks `SLM-first generation`; source scan passes |
| `tasks/drafts/datagems_blog.md` | `governed synthetic-data workflows` / `governed experimentation` | Compliance-adjacent wording without formal governance evidence | Use controlled/reviewable workflow language and a bounded research-pilot CTA | Tone test blocks rejected phrases; online blog scan passes |
| `posts/datagems-synthetic-data-workflows.md` | New public article | Publication candidate | Publish the approved article body only, without proposal notes, claim maps, or reviewer questions | Blog builds and live URL returns positive workflow matches |

## Batch Review: DataGems Blog Draft

Files reviewed:
- `tasks/drafts/datagems_blog.md`
- `DataGems/README.md`
- `DataGems/app/(app)/page.tsx`
- `DataGems/components/TasksPanel.tsx`
- `DataGems/app/api/tasks/schema/route.ts`
- `DataGems/app/api/tasks/confirm/route.ts`
- `DataGems/lib/datagen/jobWorker.ts`
- `DataGems/lib/datagen/exporters.ts`
- `DataGems/app/api/tasks/[id]/export/route.ts`

First-principles findings:
- The reader problem is not "where DataGems sits in SmartClover's portfolio"; it is how a healthcare AI or research team can rehearse schemas, generation jobs, review, and exports before sensitive data is appropriate.
- The article must explain the workflow and limits before discussing broader health-data policy.

Evidence findings:
- The DataGems application supports authenticated job creation, schema drafting, confirmation, configured peer execution, progress metrics, and JSON/CSV export.
- Source evidence supports an internal inference path and optional saved external inference profiles, but does not support `SLM-first` strategy claims, compliance, clinical validation, anonymization, adoption, or customer traction claims.
- NIST SP 800-226, EHDS, and EU AI Act references support cautious language around privacy, data reuse, risk management, data quality, and human oversight.

Redaction findings:
- No earlier publication-name, named-coauthor, founder-history, or credibility-theater content is needed for this blog post.
- Provider-specific infrastructure names are unnecessary for the public article and should remain absent.

S-WRITER findings:
- Remove draft phrases that sound like internal positioning: `not our flagship clinical product`, `CerviGuard remains the flagship product`, `belongs beside CerviGuard`, and `not in front of it`.
- Keep the article in SmartClover's voice: concrete, direct, research-partner-oriented, and bounded.
- Replace `approved peers` with `configured peers`, and replace `SLM-first generation` with current evidence for internal inference plus saved external inference profiles.

VC-EXPERT findings:
- DataGems is commercially understandable as a research and data-workflow wedge if the article makes the problem concrete: schema discipline, integration rehearsal, traceable generation, review, and export.
- The post should avoid suggesting DataGems is the lead product or a regulated clinical system.
- Roadmap items such as dataset documentation, utility checks, privacy-risk review, and reviewer sign-off must be framed as next direction, not current shipped capability.

CQ-VERIFIER findings:
- The draft's strongest paragraphs are workflow-oriented. The weakest paragraphs manage internal product hierarchy and should not be published.
- The final article should include explicit healthcare boundaries without letting disclaimers dominate the post.

CONTENT-VALIDATOR findings:
- Add tests for rejected draft language before publishing.
- Verify local rendering through the existing Markdown blog pipeline, then verify the online URL after deployment.

Client/buyer findings:
- Research partners need to see the work they can discuss now: schema planning, generation-job design, progress review, export, and documentation of limits.
- Investors should see a focused research workflow surface, not portfolio-status narration.

Required changes before publish:
- Create `posts/datagems-synthetic-data-workflows.md` with only the approved article body.
- Extend `tests/public-copy-tone.test.mjs` to block rejected draft phrases and require DataGems workflow language.
- Increment `version.json`, append `CHANGE_LOG.md`, commit, push, wait for the online version, and scan the live blog page.

Residual risks:
- Visual support for the article is still a separate NapkinAI batch.
- Existing blog posts still need the separate keep/rewrite/remove review in Task 6B.

## Blog Editorial Target List

| Post | Current role | Target reader | Keep/rewrite/remove | Failure class | Replacement intent | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| `posts/cerviguard-remote-screening-foundations.md` | CerviGuard field/research context | Clinical and research readers | Keep, light rewrite | Slight overstatement around impact and missing recency note | Keep field-research grounding while avoiding outcome implication and adding review date | Tone tests and source scan pass |
| `posts/cybersecurity-healthcare-ledger.md` | Cybersecurity and resilience context | Healthcare IT/security readers | Rewrite targeted paragraphs | HTML-break formatting, broad security phrasing, and service-scope ambiguity | Present healthcare cybersecurity/resilience as scoped service work with authorized personnel, partner products, agentic engineering, and architecture boundaries | Tone tests and source scan pass |
| `posts/healthcare-ai-research.md` | Healthcare AI research context | Research partners | Rewrite | Unsupported current-work claims about training, community records, knowledge graphs, and answer-level traceability | Reframe as research principle: reviewable evidence, source-linked hypotheses, CerviGuard workflow design, and DataGems research preparation | Tone tests block old unsupported fragments |
| `posts/on-prem-ledger-ci-cd.md` | Cloud-on-edge deployment context | IT/security and technical buyers | Rewrite targeted paragraphs | HTML-break formatting and potentially broad deployment/compliance language | Preserve permissioned cloud-on-edge, encryption, reduced centralization, immutable anchoring, and traceable records with contract/environment scoping | Tone tests and source scan pass |

## Batch Review: Existing Blog Posts

Files reviewed:
- `posts/cerviguard-remote-screening-foundations.md`
- `posts/cybersecurity-healthcare-ledger.md`
- `posts/healthcare-ai-research.md`
- `posts/on-prem-ledger-ci-cd.md`

First-principles findings:
- Each post should answer a practical reader question: how CerviGuard uses field lessons, how healthcare AI security work is scoped, how permissioned deployment boundaries work, or how research ideas stay tied to evidence.
- Blog copy should not claim current model training, answer traceability, compliance readiness, or operational outcomes without a source.

Evidence findings:
- PubMed and BMJ Open links support cervical-screening and follow-up context.
- User-confirmed architecture supports permissioned cloud-on-edge, end-to-end encrypted sensitive flows, reduced centralization, immutable anchoring, and traceable deployment records when scoped to the approved deployment model.
- User-confirmed cybersecurity/resilience services may reference authorized/certified personnel, partner security products, and agentic engineering workflows when scoped.

Evidence map for this batch:

| Claim area | Evidence / approval source | Allowed public wording | Boundary |
| --- | --- | --- | --- |
| Cervical-screening research context | PubMed 28460211 and PubMed 35197342 | Research informs screening and follow-up workflow questions | Do not claim product performance or clinical outcomes |
| CerviGuard workflow | Public CerviGuard route, product screenshots, and existing SmartClover product pages | Structured intake, AI-assisted review, triage coordination, clinician-led follow-up | Avoid diagnosis, treatment, approval, or outcome claims |
| Cloud-on-edge platform capability | User-confirmed corrected finding in `CONTENT_FIX_PLAN.md`; current `/cloud-architecture`, `/decentralized`, and `/research` pages | Permissioned cloud-on-edge deployment patterns, edge/on-prem execution, cloud coordination, traceable records | Provider-neutral; contract/environment scoped |
| Encryption / non-centralization / immutable anchoring | User-confirmed architecture finding in `CONTENT_FIX_PLAN.md`; current `/cloud-architecture` and `/trust/security` pages | Sensitive flows can be end-to-end encrypted; clinical payload data is not centralized by default; immutable anchoring can support deployment evidence | Do not imply universal compliance, breach prevention, or all-deployment guarantees |
| Cybersecurity/resilience R&D model | User-confirmed corrected finding in `CONTENT_FIX_PLAN.md`; current `/cybersecurity` and `/research` pages | Programmes can include authorized/certified personnel, partner security products, and agentic engineering workflows | Do not claim SmartClover itself is certified unless exact certification evidence is approved |

Redaction findings:
- No post should reintroduce earlier publication-name continuity, named-coauthor credibility copy, or provider-specific cloud-on-edge naming.

S-WRITER findings:
- Replace AI-explainer prose and unsupported "we train" claims with operator language about reviewable evidence and bounded workflows.
- Remove `</br></br>` paragraph formatting from edited posts.
- After review, replace remaining outcome-adjacent CerviGuard phrasing and internal lines such as `DataGems belongs in the research track` and `This deployment model aligns with our operating principle`.

VC-EXPERT findings:
- Unsupported data/model claims in `healthcare-ai-research.md` create investor and buyer risk because they imply proprietary data access and system capability that the current evidence register does not establish.
- Security and deployment posts should keep true differentiators but avoid universal compliance, breach-prevention, or autonomous-security implications.
- Add internal links so buyer readers can move from editorial posts to the relevant product, trust, cybersecurity, and cloud-architecture pages.

CQ-VERIFIER findings:
- Add a `Last reviewed: 2026-05-11.` note to posts with healthcare, AI, security, or regulatory context.
- Add positive assertions for revised blog purpose and negative assertions for old unsupported fragments.

CONTENT-VALIDATOR findings:
- Run the same local gate and online verification loop as the DataGems batch, with a new version number and a separate commit.

Client/buyer findings:
- Research partners need practical evidence discipline.
- Clinical readers need product boundaries.
- IT/security readers need deployment scope and responsibility boundaries.

Required changes before publish:
- Rewrite only the target posts listed above.
- Extend blog tests for rejected unsupported research claims and required scoped service language.
- Add evidence mapping for cloud-on-edge, encryption, non-centralization, immutable anchoring, traceable records, authorized/certified personnel, partner products, and agentic engineering scope.
- Increment `version.json`, append `CHANGE_LOG.md`, commit, push, wait for online update, and verify changed blog URLs.

Residual risks:
- NapkinAI blog visuals are still planned separately; no generated visuals are included in this text-only blog batch.

## Visual Target List: NapkinAI First Placement Batch

| Placement | Selected asset | Rejected candidate issues | Public boundary |
| --- | --- | --- | --- |
| `posts/datagems-synthetic-data-workflows.md` | `public/images/blog/datagems-workflow-napkin_v1.0.png` | Some candidates added noisy branch labels, excessive whitespace, or small text. | Workflow, review, configured peer execution, and JSON/CSV export only; no privacy, anonymization, clinical-validation, or medical-device claims. |
| `posts/cerviguard-remote-screening-foundations.md` | `public/images/blog/cerviguard-workflow-napkin_v1.0.png` | Some candidates used over-specific AI-analysis wording or rendered as a too-wide strip. | Structured intake, AI-assisted review, clinician review, triage coordination, clinician-led follow-up; no autonomous diagnosis or outcome claim. |
| `pages/cloud-architecture.jsx` | `public/images/architecture/cloud-on-edge-boundaries-napkin_v1.0.png` | First candidates had a title typo, generic business-framework drift, or awkward composition. | Provider-neutral permissioned cloud-on-edge boundaries; no provider name, universal compliance, breach-prevention, or guaranteed outcome. |
| `pages/cybersecurity.jsx` | `public/images/architecture/healthcare-cyber-resilience-loop-napkin_v1.0.png` | Some candidates were too wide or used generic third-party/security wording. | Authorized/certified personnel, partner security products, agentic engineering support, remediation, evidence review, and human oversight. |

## Batch Review: NapkinAI Visuals

Files reviewed:
- `posts/datagems-synthetic-data-workflows.md`
- `posts/cerviguard-remote-screening-foundations.md`
- `pages/cloud-architecture.jsx`
- `pages/cybersecurity.jsx`
- `styles/globals.css`
- `public/images/blog/`
- `public/images/architecture/`

First-principles findings:
- A public visual should reduce buyer comprehension time. It should make the workflow or service boundary easier to see, not add new claims.
- Visual text must be held to the same anti-slop standard as page copy: no filler labels, no self-assessment language, no hidden compliance promises.

Evidence findings:
- DataGems source evidence supports schema drafting, review, confirmed generation, configured peer execution, job-status review, and JSON/CSV export.
- CerviGuard public copy supports structured intake, AI-assisted review, clinician review, triage coordination, and clinician-led follow-up.
- User-confirmed architecture supports provider-neutral permissioned cloud-on-edge services, immutable anchoring, traceable deployment records, end-to-end encrypted sensitive flows, and limited centralization when scoped to the deployment model.
- User-confirmed cybersecurity scope supports authorized/certified personnel, partner security products, and agentic engineering workflows under human oversight.

S-WRITER findings:
- The figures should use direct workflow nouns rather than analyst labels such as `public profile`, `company story`, or `main commercial product`.
- Captions should explain reader value in one sentence and avoid describing the graphic as AI-generated content.

VC-EXPERT findings:
- The visual set strengthens investor and buyer comprehension by showing four practical operating surfaces: clinical workflow, research workflow, deployment boundaries, and security/resilience service loop.
- The cloud and cybersecurity visuals should remain service capability visuals, not proof of universal compliance or breach prevention.

CQ-VERIFIER findings:
- All selected images are first-party hosted PNGs under `public/images/...`.
- The test suite now blocks public-source exposure of transient NapkinAI API/download references.

CONTENT-VALIDATOR findings:
- Local tests must verify asset paths and captions before commit.
- After push, online verification must confirm version `3.23`, route rendering, local image URLs, and absence of generated-download URLs in page HTML.

Required changes before publish:
- Add four locally hosted visual assets.
- Add markdown image references to the two blog posts.
- Add `next/image` figures and scoped captions to the cloud architecture and cybersecurity pages.
- Extend tests for local visual assets and no exposed NapkinAI transient URLs.
- Increment `version.json`, append `CHANGE_LOG.md`, commit, push, wait for online update, and verify changed routes.

Residual risks:
- The generated visuals are useful but visually conservative and blue-heavy. A later brand-design pass could commission custom brand-native diagrams if SmartClover wants a more distinctive visual system.

## Batch Review: Machine-Readable Status Cleanup

Files reviewed:
- `lib/`
- `pages/api/`
- `public/.well-known/api-catalog`
- `public/openapi.json`
- `tests/public-copy-tone.test.mjs`

First-principles findings:
- Machine-readable public artifacts should help automated consumers understand the current public interface. They should not carry stale examples or marketing copy.

Evidence findings:
- The current public API surface is limited to status, host identifier, and contact intake endpoints.
- The site repo does not currently expose `llms.txt`, `llms-full.txt`, MCP resource endpoints, or public agent-skill artifacts.

Redaction findings:
- No sensitive publication-name continuity, named-coauthor credibility copy, or earlier redacted public-profile language was present in the machine-readable files reviewed.

S-WRITER findings:
- No human-facing rewrite was needed. The only stale wording was a version example, not a public marketing paragraph.

VC-EXPERT findings:
- A stale status-version example is low severity, but keeping public API docs aligned reduces avoidable diligence friction for technical reviewers.

CQ-VERIFIER findings:
- `public/openapi.json` had `StatusResponse.version.example` set to an old value. This is now tested against `version.json`.

CONTENT-VALIDATOR findings:
- Local tests block future drift between `version.json` and the OpenAPI status response example.
- Online verification confirmed `/api/status` and `/openapi.json` agree after deployment.

Client/buyer findings:
- Procurement, IT, and technical reviewers should see a consistent public site version across status and API documentation.

Required changes before publish:
- Update `public/openapi.json` status version example.
- Add a regression test requiring it to match `version.json`.
- Increment `version.json`, append `CHANGE_LOG.md`, commit, push, wait for online deployment, and verify `/api/status` plus `/openapi.json`.

Residual risks:
- If `llms.txt`, MCP resources, or public agent-skill artifacts are introduced later, Task 7 must be rerun because those surfaces do not exist in the current site repo.

## Closure Note

Current status after the website-content batches:
- Service-capability, introspection, DataGems blog, existing blog, NapkinAI visuals, and machine-readable status cleanup batches have been executed and deployed.
- Final verified public site version for this content-fix execution is recorded in `version.json` and `/api/status`.
- The plan remains active for public PDF/deck review and replacement work governed by `PITCH_PLAN.md` and `SmartClover_PitchDeck/`.
- The first NapkinAI visuals are acceptable and locally hosted, but a later custom visual-design pass can improve brand distinction and mobile label readability.
