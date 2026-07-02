# SmartClover Change Log

### [2026-07-02 22:51 UTC] TYPE: change
- Author: Claude (Fable 5) + review council (codex xhigh, fable visual, opus S-WRITER, opus VC-EXPERT) over two review-spec-refine-test cycles
- Summary: Prepared release `3.43` removing the remaining AI-slop and repeated imagery, rebuilding all workflow diagrams as one rendered family, recropping authentic product captures, de-slopping page copy, and tightening the visual system, per the operator's "review-spec-refine-test until ultra-verified" directive.
- Evidence:
  - Deleted generative/decorative assets after replacing every reference: `partnership-handshake.png`, `governance-network.png`, `research-lab.png`, `analytics-dashboard.png` (fake dashboard with garbled text), `eq-learning-tablet.png`, stale `datagems-screen-*` captures, empty-padded `cerviguard-dashboard.png`/`cerviguard-add-case.png`, all four spiral/temple `*napkin_v1.0.png` diagrams, and `smartclover_logo.jpg` (re-exported as tight `smartclover-logo_v2.png`).
  - New `scripts/render-diagrams.mjs` (Playwright + site Google Fonts, 2x) renders the "SmartClover schematic" family: cerviguard-workflow-flow, datagems-workflow-flow, healthcare-cyber-resilience-loop, cloud-on-edge-boundary, rollout-onboarding-flow, research-evidence-flow (all `_v2`), plus `og/brand-card_v1.png` used as the default social image; label slop from the old spirals ("Feedback Arrow to Workflow Improvement", "Use Agentic Engineering") eliminated.
  - Authentic captures recropped to versioned files: `cerviguard-dashboard-stats_v2.png` (dead padding removed), `cerviguard-add-case_v2.png` (clipped edge cleaned), `datagems-job-form_v2.png`/`datagems-dashboard_v2.png` (browser chrome cropped), and a fresh public capture of the live product entry `cerviguard-login_v3.png` (cerviguard.link) now leading the homepage hero.
  - Blog: every post has a distinct on-family hero (was: cerviguard-dashboard fallback + three identical spirals in one row); default hero/OG fallbacks now the brand card.
  - Copy: ~30 adjudicated S-WRITER fixes (four-verb pitch macro de-duplicated, "productization"/"digital-native" buzz clusters removed, inaccurate alt text corrected, mislinked CTA fixed, "Live research track" aligned to locked "Live research pilot", consent banner explanation added); proof/trust/regulatory pages lead with "What you can verify today" tiles; wording harmonized to "live workspace" + "public-safe sample data".
  - CSS: refactor.css teals consolidated to accent `#0f788d` family; utility-page h1 and footer descaled (footer is a sitemap, not a second hero); large radii normalized to 24px; blog media letterboxes white; diagrams never cover-cropped (`img[src*='diagrams']` contain rule — note: next/image URL-encodes src, so `/diagrams/` selectors never match); stats strip letterboxes on a tinted mat; article summary spans the column when no TOC.
  - `scripts/optimize-images.mjs` now excludes the operator-locked NIS2COMPASS article assets from re-encoding.
  - Verification: 32 tests pass (napkin test rewritten to the diagram family), lint clean, build green, Playwright overflow sweep ALL-CLEAR at 1440/390 across 14 routes, two council verification passes (codex xhigh, fable) converged to SHIP after two fix rounds; full-page capture tooling now scrolls first so lazy-loaded figures paint (prior "blank diagram" findings were capture artifacts).
- Impact: The public site no longer contains fabricated UI or generative decorative art; every visible diagram is a locally rendered, reproducible asset in one visual language; product proof imagery is authentic, current, and de-duplicated; social previews are route-appropriate.
- Follow-up: Operator-gated items — supply a real founder photo for About (none exists in the repos; page currently states credibility in text only); decide on re-rendering the two locked NIS2COMPASS article figures into the v2 family (current pair is off-system, "imagegen" filenames visible in URLs, hero label/line collision); /values needs operator content to fill its three sparse cards; fresh authenticated CerviGuard/DataGems interior captures need credentials (live DataGems is v1.1.3 vs captured v1.0.2). Cloudflare cache rule for `/_next/image*` remains pending from v3.42.

### [2026-07-02 22:51 UTC] ADVERSARIAL-CHECK
- Scope: Site-wide imagery replacement, diagram system, copy de-slop, CSS refinement (release 3.43).
- BUILDER Intent + Change:
  - Remove everything that reads as AI-generated or repeated, replace with authentic captures and one rendered diagram family, de-slop copy, and refine CSS — without touching locked NIS2COMPASS content, locked product-status language, or tone-test-required strings.
- CRITIC Findings:
  - Codex xhigh verify: og repetition across product routes; "pilot/demo workspace" wording tension with locked "live product" status; two "blank diagram" screenshots.
  - Fable verify: products workflow card cover-cropped mid-label (root cause: `[src*='/diagrams/']` never matches next/image's URL-encoded src); stats strip read as empty panel on white; login hero carried sliced debug chips; diagram canvases held dead space; og mark sat on off-white patch; article summary rendered as 260px sliver.
  - Optimizer re-encoded locked NIS2COMPASS images when run.
- BUILDER Response / Refinements:
  - Selector fixed to `[src*='diagrams']`; strip slots given tinted mats; login recaptured region recropped and version-bumped to `_v3` (in-place overwrite of versioned assets goes stale behind 30-day caches); canvases tightened and re-rendered; og mark brightness-corrected; `.article-sidebar` width cap scoped to TOC mode; cerviguard og varied to the login capture; wording harmonized ("live workspace", "public-safe sample data") while keeping honest demo-data disclaimers; optimizer given a locked-asset exclusion list and locked files restored from git; "blank diagram" findings reproduced as lazy-load capture artifacts (images report complete:true after scroll) and the capture harness now scrolls before shooting.
- Verification:
  - `node --test tests/*.mjs` -> pass (32/32, includes rewritten diagram-family test)
  - `npm run lint` -> pass
  - `npm run build` -> pass
  - Playwright overflow sweep 14 routes x 1440/390 -> ALL-CLEAR
  - Fable re-verify of both residuals on final captures -> FIXED; council verdict SHIP
- Residual Risk: Locked NIS2COMPASS figures remain visually off-system until the operator approves a re-render; /values remains content-thin; founder photo absent; DataGems captures show v1.0.2 vs live v1.1.3.

### [2026-07-02 15:33 UTC] TYPE: change
- Author: Claude (Fable 5) + fable/opus/codex analysis council
- Summary: Prepared release version `3.42` fixing the desktop image-frame overflow ("images not centered") and the slow image loading reported on `smartclover.ro`.
- Evidence: `styles/refactor.css`, `next.config.js`, `package.json`, `scripts/optimize-images.mjs`, `public/` (19 PNGs recompressed in place, 3 unused assets removed), `pages/cerviguard.jsx`, `pages/products.jsx`, `pages/cybersecurity.jsx`, `pages/cloud-architecture.jsx`, `tests/blog-editorial.test.mjs`, `version.json`, `public/openapi.json`.
- Root causes fixed:
  - `.product-proof-grid` used `align-items: stretch` while `.product-visual-frame` carries `aspect-ratio: 16/9`; the stretched row height transferred through the aspect ratio into a ~1270px frame inside a ~1127px container, overflowing into the neighbouring column on `/`, `/proof`, and `/products` (desktop only). Now `align-items: center`. The same transfer bug made `.blog-featured-media` bleed under the featured-post text (fixed with `width: 100%`), and the hero visual now fills its stretched panel instead of leaving dead space.
  - Image transforms ran on the squoosh WASM fallback because `sharp` was not installed: measured 0.6-7s per cold `/_next/image` transform on the live site (8.9s total load on `/blog`). With `sharp` installed, cold transforms measure 50-140ms locally, warm ~4ms.
  - `/_next/image` responses carried `Cache-Control: max-age=60` (Next default `minimumCacheTTL`), so browsers revalidated constantly and Cloudflare never edge-cached; now `minimumCacheTTL: 2678400` (31d) plus 30-day `Cache-Control` headers for `/images/*`, `/blog/images/*`, `/favicon.png`, and `/smartclover_logo.jpg`.
  - Source PNGs were oversized (public/ 9.7MB -> 3.1MB): napkin diagrams downscaled 3200px -> 1600px and palette-quantized (e.g. 734KB -> 105KB), marketing images quantized in place, favicon 153KB -> 11KB at 192px, three unreferenced images removed; `scripts/optimize-images.mjs` added for future assets. Declared `width`/`height` props updated to the new intrinsic dimensions (also fixing a pre-existing 1600x900-vs-3196x2764 ratio mismatch on the CerviGuard workflow diagram).
- Verification: `npm test` -> pass 32/32 (two hardcoded hero-dimension assertions updated to the new intrinsic sizes); `npm run lint` -> pass; `npm run build` -> pass; Playwright geometry sweep over `/`, `/blog`, `/products`, `/proof`, `/cerviguard`, `/services`, `/cloud-architecture` at 1440px and 390px -> zero frame overflows, CLS unchanged or improved; recompressed gradient imagery visually inspected for banding; local `next start` header checks confirm the new Cache-Control values and that sharp is active (no squoosh warning).
- Impact: Desktop pages no longer overlap image frames into text columns, first-view image latency drops from seconds to ~100ms per image, and repeat visits/browser caches now hold images for 30+ days.
- Follow-up: Commit, push, deploy `3.42`; run `npm install` on the edge node (sharp native binary must match the node's platform) and confirm the startup log shows no sharp warning; add a Cloudflare Cache Rule making `/_next/image*` eligible for cache (respect origin TTL) so transforms are edge-cached; set Cloudflare Browser Cache TTL to "Respect Existing Headers"; persist `.next/cache/images` across deploys if possible; bump image filenames (`_vX.Y`) whenever an image is replaced in place now that long TTLs apply.

### [2026-07-01 20:11 UTC] TYPE: change
- Author: Codex
- Summary: Prepared release version `3.41` as the first post-stage maintenance patch by adding conservative global browser security headers while leaving major framework upgrades for a separate compatibility-reviewed batch.
- Evidence: `next.config.js`, `tests/public-copy-tone.test.mjs`, `version.json`, `public/openapi.json`.
- Impact: Public routes now publish HSTS, nosniff, frame, referrer, and permissions-policy protections without changing the Deeploy/Next.js runtime model, route architecture, or content.
- Follow-up: Commit, push, deploy version `3.41`, confirm `/api/status` and live response headers, then evaluate dependency upgrade options separately.
- Related Entry: [2026-07-01 19:58 UTC] TYPE: change

### [2026-07-01 20:11 UTC] ADVERSARIAL-CHECK
- Scope: Post-stage global security-header hardening.
- BUILDER Intent + Change:
  - Added global `/:path*` security headers for `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.
  - Preserved existing route-specific Link, content-type, cache, and no-transform headers.
  - Added regression assertions for the global header set and incremented website release metadata from `3.40` to `3.41`.
- CRITIC Findings:
  - Live header diagnostics showed the deployed site did not publish standard browser security headers beyond Cloudflare defaults.
  - A full dependency audit cleanup would require a major Next/ESLint jump to `16.x`, which is too broad for this surgical post-stage patch and needs separate compatibility review.
  - A strict CSP would require a separate pass because the site uses Next inline runtime scripts, Google Fonts, and optional analytics.
- BUILDER Response / Refinements:
  - Added only conservative headers that do not require script/style nonce migration or framework major changes.
  - Used `SAMEORIGIN` instead of `DENY` for framing to avoid accidental same-origin route breakage.
  - Kept HSTS to `max-age=31536000` without preload or includeSubDomains to avoid overcommitting unknown subdomain policy.
- Verification:
  - `npm test` -> pass, 32/32 tests passed including global security-header assertions.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed with the existing Browserslist data warning only.
  - `git diff --check` -> pass.
  - `next start` on `http://127.0.0.1:3141` plus `curl -I` for `/`, `/trust`, `/openapi.json`, and `/contact` -> pass, all five security headers present and existing route-specific headers preserved.
- Residual Risk: Live deployment verification remains pending; dependency audit still requires a separate compatibility-reviewed upgrade batch.

### [2026-07-01 19:58 UTC] TYPE: change
- Author: Codex + xhigh live-review council
- Summary: Prepared release version `3.40` to close Stage 4 live-review blockers by making the mobile first-visit consent banner stack without internal overlap or horizontal clipping and adding visible status/freshness labels to the healthcare cybersecurity services page.
- Evidence: `styles/globals.css`, `pages/cybersecurity.jsx`, `tests/public-copy-tone.test.mjs`, `version.json`, `public/openapi.json`.
- Impact: The Stage 4 trust/accessibility review no longer depends on a fragile mobile consent layout, and the cybersecurity/resilience service page now carries the same public review-date discipline as adjacent trust and architecture pages.
- Follow-up: Commit, push, deploy version `3.40`, confirm `/api/status` is live, rerun live visual/UI council review on `smartclover.ro`, and continue Stage 4 only if blockers are closed.
- Related Entry: [2026-07-01 19:25 UTC] TYPE: change

### [2026-07-01 19:58 UTC] ADVERSARIAL-CHECK
- Scope: Stage 4 v3.40 live-review blocker fix for mobile consent and cybersecurity freshness labels.
- BUILDER Intent + Change:
  - Changed the narrow-viewport consent banner from a compressed horizontal layout into a stacked mobile layout with bounded grid action buttons, dynamic button text sizing, and hidden long explanatory copy.
  - Added a visible cybersecurity service status strip with draft status, service baseline date, page review date, owner, and per-engagement scoping note.
  - Added regression assertions for mobile consent grid behavior and cybersecurity freshness labels, then incremented website release metadata from `3.39` to `3.40`.
- CRITIC Findings:
  - The live UI/accessibility review found `/trust` mobile fresh-visit consent still failed at `390x844` and `360x740` because the label overlapped the action row and buttons bled horizontally.
  - The live visual review also found the mobile consent banner only partially resolved the previous Stage 4 blocker.
  - The live UI/accessibility review found `/cybersecurity` lacked explicit status, baseline, and page-reviewed labels despite carrying healthcare security/resilience service claims.
- BUILDER Response / Refinements:
  - Replaced the mobile row layout with a column layout and three bounded action columns that fit the 360px stress viewport without overlap.
  - Kept desktop consent behavior unchanged and preserved explicit accept, reject, and customize actions.
  - Added `/cybersecurity` freshness/status labels and a short note that service scope, partner controls, personnel responsibilities, and evidence records are confirmed per engagement.
- Verification:
  - `npm test` -> pass, 32/32 tests passed including new consent and cybersecurity freshness assertions.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed with the existing Browserslist data warning only.
  - `git diff --check` -> pass.
  - Local Playwright rendered smoke against `http://127.0.0.1:3140` at `390x844` and `360x740` -> pass, no mobile consent title/action overlap, no action-row overflow, and `/cybersecurity` status labels visible.
- Residual Risk: Requires deployment and live re-review before Stage 4 v3.40 can be closed.

### [2026-07-01 19:25 UTC] TYPE: change
- Author: Codex + xhigh live-review council
- Summary: Prepared release version `3.39` as a live-review fine-tune for Stage 4 by softening the public one-page deck's DataGems, cybersecurity, and investment-milestone wording, replacing stale `/proof` planning-artifact phrasing with public-checkable proof routes, adding current page-review freshness labels, tightening security/architecture claim scope, exposing the review-brief download from `/trust`, and shrinking the consent UI footprint.
- Evidence: `pages/trust/index.jsx`, `pages/proof.jsx`, `pages/regulatory.jsx`, `pages/cloud-architecture.jsx`, `pages/cybersecurity.jsx`, `pages/services.jsx`, `pages/products.jsx`, `pages/trust/*.jsx`, `components/ConsentManager.jsx`, `styles/globals.css`, `styles/refactor.css`, `tests/public-copy-tone.test.mjs`, `docs/SmartClover_1pagepitchdeck.pdf`, `public/docs/SmartClover_1pagepitchdeck.pdf`, `version.json`, `public/openapi.json`.
- Impact: Public diligence material no longer frames DataGems as a secondary product or presents NIS2/CRA/security-pack milestones with claim strength above the current public evidence posture; trust pages now separate baseline document dates from current page review dates and link the one-page brief directly from the diligence center.
- Follow-up: Commit, push, deploy version `3.39`, confirm `/api/status` is live, rerun live review on `smartclover.ro`, and continue Stage 4 with dated trust-pack freshness/security evidence depth.
- Related Entry: [2026-07-01 13:59 UTC] TYPE: change

### [2026-07-01 19:25 UTC] ADVERSARIAL-CHECK
- Scope: Stage 4 v3.39 live-review fine-tune for public deck and proof-page copy.
- BUILDER Intent + Change:
  - Updated the one-page deck source to `v1.3`, renamed the DataGems section to `Research pilot: DataGems`, softened NIS2/CRA service language, and made the financing milestone explicitly about future qualified pilots and approved reporting.
  - Replaced `/proof` timeline references to planning artifacts and internal/public planning artifacts with public product route, live workspace, screenshot, and repository evidence.
  - Added current `Page reviewed: 2026-07-01` labels to trust/proof/regulatory/security/policy review routes, tightened public security/architecture phrasing to deployment-specific controls and traceable records, added the one-page review brief download to `/trust`, and reduced consent banner/settings overlap.
  - Added regression coverage for the live-review blocker phrases in PDF extraction and public source scans, then incremented website release metadata from `3.38` to `3.39`.
- CRITIC Findings:
  - Live content review blocked Stage 4 closure because the public PDF still called DataGems a secondary product/governed synthetic-data environment, used over-strong NIS2/CRA/security-pack wording, and `/proof` relied on planning-artifact phrasing.
  - Live VC/diligence review blocked closure because the trust center still looked stale with February-only dates, security/architecture claims needed clearer deployment scoping, and the one-page review brief was not discoverable from `/trust`.
  - Live visual review blocked closure because first-visit consent UI still obscured primary trust content and the persistent settings pill could sit over content/CTAs.
  - The v3.38 PDF regression guarded earlier stale phrases but did not yet include the newer live-review blocker phrases.
- BUILDER Response / Refinements:
  - Repositioned DataGems in the deck as a research pilot rather than a secondary product.
  - Replaced compliance-heavy language with NIS2 documentation support, CRA-oriented review support, and security documentation for procurement review.
  - Removed planning-artifact wording from `/proof`, separated baseline dates from current page-review dates, scoped public security/architecture wording, added `/trust` review-brief discovery, compacted the consent controls, and added blocker phrases to durable copy/PDF tests.
- Verification:
  - `npm test` -> pass, 32/32 tests passed including expanded PDF/source blocker phrase guards.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed with the existing Browserslist data warning only.
  - `git diff --check` -> pass.
  - `pdftotext public/docs/SmartClover_1pagepitchdeck.pdf - | rg "secondary product|governed synthetic|NIS2 readiness evidence|CRA-aware|signed pilots|measured workflow outcomes|procurement-ready security pack|planning artifacts|internal/public|human-in|AI for Good|live pilot surface|diligence orientation|stakeholders|fundraising amount|flagship wedge"` -> pass, no matches.
  - `cmp` against `SmartClover_pitchdeck_1pager_v1.3.pdf` for both website PDF copies -> pass.
  - `pdftoppm -png -singlefile public/docs/SmartClover_1pagepitchdeck.pdf /tmp/smartclover-v139-onepager` plus visual inspection -> pass, one-page A4 layout rendered without clipping or overlap.
  - Playwright rendered smoke against local `http://127.0.0.1:3139` -> pass for compact consent banner/settings pill, `/trust` review-brief link, page-review freshness labels, and scoped cloud-architecture language.
- Residual Risk: Requires deployment and live re-review before Stage 4 v3.39 can be closed.

### [2026-07-01 13:59 UTC] TYPE: change
- Author: Codex + xhigh execution council + xhigh review council
- Summary: Prepared release version `3.38` for the first Stage 4 trust/diligence batch by making `/trust` the diligence center, preserving proof/regulatory/security deep dives, adding an accessible skip-link and exact current-page navigation semantics with grouped visual state, replacing the stale one-page public deck with the regenerated `v1.2` review brief, and repairing the local Playwright/PDF QA toolchain.
- Evidence: `.gitattributes`, `pages/trust/index.jsx`, `components/Layout.jsx`, `components/ConsentManager.jsx`, `styles/globals.css`, `styles/refactor.css`, `tests/public-copy-tone.test.mjs`, `docs/SmartClover_1pagepitchdeck.pdf`, `public/docs/SmartClover_1pagepitchdeck.pdf`, `version.json`, `public/openapi.json`.
- Impact: Reviewers now reach product proof, regulatory posture, security/privacy, cloud-on-edge, cybersecurity, incident-response, and services evidence from the trust center without treating dependency maintenance as part of this Stage 4 batch.
- Follow-up: Commit, push, deploy version `3.38`, confirm `/api/status` is live, rerun the live review council on `smartclover.ro`, and handle Next/security dependency updates as a separate maintenance batch.
- Related Entry: [2026-06-30 18:47 UTC] TYPE: change

### [2026-07-01 13:59 UTC] ADVERSARIAL-CHECK
- Scope: Stage 4 first trust/diligence/accessibility/deck batch.
- BUILDER Intent + Change:
  - Reworked `/trust` from a document-index surface into the main diligence center for product proof, regulatory posture, security/privacy, services, incident response, and architecture review.
  - Added skip-link support and kept grouped navigation active styling while reserving `aria-current="page"` for exact current-page links.
  - Replaced the first-visit centered cookie preferences modal with a compact consent banner and kept the detailed settings panel behind explicit customize/settings actions.
  - Replaced the stale public and source one-page pitch-deck PDFs with the regenerated `SmartClover_pitchdeck_1pager_v1.2.pdf` artifact.
  - Used Playwright-managed Chromium and Poppler/Python PDF text tooling, and incremented `version.json` plus the OpenAPI status example from `3.37` to `3.38`.
- CRITIC Findings:
  - Stage 4 planning found `/trust` still behaved as a document index and should become the coherent reviewer entry point while `/proof`, `/regulatory`, `/services`, `/cloud-architecture`, `/cybersecurity`, and trust subroutes remain live.
  - Live QA found the public site served version `3.37`, had reachable routes and working media, but lacked a skip link and grouped active navigation state.
  - Local rendered QA found the new skip-link target could scroll under the sticky header and show a full-page default focus outline.
  - PDF/deck review initially found the public/source one-page decks still contained stale public claims, while the first replacement still extracted `Human-in-the-loop AI for Good`, `live pilot surface`, `diligence orientation`, generic `stakeholders`, and an internal fundraising note.
  - Council accessibility review found repeated generic `Review`/`Open` link labels, missing explicit mobile menu focus-ring coverage in the refactor focus list, and mobile menu close behavior that could miss same-page hash navigation.
  - Council visual review found the trust review-card grid could render four narrow columns on desktop and should be capped to three columns with responsive overrides.
  - Rendered first-visit QA found the centered cookie preferences panel obstructed the new trust hero and reviewer-card entry path.
  - `git diff --check` treated the regenerated ReportLab PDF internals as text and reported binary-artifact trailing whitespace.
  - Dependency review found Next/security updates are non-blocking for this Stage 4 batch and should remain a separate maintenance release.
- BUILDER Response / Refinements:
  - Added regression tests for the trust center route links/content and layout accessibility behavior before implementing the page and layout changes.
  - Added `#main-content` scroll-margin and focus styling so skip-link activation lands cleanly below the sticky header without a full-page focus rectangle.
  - Updated the trust center copy and visual proof map without deleting the subordinate proof, regulatory, services, cloud, cybersecurity, or trust-policy routes.
  - Tightened trust-center status wording, replaced generic trust-card CTAs with specific link labels, closed the mobile menu on link click/asPath changes, and capped the trust review grid at three columns on desktop.
  - Changed consent UX to a compact first-visit banner, retained explicit accept/reject/customize controls, moved the full preferences panel behind explicit action, prevented inactive marketing consent from being stored through the analytics shortcut, added focus handoff to the settings panel, and strengthened mobile nav focus styling.
  - Regenerated the one-page source deck as `v1.2`, changed the public heading to `Flagship product: CerviGuard`, added a ReportLab PDF fallback for environments without LibreOffice, copied the generated PDF into both public/source website paths, and added a `pdftotext` regression test for stale public-deck phrases.
  - Added `.gitattributes` binary handling for PDFs, DOCX files, and common image assets so binary artifacts are not checked as text diffs.
  - Kept framework/security dependency versions unchanged.
- Verification:
  - `npm test` -> pass, 32/32 tests passed including PDF text extraction and consent-banner regression coverage.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed with the existing Browserslist data warning only.
  - `git diff --check` -> pass.
  - `npm exec playwright -- install chromium` and `npm exec playwright -- screenshot --timeout=30000 https://smartclover.ro /tmp/smartclover-qa/smoke-home.png` -> pass.
  - Live QA script against `https://smartclover.ro` -> pass for version `3.37`; local QA script against `http://127.0.0.1:3138` -> pass for version `3.38`.
  - `pdftotext ... | rg "human-in|AI for Good|live pilot surface|diligence orientation|stakeholders|fundraising amount|boutique ai studio|digital resilience|creative education|certified|guaranteed|approved mdr|final mdr|never leaves"` on public/source decks -> pass, no matches; `cmp` confirmed both checked-in PDFs match the `v1.2` artifact.
  - `pdftoppm -png -singlefile SmartClover/public/docs/SmartClover_1pagepitchdeck.pdf /tmp/smartclover-public-onepager-final` plus visual inspection -> pass, one-page A4 layout rendered without clipping or overlap.
  - Playwright rendered smoke against local `http://127.0.0.1:3138` -> pass for `/trust` first-visit consent banner, specific trust-card links, three-column grid cap, skip-link focus target, mobile nav focus/close behavior, and console cleanliness.
- Residual Risk: Online `3.38` deployment, final live re-review, security-header hardening, and the separate Next/security dependency maintenance batch remain pending after this local release-prep change.

### [2026-06-30 18:47 UTC] TYPE: change
- Author: Codex + xhigh execution council + xhigh review council
- Summary: Released follow-up version `3.30` to close the live Stage 1 `/contact` no-JS fallback blocker by adding server-rendered contact form semantics, browser-form HTML fallback handling, and a static `/contact/privacy` route.
- Evidence: `pages/contact.jsx`, `pages/contact/privacy.jsx`, `pages/api/contact.js`, `pages/trust/privacy-policy.jsx`, `next.config.js`, `scripts/generate-sitemap.mjs`, `public/sitemap.xml`, `tests/public-copy-tone.test.mjs`, `tests/seo-sitemap.test.mjs`, `public/openapi.json`, `version.json`.
- Impact: Contact and privacy-request paths now remain usable when JavaScript is unavailable, manual browser-form fallback copy no longer implies delivery, and `/contact/privacy` receives the same no-transform protection as `/contact`.
- Follow-up: Commit, push, wait for version `3.30` online, verify `/contact`, `/contact/privacy`, `/api/contact`, `/trust/privacy-policy`, `/sitemap.xml`, and complete live re-review before declaring Stage 1 complete.
- Related Entry: [2026-06-30 18:11 UTC] TYPE: change

### [2026-06-30 18:47 UTC] ADVERSARIAL-CHECK
- Scope: Stage 1 contact/privacy no-JS fallback fine-tune.
- BUILDER Intent + Change:
  - Added `/api/contact` `action`/`method`, browser-submittable field names, hydration-guarded submit disabling, and a server-rendered encoded mailto fallback to the contact form.
  - Added browser-form HTML responses from `/api/contact` while preserving JSON responses for fetch clients, including action-oriented manual fallback copy.
  - Added static `/contact/privacy` route, updated privacy-policy links, added sitemap coverage, and applied no-transform headers to `/contact/privacy`.
  - Incremented `version.json` and the OpenAPI status example from `3.29` to `3.30`.
- CRITIC Findings:
  - Live UI review found `/contact` had no functional no-JS/server-rendered fallback: no form action/method, no control names, disabled submit, and an email link that pointed to `#inquiry-form`.
  - Content review found manual browser-form fallback copy could imply delivery before the user opened the email fallback.
  - Content and VC/trust review found the privacy request path depended on client-side query handling and then lacked the `/contact/privacy` no-transform header after the static route was added.
- BUILDER Response / Refinements:
  - Implemented server-rendered form semantics and HTML fallback handling, then changed manual fallback copy to `Complete contact request by email`.
  - Added `/contact/privacy` as a static privacy-selected contact route and changed privacy-policy links to that route.
  - Added `/contact/privacy` to sitemap generation and `cloudflareEmailSafeHeaders`, with regression assertions for all blocker conditions.
- Verification:
  - `/home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node scripts/generate-sitemap.mjs && /home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node --test tests/*.test.mjs` -> pass, 23/23 tests passed.
  - `/home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node --check pages/api/contact.js` -> pass.
  - Direct `/api/contact` handler simulation for browser-form privacy submission -> pass; HTML fallback used action-oriented title/link and excluded commercial fields.
  - `git diff --check` -> pass.
  - Source scan for stale privacy query links, raw server-rendered contact mailto, and Cloudflare obfuscation markers -> pass.
  - `npm test`, `npm run lint`, and `npm run build` -> not run because this shell has no `npm`, `corepack`, or `node_modules`.
- Residual Risk: Live deployment propagation, rendered HTML/header verification, and live re-review remain pending until after push.

### [2026-06-30 18:11 UTC] TYPE: change
- Author: Codex + xhigh execution council + xhigh review council
- Summary: Completed Stage 1 of the 2026-06-30 public-trust remediation plan and prepared release version `3.29`, covering NIS2COMPASS risk wording, public route SEO metadata, sitemap generation, Cloudflare-safe contact/API email handling, and a dedicated privacy/data-subject contact path.
- Evidence: `components/PageSeo.jsx`, route files under `pages/`, `pages/contact.jsx`, `pages/api/contact.js`, `pages/docs/api.jsx`, `posts/nis2compass-verifiable-cybersecurity-proof.md`, NIS2 article images under `public/blog/images/`, `scripts/generate-sitemap.mjs`, `public/sitemap.xml`, `tests/public-copy-tone.test.mjs`, `tests/seo-sitemap.test.mjs`, `public/openapi.json`, `version.json`.
- Impact: Public pages now use centralized route metadata, the sitemap is generated from actual routes and posts, the NIS2 article no longer exposes over-strong audit/legal/compliance wording in flagged text-bearing surfaces, and privacy requests no longer reuse commercial qualification wording or commercial-only relay fields.
- Follow-up: Commit, push, wait for version `3.29` online, run live route checks, and complete the independent xhigh live-review council before advancing to Stage 2.
- Related Entry: [2026-06-15 13:43 UTC] TYPE: change

### [2026-06-30 18:11 UTC] ADVERSARIAL-CHECK
- Scope: Stage 1 public-trust defects and SEO plumbing.
- BUILDER Intent + Change:
  - Standardized public route metadata through `PageSeo`, regenerated `public/sitemap.xml` from static routes and Markdown posts, and added dependency-free sitemap generation plus parity tests.
  - Surgically corrected NIS2COMPASS text-bearing visuals, alt text, and flagged wording from achieved/audit/legal/compliance language to readiness and reviewable-evidence language under the operator-approved Stage 1 exception.
  - Added Cloudflare-safe contact/API email handling, no-transform headers for `/contact` and `/docs/api`, manual-routing feedback, a privacy/data-subject request path, and privacy-specific fallback/API relay bodies.
  - Incremented `version.json` and the OpenAPI status example from `3.28` to `3.29`.
- CRITIC Findings:
  - The review council initially blocked release because NIS2 visual/text wording could be read as over-strong compliance proof, product social metadata used a generic image, and contact/API fallbacks could be corrupted or misleading under Cloudflare email rewriting.
  - A later content pass found privacy/data-subject requests still received commercial success wording and commercial intake fields in fallback/API relay bodies.
  - The VC/trust review repeatedly flagged release governance as incomplete until `CHANGE_LOG.md`, `version.json`, and OpenAPI parity were updated.
- BUILDER Response / Refinements:
  - Replaced flagged NIS2 visual text and article references with readiness/reviewable-evidence wording, updated article `updated` metadata, and added tests blocking the risky phrases.
  - Updated contact and privacy handling so privacy requests have separate subject lines, body fields, and success copy, while manual relay stays a needs-action state.
  - Added regression tests for PageSeo adoption, centralized route Head usage, sitemap parity, NIS2 wording, contact/API email safety, privacy routing, and OpenAPI version parity.
- Verification:
  - `/home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node scripts/generate-sitemap.mjs && /home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node --test tests/*.test.mjs` -> pass, 22/22 tests passed.
  - `/home/andrei/.vscode-server/bin/7e7950df89d055b5a378379db9ee14290772148a/node --check pages/api/contact.js` -> pass.
  - `git diff --check` -> pass.
  - Public source scan for over-strong NIS2 wording, static mailto links, `user@example.com`, and Cloudflare obfuscation markers -> pass, no matches outside the API implementation.
  - `npm test`, `npm run lint`, and `npm run build` -> not run because this shell has no `npm`, `corepack`, or `node_modules`; the available VS Code-bundled Node binary was used for feasible tests.
- Residual Risk: Live deployment propagation and rendered-route verification remain pending until after push; direct JSX build validation could not be run without the project package manager/dependencies.

### [2026-06-15 13:43 UTC] TYPE: change
- Author: Codex
- Summary: Added NIS2COMPASS project links and readability emphasis to the NIS2COMPASS blog article, including a linked article-title token and release version `3.28`.
- Evidence: `posts/nis2compass-verifiable-cybersecurity-proof.md`, `pages/blog/[slug].jsx`, `tests/public-copy-tone.test.mjs`, `public/openapi.json`, `version.json`.
- Impact: The article now directs readers to `https://www.nis2compass.eu`, uses a callout-style opening, and highlights critical takeaways without changing the article's substantive claims.
- Follow-up: Commit, push, wait for version `3.28` online, then verify `/api/status`, article links, callout/highlight rendering, and the Further Reading entry.
- Related Entry: 2026-06-15 13:26 UTC TYPE: correction

### [2026-06-15 13:43 UTC] ADVERSARIAL-CHECK
- Scope: NIS2COMPASS article link and readability pass.
- BUILDER Intent + Change:
  - Converted body references to `NIS2COMPASS` into links to `https://www.nis2compass.eu` and added the project link to Further Reading.
  - Converted the opening paragraph into a Markdown blockquote callout and added selective bold emphasis for key takeaways.
  - Added a scoped article-title renderer so the `NIS2COMPASS` token in the article H1 links to the project website.
- CRITIC Findings:
  - Title text is rendered outside Markdown, so body-only linking would leave the visible H1 mention unlinked.
  - Image alt text contains NIS2COMPASS mentions; wrapping images in links makes the visual/alt context point to the project without changing the supplied image assets.
  - Overuse of emphasis could make the article noisy; emphasis was kept to key decision, evidence, AI-boundary, privacy, and outcome sentences.
- BUILDER Response / Refinements:
  - Added tests that remove linked body mentions and fail if unlinked `NIS2COMPASS` remains in the article body outside image alt text.
  - Added test coverage for the callout, bold takeaways, Further Reading link, and H1 title-link renderer.
  - Bumped `version.json` and `public/openapi.json` once to `3.28` for this release.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 17/17 tests passed.
  - `npm test` -> pass, 17/17 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed and generated `/blog/nis2compass-verifiable-cybersecurity-proof`.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online deployment propagation and live route rendering still need verification after push.

### [2026-06-15 13:26 UTC] TYPE: correction
- Author: Codex
- Summary: Restored the NIS2COMPASS blog article as a verbatim publication of `_raw/article.zip/article_1.md` after the operator clarified that supplied material must not be silently processed or humanized.
- Evidence: `posts/nis2compass-verifiable-cybersecurity-proof.md`, `pages/blog/index.jsx`, `pages/blog/[slug].jsx`, `public/blog/images/`, `tests/public-copy-tone.test.mjs`, `public/openapi.json`, `version.json`.
- Impact: Future article integrations must preserve operator-supplied publication material verbatim unless the operator explicitly chooses processed/reviewed/humanized publication. The blog template now supports `subtitle` as a metadata fallback so source frontmatter does not need to be rewritten only to satisfy the index/meta description.
- Follow-up: Commit, push, wait for version `3.27` online, then verify `/api/status`, the NIS2COMPASS route, the blog index summary, and all three original image assets.
- Related Entry: 2026-06-15 10:26 UTC TYPE: change

### [2026-06-15 13:26 UTC] ADVERSARIAL-CHECK
- Scope: Verbatim NIS2COMPASS article correction.
- BUILDER Intent + Change:
  - Replaced the processed NIS2COMPASS post with the exact Markdown supplied in `_raw/article.zip/article_1.md`.
  - Hosted the original image filenames under `public/blog/images/` so the article's relative `images/...` links render without changing the article body.
  - Added `subtitle` fallback support to the blog index and article metadata, updated the regression test to require verbatim article anchors, and bumped the release version to `3.27`.
- CRITIC Findings:
  - The earlier `3.26` release silently rewrote the article and omitted the supplied hero image, which violated the operator's intended publication mode.
  - Preserving the raw Markdown restores stronger claim language and the original "Achieving NIS2 Compliance" hero image; this is now an explicit operator decision, not an agent editorial decision.
  - Relative image paths would fail unless hosted under the route-compatible `/blog/images/` public path.
- BUILDER Response / Refinements:
  - Confirmed `diff -u /tmp/smartclover-article/article_1.md posts/nis2compass-verifiable-cybersecurity-proof.md` produced no output, proving the Markdown file is identical to the supplied source.
  - Kept only mechanical platform changes outside the article source: subtitle metadata fallback, asset placement, version metadata, and tests.
  - Deleted the previous processed-copy NIS2COMPASS image assets under `public/images/blog/` because the verbatim article uses the original relative image filenames.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 17/17 tests passed.
  - `npm test` -> pass, 17/17 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed and generated `/blog/nis2compass-verifiable-cybersecurity-proof`.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online deployment propagation and live route rendering still need verification after push.

### [2026-06-15 10:26 UTC] TYPE: change
- Author: Codex
- Summary: Published the NIS2COMPASS blog article from the supplied article package with scoped readiness-evidence language, local visual assets, and release version `3.26`.
- Evidence: `posts/nis2compass-verifiable-cybersecurity-proof.md`, `public/images/blog/nis2compass-collaboration-flow.png`, `public/images/blog/nis2compass-evidence-flow.png`, `tests/public-copy-tone.test.mjs`, `public/openapi.json`, `version.json`.
- Impact: The public blog now announces the SmartClover and AI STM Learning NIS2COMPASS work without relying on package-local image paths, compliance-certification claims, or AI-generated-sounding audit guarantee language.
- Follow-up: Commit, push, wait for version `3.26` online, then verify `/api/status` and the new blog route.
- Related Entry: 2026-05-11 19:32 UTC TYPE: change

### [2026-06-15 10:26 UTC] ADVERSARIAL-CHECK
- Scope: NIS2COMPASS blog launch.
- BUILDER Intent + Change:
  - Converted the supplied article into a public SmartClover blog post with a clear NIS2 readiness-evidence frame.
  - Hosted the selected collaboration and evidence-flow images locally under `public/images/blog/`.
  - Added regression coverage for the new post, local assets, version-schema alignment, and risky compliance phrases.
- CRITIC Findings:
  - The supplied hero image included embedded "Achieving NIS2 Compliance" wording, which could read as an achieved compliance claim; it was not used in the public post.
  - The raw article contained phrases such as "may still fail the compliance test", "legally meaningful", and "audit-ready proof"; those were replaced with reviewable-evidence language.
  - Blog Markdown cannot safely reference package-local `images/...` paths because rendered article URLs live under `/blog/`; all public image references must be absolute site paths.
- BUILDER Response / Refinements:
  - Reframed the announcement as a project and methodology overview, added an explicit "not legal advice" statement, and kept AI support subordinate to human review.
  - Added `tests/public-copy-tone.test.mjs` coverage for required NIS2COMPASS anchors and rejected overclaim/package-local fragments.
  - Bumped `version.json` and `public/openapi.json` once to `3.26` for this release.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 17/17 tests passed.
  - `npm test` -> pass, 17/17 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed and generated `/blog/nis2compass-verifiable-cybersecurity-proof`.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online deployment propagation and live route rendering still need verification after push.

### [2026-05-11 19:32 UTC] TYPE: change
- Author: Codex
- Summary: Added the machine-readable status cleanup review and closure note to the content rewrite review log.
- Evidence: `CONTENT_REWRITE_REVIEW.md`, `public/openapi.json`, `version.json`.
- Impact: The review trail now records the final machine-readable cleanup batch and states the remaining PDF/deck risk explicitly.
- Follow-up: Commit, push, wait for version `3.25` online, then verify `/api/status` and `/openapi.json`.
- Related Entry: 2026-05-11 19:24 UTC TYPE: change

### [2026-05-11 19:32 UTC] ADVERSARIAL-CHECK
- Scope: Review-log closure for content-fix execution.
- BUILDER Intent + Change:
  - Added a `CONTENT_REWRITE_REVIEW.md` batch record for machine-readable status cleanup.
  - Added a closure note that keeps PDF/deck review open instead of falsely closing the whole content plan.
  - Updated the OpenAPI status version example and site version for this documentation batch.
- CRITIC Findings:
  - Without this entry, the changelog would show the machine-readable cleanup but the content rewrite review log would not.
  - The plan should not be marked closed while public PDF/deck review remains pending.
- BUILDER Response / Refinements:
  - Kept the closure wording narrow: website-content batches are deployed; PDF/deck work remains active.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 16/16 tests passed.
  - `npm test` -> pass, 16/16 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online `/api/status` and `/openapi.json` checks are still required after deployment.

### [2026-05-11 19:24 UTC] TYPE: change
- Author: Codex
- Summary: Aligned the OpenAPI status schema example with the current public site version and added a regression test for future version bumps.
- Evidence: `public/openapi.json`, `tests/public-copy-tone.test.mjs`, `version.json`.
- Impact: Machine-readable API documentation no longer carries a stale site-version example after content deployments.
- Follow-up: Commit, push, wait for version `3.24` online, then verify `/api/status` and `/openapi.json`.
- Related Entry: 2026-05-11 19:03 UTC TYPE: change

### [2026-05-11 19:24 UTC] ADVERSARIAL-CHECK
- Scope: Machine-readable public API consistency after content and visual batches.
- BUILDER Intent + Change:
  - Scanned API and well-known public artifacts for evaluator-language, redaction regressions, unsupported claims, and provider-specific wording.
  - Updated the `StatusResponse.version.example` value in `public/openapi.json`.
  - Added a test that requires the OpenAPI status version example to match `version.json`.
- CRITIC Findings:
  - No banned evaluator-language was found in `lib`, `pages/api`, `public/.well-known`, or `public/openapi.json`.
  - The OpenAPI version example was stale (`3.8`) and could confuse automated consumers comparing `/api/status` to documentation.
- BUILDER Response / Refinements:
  - Kept the change narrow to the stale status example and test coverage.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 16/16 tests passed.
  - `npm test` -> pass, 16/16 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `rg -n "named accountability|public profile references|support evaluation|stakeholders|product maturity|trust-ready|diligence-ready|company profile|visible product artifacts|public record|identifiable prior work|center of the company story|not the main commercial product|remains a live research pilot|current company posture|publicly visible through|company story|boutique AI studio|100%|guaranteed|certified (product|platform|company|compliance)|approved MDR|final MDR" lib pages/api public/.well-known public/openapi.json` -> pass, no matches.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online `/openapi.json` and `/api/status` checks are still required after deployment.

### [2026-05-11 19:03 UTC] TYPE: change
- Author: Codex
- Summary: Added locally hosted NapkinAI visual diagrams to the DataGems and CerviGuard blog posts plus the cloud architecture and healthcare cybersecurity service pages.
- Evidence: `posts/datagems-synthetic-data-workflows.md`, `posts/cerviguard-remote-screening-foundations.md`, `pages/cloud-architecture.jsx`, `pages/cybersecurity.jsx`, `public/images/blog/`, `public/images/architecture/`, `tests/public-copy-tone.test.mjs`.
- Impact: Public content now has first-party hosted workflow and service visuals without transient NapkinAI URLs, provider-name exposure, or unsupported compliance, clinical-outcome, autonomous-security, or breach-prevention claims.
- Follow-up: Commit, push, wait for version `3.23` online, then verify the four affected routes render the local images and scoped captions.
- Related Entry: 2026-05-11 18:46 UTC TYPE: change

### [2026-05-11 19:03 UTC] ADVERSARIAL-CHECK
- Scope: NapkinAI visual batch under Task 6C.
- BUILDER Intent + Change:
  - Generated and reviewed visual candidates for DataGems workflow, CerviGuard workflow, cloud-on-edge boundaries, and healthcare cybersecurity/resilience.
  - Hosted the selected PNG assets under `public/images/...` instead of referencing expiring API download URLs.
  - Added blog image references, service-page `next/image` figures, captions, and visual styling.
- CRITIC Findings:
  - Several generated candidates were rejected for typos, generic framework drift, extra filler labels, cramped text, or over-broad AI/security phrasing.
  - Public pages must not expose NapkinAI API URLs or temporary download references.
  - Visual captions must keep the same claim boundaries as the surrounding copy.
- BUILDER Response / Refinements:
  - Regenerated the cloud-boundary visual with exact-label and provider-neutral constraints.
  - Selected visuals that preserve current product/service boundaries and added tests for local hosting and scoped visual context.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 15/15 tests passed.
  - `npm test` -> pass, 15/15 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `file public/images/blog/datagems-workflow-napkin_v1.0.png public/images/blog/cerviguard-workflow-napkin_v1.0.png public/images/architecture/cloud-on-edge-boundaries-napkin_v1.0.png public/images/architecture/healthcare-cyber-resilience-loop-napkin_v1.0.png` -> pass, all four assets are valid PNGs.
  - `rg -n "api\\.napkin\\.ai|generated_files|download_url|/v1/visual/" posts pages components styles public/.well-known` -> pass, no matches.
  - `rg -n "approved peers|cerviguard-screening-workflow|de-identified case material|fully compliant|breach-proof|guaranteed|guarantee|DataGems anonymizes|HIPAA compliant|clinical outcomes|100 percent" posts pages components public/.well-known` -> pass, no matches.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Online deployment and live route rendering checks are still required before closing version `3.23`.

### [2026-05-11 18:10 UTC] TYPE: change
- Author: Codex
- Summary: Added content governance artifacts and completed the first introspection/reader-value copy sweep for Home, About, and Products.
- Evidence: `CONTENT_INVENTORY.md`, `CONTENT_REDACTION_REGISTER.md`, `CONTENT_REWRITE_REVIEW.md`, `pages/index.jsx`, `pages/about.jsx`, `pages/products.jsx`, `tests/public-copy-tone.test.mjs`.
- Impact: Future content batches now have inventory, redaction memory, target-list discipline, and tests that block status-management copy such as `center of the company story`, `not the main commercial product`, and `publicly visible through`.
- Follow-up: Continue with DataGems blog review and existing blog review as separate batches.
- Related Entry: none

### [2026-05-11 18:10 UTC] ADVERSARIAL-CHECK
- Scope: Introspection and reader-value sweep for Home, About, Products, governance artifacts, and copy-tone tests.
- BUILDER Intent + Change:
  - Replaced analyst-style status narration with reader-value language for CerviGuard and DataGems.
  - Added `CONTENT_INVENTORY.md`, `CONTENT_REDACTION_REGISTER.md`, and `CONTENT_REWRITE_REVIEW.md`.
  - Added regression tests for introspective phrasing and positive assertions for reader-value product language.
- CRITIC Findings:
  - The governance files are new and should not be treated as proof that all later batches are complete.
  - The first sweep does not yet fix older blog posts or publish the DataGems article.
  - Visual graph work remains planned but not generated.
- BUILDER Response / Refinements:
  - Kept this commit scoped to the target-list rows and governance setup.
  - Recorded remaining blog and visual work as follow-up in `CONTENT_REWRITE_REVIEW.md` and `CONTENT_FIX_PLAN.md`.
  - Ran local tests, lint, build, source scans, and diff checks before versioning.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 12/12 tests passed.
  - `npm test` -> pass, 12/12 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - `rg -n "center of the company story|not the main commercial product|remains a live research pilot|publicly visible through|current company posture|not presented as the main commercial product|company story" pages components lib posts public/.well-known` -> pass, no matches.
- Residual Risk: Existing blog posts, DataGems publication, NapkinAI visuals, and online verification remain separate execution batches.

### [2026-05-11 18:17 UTC] TYPE: change
- Author: Codex
- Summary: Fixed a footer status-management phrase found during online verification of version `3.18`.
- Evidence: `components/Layout.jsx`, `tests/public-copy-tone.test.mjs`, `CONTENT_REWRITE_REVIEW.md`.
- Impact: The footer now follows the same reader-value rule as Home, About, and Products, and tests block `DataGems remains the live research pilot`.
- Follow-up: Re-validate, deploy as a new version, and verify online.
- Related Entry: 2026-05-11 18:10 UTC TYPE: change

### [2026-05-11 18:17 UTC] ADVERSARIAL-CHECK
- Scope: Footer reader-value follow-up after online verification.
- BUILDER Intent + Change:
  - Replaced footer copy that described DataGems by internal status with copy that explains its research-workflow role.
  - Added `remains the live research pilot` to the tone regression test.
- CRITIC Findings:
  - This was not caught by the first source scan because the phrase differed from the original target by one article.
  - The footer appears on every route, so stale footer language has broad public impact.
- BUILDER Response / Refinements:
  - Extended the banned fragment list to cover both `remains a live research pilot` and `remains the live research pilot`.
  - Added positive footer assertions for CerviGuard and DataGems reader-value language.
- Verification:
  - `npm test` -> pass, 12/12 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - `rg -n "center of the company story|not the main commercial product|not presented as the main commercial product|remains a live research pilot|remains the live research pilot|publicly visible through|current company posture|company story" pages components lib posts public/.well-known` -> pass, no matches.
- Residual Risk: Broader blog and visual work remain separate batches.

### [2026-05-11 18:22 UTC] TYPE: change
- Author: Codex
- Summary: Removed nearby product-status narration from Home, Products, and About metadata after the `3.19` online sweep.
- Evidence: `pages/index.jsx`, `pages/products.jsx`, `pages/about.jsx`, `tests/public-copy-tone.test.mjs`, `CONTENT_REWRITE_REVIEW.md`.
- Impact: Public copy now explains that CerviGuard is the product readers review first and DataGems supports synthetic-data research workflows, instead of narrating internal commercial hierarchy.
- Follow-up: Re-validate, deploy as a new version, and verify online.
- Related Entry: 2026-05-11 18:17 UTC TYPE: change

### [2026-05-11 18:22 UTC] ADVERSARIAL-CHECK
- Scope: Nearby status wording in Home, Products, and About metadata.
- BUILDER Intent + Change:
  - Replaced `CerviGuard remains the primary commercial product` with reader-value wording.
  - Replaced `DataGems operating as a live research pilot` and related metadata with synthetic-data research workflow language.
  - Added regression tests for the exact newly discovered phrases.
- CRITIC Findings:
  - The original scan was too narrow and allowed semantically similar status wording to remain.
  - Metadata needed the same reader-value alignment as visible page copy.
- BUILDER Response / Refinements:
  - Extended tests to block nearby phrases, not just the original exact text.
  - Updated metadata and visible page copy together.
- Verification:
  - `npm test` -> pass, 12/12 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - `rg -n "center of the company story|not the main commercial product|not presented as the main commercial product|remains a live research pilot|remains the live research pilot|remains the primary commercial product|operating as a live research pilot|publicly visible through|current company posture|company story" pages components lib posts public/.well-known` -> pass, no matches.
- Residual Risk: Blog posts and visual graph work remain separate batches.

### [2026-05-11 18:32 UTC] TYPE: change
- Author: Codex
- Summary: Published the DataGems synthetic-data workflow blog candidate and tightened unsupported DataGems inference wording on the Products page.
- Evidence: `posts/datagems-synthetic-data-workflows.md`, `pages/products.jsx`, `tests/public-copy-tone.test.mjs`, `CONTENT_REWRITE_REVIEW.md`.
- Impact: DataGems public copy now explains schema-first research workflow value, JSON/CSV exports, configured peers, and bounded research-pilot scope without internal portfolio-status narration or unsupported SLM-first positioning.
- Follow-up: Commit, push, wait for version `3.21` online, verify `/blog/datagems-synthetic-data-workflows`, then continue with existing blog review and NapkinAI visual batches.
- Related Entry: 2026-05-11 18:22 UTC TYPE: change

### [2026-05-11 18:32 UTC] ADVERSARIAL-CHECK
- Scope: DataGems blog publication and related Products page DataGems wording.
- BUILDER Intent + Change:
  - Added the approved DataGems article with source-linked synthetic-data, EHDS, and AI Act boundary context.
  - Replaced `approved peers` with `configured peers`.
  - Replaced `SLM-first generation` claims with evidence-backed internal inference path and saved external inference profile wording.
  - Added tests that block rejected draft phrases and DataGems overclaims.
- CRITIC Findings:
  - Review agents flagged internal hierarchy language, unsupported governance wording, `SLM-first` strategy claims, and too-broad CTA language.
  - The new blog route must not ship proposal notes, claim maps, reviewer questions, or temporary visual URLs.
  - Existing blog posts remain unreviewed as a separate batch.
- BUILDER Response / Refinements:
  - Public post contains only the article body and approved frontmatter.
  - The CTA is scoped to a bounded research or data-workflow pilot with one schema, one synthetic dataset, reviewable export, and documented limits.
  - Product-page DataGems copy now matches the evidence used for the blog.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 13/13 tests passed.
  - `npm test` -> pass, 13/13 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed and includes `/blog/datagems-synthetic-data-workflows`; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - `rg -n "HIPAA compliant|GDPR compliant|EHDS compliant|guarantees privacy|DataGems anonymizes patient data|DataGems is HIPAA compliant|DataGems provides differential privacy|DataGems guarantees privacy|DataGems creates clinically validated datasets|DataGems replaces real-world data|DataGems is a medical device|DataGems supports clinical diagnosis|diagnostic system|100%|guaranteed|guarantee|public profile|support evaluation|center of the company story|not the main commercial product|remains a live research pilot|publicly visible through|current company posture|human-in-the-loop|every deployment satisfies healthcare compliance|before data ever leaks|cannot silently remove|single product promise|Ratio1|approved peers|SLM-first generation|governed experimentation|governed synthetic-data|unlock|transform|seamless|revolutionary|game-changing|privacy-safe|100 percent" posts/datagems-synthetic-data-workflows.md pages/products.jsx pages components lib public/.well-known` -> pass, no matches.
- Residual Risk: Online deployment and blog URL verification are still required for version `3.21`; prior blog posts and NapkinAI graphics remain separate planned batches.

### [2026-05-11 18:46 UTC] TYPE: change
- Author: Codex
- Summary: Completed the existing-blog review batch for CerviGuard field context, healthcare AI research, cybersecurity/resilience, and cloud-on-edge deployment posts.
- Evidence: `posts/cerviguard-remote-screening-foundations.md`, `posts/healthcare-ai-research.md`, `posts/cybersecurity-healthcare-ledger.md`, `posts/on-prem-ledger-ci-cd.md`, `tests/public-copy-tone.test.mjs`, `CONTENT_REWRITE_REVIEW.md`.
- Impact: Older posts now avoid unsupported current-model/data claims, outcome-adjacent CerviGuard phrasing, broad cybersecurity promises, and HTML break formatting while preserving scoped cloud-on-edge and cybersecurity differentiators.
- Follow-up: Commit, push, wait for version `3.22` online, verify all changed blog URLs, then continue with the NapkinAI visual batch.
- Related Entry: 2026-05-11 18:32 UTC TYPE: change

### [2026-05-11 18:46 UTC] ADVERSARIAL-CHECK
- Scope: Existing blog posts under Task 6B.
- BUILDER Intent + Change:
  - Rewrote `healthcare-ai-research.md` from unsupported RAG/data claims into source-linked evidence and research-boundary language.
  - Tightened `cerviguard-remote-screening-foundations.md` around workflow value rather than prevention/outcome claims.
  - Rewrote `cybersecurity-healthcare-ledger.md` and `on-prem-ledger-ci-cd.md` with scoped architecture, security, and service language.
  - Added internal links to product, cloud, cybersecurity, proof, and trust pages.
- CRITIC Findings:
  - Review agents flagged remaining outcome-adjacent CerviGuard claims, broad `secure clinical system` wording, and missing evidence mapping for cloud/cyber differentiators.
  - Posts needed reader-value routing links and `Last reviewed` dates.
- BUILDER Response / Refinements:
  - Added an evidence map in `CONTENT_REWRITE_REVIEW.md` for cervical-screening references, CerviGuard workflow, cloud-on-edge service capability, architecture claims, and cybersecurity/resilience service scope.
  - Preserved user-confirmed true differentiators while tying them to approved deployment models, scoped engagements, and contract/environment boundaries.
  - Added tests that block the old unsupported fragments and require scoped blog language.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs` -> pass, 14/14 tests passed.
  - `npm test` -> pass, 14/14 tests passed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build completed; Browserslist database warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - `rg -n "process large datasets, identify patterns|We train retrieval-augmented models|community health records similar to those documented|SmartClover's knowledge graph|Each answer includes the underlying|clinicians in the loop|policy-controlled AI deployment with ledger-backed controls|role-based policy bundles define|approved edge/on-prem workers|flagship healthcare AI project for cervical cancer prevention|AI-assisted interpretation|reduce missed follow-up signals|SmartClover uses AI in research workflows|DataGems belongs in the research track|cybersecurity dashboards|SmartClover's role is to help keep those questions visible|This deployment model aligns with our operating principle|de-identified cervical image intake|secure clinical system|SLM-first generation|approved peers|Ratio1|guaranteed|every deployment satisfies healthcare compliance|before data ever leaks|cannot silently remove|single product promise|unlock|transform|seamless|revolutionary|game-changing|privacy-safe|100 percent|100%" posts` -> pass, no matches.
- Residual Risk: Online deployment and blog URL verification are still required for version `3.22`; NapkinAI visuals remain a separate planned batch.

### [2026-07-01 04:36 UTC] TYPE: change
- Author: Codex + xhigh Stage 2 implementation council
- Summary: Upgraded the SmartClover blog into a clinical evidence journal system with featured index hierarchy, richer article metadata, article heroes, long-article TOC, figure-aware Markdown rendering, related reading, and Blog/Article JSON-LD.
- Evidence: `lib/posts.js`, `pages/blog/index.jsx`, `pages/blog/[slug].jsx`, `styles/refactor.css`, `tests/blog-editorial.test.mjs`, `version.json`, `public/openapi.json`; commands `node --test tests/*.test.mjs`, `node --test tests/blog-editorial.test.mjs`, `node --test tests/seo-sitemap.test.mjs`, `node --check lib/posts.js`, `node --check tests/blog-editorial.test.mjs`, `git diff --check`, CSS balance/source checks.
- Impact: Stage 2 now gives blog readers a stronger editorial path without rewriting operator-supplied article bodies; the NIS2COMPASS article can expose its author, partner, updated date, hero image, long-article contents, and related context while preserving claim discipline.
- Follow-up: Commit and push version `3.31`, wait for deployment, verify `/blog` and key article routes online, then run an independent xhigh live review council before closing Stage 2.
- Related Entry: [2026-05-11 18:46 UTC] TYPE: change

### [2026-07-01 04:36 UTC] ADVERSARIAL-CHECK
- Scope: Stage 2 blog/editorial system implementation.
- BUILDER Intent + Change:
  - Used two xhigh visual/artwork reviewers, one xhigh UI/UX implementation reviewer, and one xhigh content-quality reviewer to select the clinical evidence journal direction before build work.
  - Enriched the Markdown data layer with normalized summaries, topics, tags, author/partner metadata, hero-image metadata, reading time, TOC entries, related posts, local image dimensions, lazy image attributes, and local image-path safety checks.
  - Replaced the blog index with a featured article, topic labels, thumbnails, reading metadata, and Blog JSON-LD.
  - Replaced the article template with an editorial hero, metadata strip, summary/key-points box, TOC for long posts, figure-aware Markdown body, related reading, NIS2COMPASS title linking, and BlogPosting JSON-LD.
  - Added scoped clinical-journal CSS and a focused `tests/blog-editorial.test.mjs` regression file.
  - Incremented the release version from `3.30` to `3.31` and updated the OpenAPI status example.
- CRITIC Findings:
  - The first implementation pass risked duplicating the hero image because the article template and Markdown body could both render the same first image.
  - Markdown captions would remain only presentational if image paragraphs were not converted into article figures.
  - Existing public-copy tests depended on NIS2COMPASS subtitle fallback behavior and title linking, so the new templates had to preserve those source-level safeguards.
  - Local build validation is blocked because `npm` is unavailable and `node_modules` is absent in this checkout.
- BUILDER Response / Refinements:
  - Added rendered-HTML figure conversion for Markdown images and moved matching first-image captions into hero metadata.
  - Removed duplicate hero figures from rendered body HTML without changing source Markdown.
  - Kept article summaries sourced from `summary`, `excerpt`, or `subtitle` only; no NIS2COMPASS body prose was rewritten.
  - Preserved NIS2COMPASS title linking and existing project-link tests.
  - Added dependency-aware blog tests that run source checks locally and skip only integration checks requiring missing installed packages.
- Verification:
  - `node --test tests/*.test.mjs` -> pass, 24 passed and 3 dependency-backed blog integration checks skipped because `gray-matter`, `remark`, and `remark-html` are not installed.
  - `node --test tests/blog-editorial.test.mjs` -> pass, 1 passed and 3 dependency-backed checks skipped for the same missing packages.
  - `node --test tests/seo-sitemap.test.mjs` -> pass, 3/3.
  - `node --check lib/posts.js` -> pass.
  - `node --check tests/blog-editorial.test.mjs` -> pass.
  - CSS balance/source checks -> pass.
  - `git diff --check` -> pass.
  - `npm --version` -> fail, `npm` is not installed in this shell, so `npm run lint` and `npm run build` could not be run locally.
- Residual Risk: Full Next.js lint/build and browser visual QA must be confirmed through deployment or another environment with `npm` and installed dependencies; live Stage 2 council review remains required after version `3.31` is online.

### [2026-07-01 04:50 UTC] TYPE: change
- Author: Codex + xhigh live review council
- Summary: Applied the Stage 2 live-review fix patch for blog topic classification, explicit-summary discipline, TOC anchors, Markdown image attributes, duplicate hero/body images, and NIS2 inline figure captions.
- Evidence: `lib/posts.js`, `tests/blog-editorial.test.mjs`, `version.json`, `public/openapi.json`; live council findings against `/blog`, `/blog/nis2compass-verifiable-cybersecurity-proof`, and `/blog/datagems-synthetic-data-workflows`.
- Impact: The blog editorial system no longer mislabels NIS2 or CerviGuard content, avoids body-derived summary text, makes TOC links match rendered heading IDs, and keeps DataGems/NIS2 diagrams from duplicating or losing lazy-loading metadata.
- Follow-up: Commit and push version `3.32`, wait for deployment, re-check live blog routes, and rerun an independent xhigh live review council on the fixed release.
- Related Entry: [2026-07-01 04:36 UTC] TYPE: change

### [2026-07-01 04:50 UTC] ADVERSARIAL-CHECK
- Scope: Stage 2 post-deploy live-review corrections.
- BUILDER Intent + Change:
  - Added slug-level editorial defaults for topic labels, tags, and non-placeholder hero images.
  - Removed body-derived summary fallback so article summary UI uses explicit metadata only.
  - Matched TOC IDs to the `remark-html` rendered heading prefix.
  - Added rendered-HTML image post-processing for `loading="lazy"` and `decoding="async"`.
  - Converted inline Markdown image/caption paragraphs to `article-figure`, removed duplicate hero figures, and added caption defaults for NIS2 inline diagrams.
  - Incremented the release version from `3.31` to `3.32` and updated the OpenAPI status example.
- CRITIC Findings:
  - The xhigh visual reviewer found visible topic-chip misclassification, repeated fallback thumbnails, missing NIS2 inline captions, and weak DataGems scan structure.
  - The xhigh content reviewer found NIS2 miscategorized as `Research Data` and summary sourcing not enforced by the data layer.
  - The xhigh UI/UX reviewer found broken TOC anchors because rendered headings were prefixed with `user-content-`, DataGems hero/body image duplication, and missing runtime image attributes.
- BUILDER Response / Refinements:
  - Fixed topic/thumbnail defaults without editing article prose or changing operator-supplied NIS2 body content.
  - Removed the first-content summary fallback and kept summary/dek logic tied to explicit front matter fields.
  - Made TOC IDs use the rendered heading prefix and updated regression expectations.
  - Added an image HTML post-process step after `remark-html` so lazy/decoding attributes survive sanitization.
  - Added figure conversion patterns that handle inline image plus italic-caption paragraphs.
- Verification:
  - `node --test tests/*.test.mjs` -> pass, 24 passed and 3 dependency-backed blog integration checks skipped because `gray-matter`, `remark`, and `remark-html` are not installed.
  - `node --check lib/posts.js` -> pass.
  - `node --check tests/blog-editorial.test.mjs` -> pass.
  - `git diff --check` -> pass.
  - `npm --version` -> fail, `npm` is not installed in this shell, so `npm run lint` and `npm run build` could not be run locally.
- Residual Risk: Live deployment and council re-review are still required before closing Stage 2 because the decisive failures were visible only after a deployed build with installed Markdown dependencies.

### [2026-07-01 05:00 UTC] TYPE: change
- Author: Codex
- Summary: Linked the generated NIS2COMPASS mention inside the renderer-injected collaboration figure caption, resolving the only non-blocking content-review advisory from the fixed-release council.
- Evidence: `lib/posts.js`, `version.json`, `public/openapi.json`; live council advisory from the `3.32` content-quality re-review.
- Impact: Generated figure-caption text now follows the same project-linking rule as the operator-supplied NIS2COMPASS article body without editing article Markdown prose.
- Follow-up: Commit and push version `3.33`, wait for deployment, and verify the generated caption link online.
- Related Entry: [2026-07-01 04:50 UTC] TYPE: change

### [2026-07-01 05:00 UTC] ADVERSARIAL-CHECK
- Scope: Stage 2 final generated-caption link advisory.
- BUILDER Intent + Change:
  - Updated the generated NIS2 collaboration-flow caption so `NIS2COMPASS` links to `https://www.nis2compass.eu`.
  - Left `posts/nis2compass-verifiable-cybersecurity-proof.md` unchanged.
  - Incremented the release version from `3.32` to `3.33` and updated the OpenAPI status example.
- CRITIC Findings:
  - The `3.32` council passed closure but noted one generated caption mention was not linked.
  - Changing generated caption HTML must not weaken source-controlled verbatim-publication discipline for the NIS2 article body.
- BUILDER Response / Refinements:
  - Made the fix only in `lib/posts.js` caption defaults, where the generated text originates.
  - Kept the operator-supplied article source untouched.
- Verification:
  - `node --test tests/*.test.mjs` -> pass, 24 passed and 3 dependency-backed blog integration checks skipped because `gray-matter`, `remark`, and `remark-html` are not installed.
  - `node --check lib/posts.js` -> pass.
  - `git diff --check` -> pass.
  - `npm --version` -> fail, `npm` is not installed in this shell, so `npm run lint` and `npm run build` could not be run locally.
- Residual Risk: Live deployment verification remains required for version `3.33`.

### [2026-07-01 05:45 UTC] TYPE: change
- Author: Codex + xhigh visual/UI review sidecar
- Summary: Reworked the blog article Contents sidebar to remove the large oval/blob visual treatment and make the TOC a restrained, bounded navigation panel.
- Evidence: `styles/refactor.css`, `version.json`, `public/openapi.json`; operator screenshot of the NIS2COMPASS article sidebar.
- Impact: Long blog articles now keep a more professional clinical/B2B sidebar treatment, with a narrower desktop rail, earlier single-column fallback, visible keyboard focus, and no article-prose changes.
- Follow-up: Commit and push version `3.34`, wait for deployment, and verify the live NIS2COMPASS article sidebar online.
- Related Entry: [2026-07-01 04:36 UTC] TYPE: change

### [2026-07-01 05:45 UTC] ADVERSARIAL-CHECK
- Scope: Blog article Contents/sidebar visual hotfix.
- BUILDER Intent + Change:
  - Converted the Contents area from an unbounded rule-separated list into a compact bordered panel aligned to a predictable left rail.
  - Reduced the desktop sidebar width, limited sticky height, added scroll protection for long TOCs, improved link rhythm and focus state, and added an `1180px` breakpoint so the sidebar stacks before medium-width layouts become cramped.
  - Incremented the release version from `3.33` to `3.34` and updated the OpenAPI status example.
- CRITIC Findings:
  - The xhigh visual reviewer found the existing Contents presentation looked like an accidental large white oval/blob, with too much empty decorative mass and inconsistent treatment versus the Summary note.
  - The xhigh UI reviewer found the two-column sticky article layout collapsed too late and could squeeze the article body on medium desktop/tablet widths.
  - The fix should remain CSS-only and must not alter the operator-supplied NIS2COMPASS article prose.
- BUILDER Response / Refinements:
  - Kept the patch to `styles/refactor.css` plus required release-version files; no Markdown/article text or rendering logic was changed.
  - Removed blur-heavy/decorative behavior from the TOC panel, narrowed the rail to `220px-260px`, and added a scoped medium-width single-column override for article pages with TOC.
  - Strengthened keyboard focus visibility while preserving normal link wrapping and anchor behavior.
- Verification:
  - `node --test tests/*.test.mjs` -> pass, 24 passed and 3 dependency-backed blog integration checks skipped because `gray-matter`, `remark`, and `remark-html` are not installed.
  - CSS brace balance check -> pass.
  - `git diff --check` -> pass, no whitespace errors.
  - `npm run lint` -> fail, `next: not found` because this checkout has no installed `node_modules`.
  - `npm run build` -> fail, `next: not found` because this checkout has no installed `node_modules`.
- Residual Risk: Browser visual QA must be confirmed after deployment because the local checkout cannot run a Next.js build without installing dependencies.

### [2026-07-01 06:52 UTC] TYPE: change
- Author: Codex + xhigh Stage 3 execution council
- Summary: Started Stage 3 homepage and product-proof remediation by making CerviGuard the first visual proof path, moving DataGems into a secondary research-track role, and adding concrete product artifacts to `/products` and `/proof`.
- Evidence: `pages/index.jsx`, `pages/products.jsx`, `pages/cerviguard.jsx`, `pages/proof.jsx`, `pages/about.jsx`, `pages/regulatory.jsx`, `components/DiligenceLinksSection.jsx`, `styles/refactor.css`, `tests/public-copy-tone.test.mjs`, `tests/blog-editorial.test.mjs`, `version.json`, `public/openapi.json`; xhigh visual, UI, VC/client, and asset-review findings.
- Impact: The public site now leads with CerviGuard product evidence instead of equal-weight product/research/service clutter, removes sensitive high-detail CerviGuard screenshots from the public gallery, and replaces generic About/Home credibility imagery with source-linked materials.
- Follow-up: Commit and push version `3.35`, wait for deployment, verify live routes, then run an independent xhigh live review council before closing Stage 3.
- Related Entry: [2026-07-01 06:29 UTC] TYPE: decision in meta-repo SmartClover playbook.

### [2026-07-01 06:52 UTC] ADVERSARIAL-CHECK
- Scope: Stage 3 first implementation batch for homepage, product proof, CerviGuard, DataGems presentation, and proof assets.
- BUILDER Intent + Change:
  - Simplified the homepage hero around CerviGuard only, removed DataGems from first-screen equal visual weight, and moved product/research/trust proof into the next section.
  - Added a CerviGuard-first proof section on `/products` with workspace screenshot, live workspace link, public repository, MDR draft, and proof route before the DataGems research-track section.
  - Moved safer CerviGuard screenshots higher on `/cerviguard`, removed case-list and case-detail screenshots from that gallery, and added the workflow diagram before general platform highlights.
  - Added a verified product-proof section to `/proof`, replaced generic About visual treatment with source-linked materials, changed the regulatory social image away from the clinical case-detail screenshot, normalized DataGems screenshot framing, and added broader focus-visible styling.
  - Incremented the release version from `3.34` to `3.35` and updated the OpenAPI status example.
- CRITIC Findings:
  - The xhigh visual reviewer found `/products` claimed CerviGuard led while DataGems carried the only substantial screenshot proof, and flagged generic `research-lab.png` credibility imagery.
  - The xhigh VC/client reviewer found the homepage first screen proof-cluttered, flagged `SLM-first` and `commercial readiness` wording, and found `Portfolio Status` too internal.
  - The xhigh UI reviewer found DataGems screenshot cards had uneven media heights and recommended explicit focus-visible styling plus product-proof hierarchy tests.
  - The xhigh asset reviewer flagged current CerviGuard screenshots as carrying pilot-era UI labels and identified case-detail/case-list images plus DataGems sign-in/schema-peer images as unsuitable for high-funnel proof.
- BUILDER Response / Refinements:
  - Used CSS-framed high-funnel screenshots to crop app chrome without altering source assets, while recording that fresh product-label screenshots remain needed.
  - Reordered product proof so CerviGuard leads on homepage, `/products`, `/cerviguard`, and `/proof`; DataGems remains present but secondary as a research pilot.
  - Removed or demoted sensitive/risky screenshots from public product-proof surfaces and constrained DataGems screenshot presentation to safer dashboard/job-form assets.
  - Extended tests to require Stage 3 product-proof hierarchy, block generic `SLM-first` public wording, and keep DataGems screenshots contained.
- Verification:
  - `npm ci` -> pass, dependencies installed; npm reported existing audit findings: 5 moderate and 7 high.
  - `node --test tests/*.test.mjs` -> pass, 28/28 tests passed with Markdown dependencies installed.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, Next.js production build completed and generated 32 static pages; existing Browserslist `caniuse-lite` warning only.
  - `git diff --check` -> pass, no whitespace errors.
  - Focused source scan for `SLM-first`, `Portfolio Status`, `commercial readiness`, risky screenshot references in touched pages, and banned proof wording -> pass for public pages touched by Stage 3; `gender-equality-plan` still uses `research-lab.png` outside this Stage 3 product-proof scope.
- Residual Risk: Fresh CerviGuard and DataGems screenshots should be recaptured from product-status-safe, public-safe UI; screenshot-backed browser QA remains blocked until browser runtime dependencies are available; npm audit findings are existing dependency-maintenance work, not introduced by this content/layout batch.

### [2026-07-01 07:13 UTC] TYPE: change
- Author: Codex + independent xhigh Stage 3 live-review council
- Summary: Fine-tuned the Stage 3 product-proof release by removing pilot-era CerviGuard sign-in/profile screenshots from public proof presentation and replacing one internal About heading with reader-facing language.
- Evidence: `pages/cerviguard.jsx`, `pages/proof.jsx`, `pages/about.jsx`, `tests/public-copy-tone.test.mjs`, `version.json`, `public/openapi.json`; live xhigh visual/artwork reviewer blocker on `/cerviguard`.
- Impact: Stage 3 no longer exposes the highest-friction pilot-worded screenshots in the public CerviGuard gallery or closing visual while preserving CerviGuard-first proof hierarchy.
- Follow-up: Commit and push version `3.36`, wait for deployment, then re-check live `/cerviguard` and rerun the independent visual blocker review.
- Related Entry: [2026-07-01 06:52 UTC] TYPE: change.

### [2026-07-01 07:13 UTC] ADVERSARIAL-CHECK
- Scope: Stage 3 live-review fine-tune for CerviGuard screenshot presentation and one About-page wording advisory.
- BUILDER Intent + Change:
  - Removed `cerviguard-login.png` and `cerviguard-profile.png` from public CerviGuard proof surfaces because the live-review council found visible pilot-era wording in those assets.
  - Replaced the closing CerviGuard screenshot with the existing workflow diagram and updated `/proof` so it no longer promises a login screenshot.
  - Replaced the About heading `Source-linked materials replace generic credibility imagery` with direct reader-facing wording.
  - Incremented the release version from `3.35` to `3.36` and updated the OpenAPI status example.
- CRITIC Findings:
  - The xhigh visual reviewer failed Stage 3 close because `/cerviguard` rendered a sign-in screenshot containing `SMARTCLOVER CERVICAL SCREENING PILOT` and `pilot accounts`.
  - The xhigh content/market reviewer passed Stage 3 but found the About heading sounded like internal remediation language instead of website copy.
  - The remaining dashboard and add-case assets still need future recapture from a product-label-safe UI, even though current high-funnel frames crop app chrome.
- BUILDER Response / Refinements:
  - Removed the uncropped sign-in and profile screenshots from rendered CerviGuard proof presentation and added regression assertions blocking those paths from reappearing on the CerviGuard page.
  - Kept the dashboard and add-case proof screenshots because they remain cropped inside the current visual frames and were not the live-review blocker.
  - Kept the patch surgical and avoided broad copy or design changes outside the identified live-review findings.
- Verification:
  - `node --test tests/public-copy-tone.test.mjs tests/seo-sitemap.test.mjs tests/blog-editorial.test.mjs` -> pass, 28/28 tests.
  - Focused source scan for `cerviguard-login.png`, `cerviguard-profile.png`, `Source-linked materials replace generic credibility imagery`, and `showing login` across public source surfaces excluding the regression test -> pass, no matches.
  - `node --test tests/*.test.mjs` -> pass, 28/28 tests.
  - `npm run lint` -> pass, no ESLint warnings or errors.
  - `npm run build` -> pass, production build generated 32 static pages; existing Browserslist warning only.
  - `git diff --check` -> pass, no whitespace errors.
- Residual Risk: Fresh CerviGuard product screenshots remain the durable fix for all pilot-era UI labels; screenshot-backed browser QA remains blocked because the local Playwright Chromium binary is not installed.

### [2026-07-01 07:30 UTC] TYPE: change
- Author: Codex + independent xhigh visual live-review council
- Summary: Replaced the remaining published CerviGuard proof screenshots with public-safe cropped assets and removed unused pilot-era clinical/account screenshots from the public asset folder.
- Evidence: `public/images/cerviguard/cerviguard-dashboard.png`, `public/images/cerviguard/cerviguard-add-case.png`, removed `public/images/cerviguard/cerviguard-login.png`, `public/images/cerviguard/cerviguard-profile.png`, `public/images/cerviguard/cerviguard-case-detail.png`, `public/images/cerviguard/cerviguard-cases-list.png`, `tests/public-copy-tone.test.mjs`, `version.json`, `public/openapi.json`; xhigh visual re-review failure on live version `3.36`.
- Impact: The actual published image files used for CerviGuard proof and social previews no longer expose `Pilot Console`, pilot guidelines, pilot build wording, account screenshots, clinical case detail imagery, or case-list screenshots.
- Follow-up: Commit and push version `3.37`, wait for deployment, verify old asset URLs no longer return public pilot-era images, and rerun focused live visual review.
- Related Entry: [2026-07-01 07:13 UTC] TYPE: change.

### [2026-07-01 07:30 UTC] ADVERSARIAL-CHECK
- Scope: Asset-level Stage 3 visual blocker remediation for CerviGuard proof images.
- BUILDER Intent + Change:
  - Replaced `cerviguard-dashboard.png` with a public-safe aggregate-card crop that removes the pilot-era header/footer and row-level case identifiers.
  - Replaced `cerviguard-add-case.png` with a public-safe intake-form crop that removes the pilot-era header/footer and pilot-guideline/build text.
  - Removed obsolete public CerviGuard screenshots that should not be directly published: login, profile, case-detail, and cases-list.
  - Added a regression assertion that those obsolete public asset files are absent.
  - Incremented the release version from `3.36` to `3.37` and updated the OpenAPI status example.
- CRITIC Findings:
  - The focused xhigh visual reviewer found that `/cerviguard` version `3.36` still rendered `cerviguard-add-case.png` with visible pilot-guideline/build language.
  - The same reviewer found the full dashboard image still contained `CerviGuard Pilot Console` when used as a proof/social image asset.
  - The removed login/profile files were no longer rendered, but still returned `200` if opened directly.
- BUILDER Response / Refinements:
  - Sanitized the two retained images at the binary asset level instead of relying on CSS cropping or page references.
  - Deleted the no-longer-rendered risky screenshots from `public/images/cerviguard` so deployment should stop serving them directly after cache expiry.
  - Used Python/Pillow for the binary image transformation because no ImageMagick, GraphicsMagick, or ffmpeg binary was available in the environment.
- Verification:
  - Manual inspection of sanitized `public/images/cerviguard/cerviguard-dashboard.png` -> pass, no pilot header/footer and no row-level case identifiers.
  - Manual inspection of sanitized `public/images/cerviguard/cerviguard-add-case.png` -> pass, no pilot header/footer and no pilot-guideline/build text.
  - `rg -n "cerviguard-login\\.png|cerviguard-profile\\.png|cerviguard-case-detail\\.png|cerviguard-cases-list\\.png|Pilot Console|pilot accounts|pilot guidelines|pilot build" pages components lib posts public tests styles CHANGE_LOG.md -S` -> pass for public source/assets; remaining matches are changelog/test context only.
  - `file public/images/cerviguard/*.png` -> pass, only sanitized dashboard and add-case PNGs remain, both `1600 x 1100`.
- Residual Risk: Browser screenshot/aXe QA remains blocked until Playwright browser dependencies are installed; any CDN or image optimizer cache may briefly retain old direct asset responses immediately after deployment.
