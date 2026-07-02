#!/usr/bin/env node
/**
 * Render the SmartClover schematic diagram family to PNG.
 *
 * All non-locked site diagrams come from this one config so they share a
 * single visual language: white canvas, white nodes with 2px role-colored
 * borders, numbered accent circles, Sora titles, IBM Plex Sans labels,
 * solid connectors for flow and dashed for feedback/control-plane.
 * Role colors: teal = SmartClover product surface, ink = final state,
 * gold = evidence artifact, slate = external/neutral systems.
 *
 * Usage: node scripts/render-diagrams.mjs
 * Output: public/images/diagrams/*.png and public/images/og/brand-card_v1.png
 * Rendered via headless Chromium at 2x, downscaled to the target width.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIAGRAMS = path.join(ROOT, 'public', 'images', 'diagrams');
const OUT_OG = path.join(ROOT, 'public', 'images', 'og');
const LOGO = path.join(ROOT, 'public', 'smartclover-logo_v2.png');

const COLORS = {
  ink: '#102027',
  teal: '#0f788d',
  tealSoft: 'rgba(15, 120, 141, 0.08)',
  gold: '#a97b34',
  goldSoft: 'rgba(169, 123, 52, 0.08)',
  slate: '#536471',
  slateSoft: 'rgba(83, 100, 113, 0.07)',
  line: '#d8e4e6',
  muted: '#536471'
};

const baseCss = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  #canvas {
    background: #ffffff;
    font-family: 'IBM Plex Sans', sans-serif;
    color: ${COLORS.ink};
    display: flex;
    flex-direction: column;
    padding: 56px 64px 40px;
    position: relative;
  }
  .diagram-title {
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 42px;
    letter-spacing: -0.01em;
    text-align: center;
  }
  .diagram-subtitle {
    font-size: 23px;
    color: ${COLORS.muted};
    text-align: center;
    margin-top: 12px;
  }
  .diagram-body { flex: 1; display: flex; align-items: center; position: relative; }
  .diagram-footer {
    border-top: 1.5px solid ${COLORS.line};
    padding-top: 18px;
    text-align: center;
    font-size: 19px;
    color: ${COLORS.muted};
  }
  .node {
    background: #ffffff;
    border: 2px solid ${COLORS.teal};
    border-radius: 16px;
    padding: 40px 22px 22px;
    position: relative;
    flex: 1;
  }
  .node .step-number {
    position: absolute;
    top: -22px;
    left: 22px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${COLORS.teal};
    color: #ffffff;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .node .node-title {
    font-weight: 600;
    font-size: 23px;
    line-height: 1.25;
    color: ${COLORS.teal};
  }
  .node .node-desc {
    font-size: 18px;
    line-height: 1.4;
    color: ${COLORS.muted};
    margin-top: 10px;
  }
  .node.role-gold { border-color: ${COLORS.gold}; background: ${COLORS.goldSoft}; }
  .node.role-gold .step-number { background: ${COLORS.gold}; }
  .node.role-gold .node-title { color: ${COLORS.gold}; }
  .node.role-ink { border-color: ${COLORS.ink}; }
  .node.role-ink .step-number { background: ${COLORS.ink}; }
  .node.role-ink .node-title { color: ${COLORS.ink}; }
  .node.role-slate { border-color: ${COLORS.slate}; background: ${COLORS.slateSoft}; }
  .node.role-slate .node-title { color: ${COLORS.slate}; }
  .arrow { flex: 0 0 44px; display: flex; align-items: center; justify-content: center; }
  .arrow svg { display: block; }
`;

const googleFonts =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap" rel="stylesheet">';

const arrowRight = (color = COLORS.slate) =>
  `<div class="arrow"><svg width="36" height="24" viewBox="0 0 36 24" fill="none">
    <path d="M2 12h26" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 5l9 7-9 7z" fill="${color}"/>
  </svg></div>`;

const nodeHtml = ({ number, title, desc, role = 'teal' }) => `
  <div class="node role-${role}">
    ${number ? `<span class="step-number">${number}</span>` : ''}
    <div class="node-title">${title}</div>
    ${desc ? `<div class="node-desc">${desc}</div>` : ''}
  </div>`;

const page = ({ width, height, body, extraCss = '' }) => `<!doctype html>
<html><head><meta charset="utf-8">${googleFonts}<style>${baseCss}${extraCss}
  #canvas { width: ${width}px; height: ${height}px; }
</style></head><body>${body}</body></html>`;

/* Linear flow: numbered nodes left-to-right, optional dashed feedback return. */
const flowHtml = ({ title, subtitle, steps, feedback, footer, width = 1600, height = 620 }) => {
  const row = steps
    .map((step, index) => nodeHtml({ ...step, number: index + 1 }))
    .join(arrowRight());
  const feedbackSvg = feedback
    ? `<div class="feedback-band">
        <svg width="100%" height="76" viewBox="0 0 1472 76" preserveAspectRatio="none" fill="none">
          <path d="M1398 4v34H86v-34" stroke="${COLORS.slate}" stroke-width="2.5" stroke-dasharray="9 7" fill="none"/>
          <path d="M79 16l7-14 7 14z" fill="${COLORS.slate}"/>
        </svg>
        <div class="feedback-label">${feedback}</div>
      </div>`
    : '';
  return page({
    width,
    height,
    extraCss: `
      .flow-wrap { width: 100%; }
      .flow-row { display: flex; align-items: stretch; }
      .feedback-band { position: relative; margin-top: 6px; }
      .feedback-label {
        position: absolute; top: 42px; left: 50%; transform: translateX(-50%);
        font-size: 19px; color: ${COLORS.slate}; background: #fff; padding: 0 16px;
      }
    `,
    body: `<div id="canvas">
      <div class="diagram-title">${title}</div>
      <div class="diagram-subtitle">${subtitle}</div>
      <div class="diagram-body"><div class="flow-wrap">
        <div class="flow-row">${row}</div>
        ${feedbackSvg}
      </div></div>
      <div class="diagram-footer">${footer}</div>
    </div>`
  });
};

/* Loop: 3x2 boustrophedon with a dashed return to step 1. */
const loopHtml = ({ title, subtitle, steps, loopLabel, footer, width = 1600, height = 740 }) => {
  const [a, b, c, d, e, f] = steps.map((step, index) => nodeHtml({ ...step, number: index + 1 }));
  const downArrow = `<svg width="24" height="40" viewBox="0 0 24 40" fill="none">
      <path d="M12 2v28" stroke="${COLORS.slate}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M5 26l7 12 7-12z" fill="${COLORS.slate}"/>
    </svg>`;
  const upDashed = `<svg width="24" height="40" viewBox="0 0 24 40" fill="none">
      <path d="M12 38V10" stroke="${COLORS.slate}" stroke-width="2.5" stroke-dasharray="8 6" stroke-linecap="round"/>
      <path d="M5 14l7-12 7 12z" fill="${COLORS.slate}"/>
    </svg>`;
  const leftArrow = `<div class="arrow"><svg width="36" height="24" viewBox="0 0 36 24" fill="none">
      <path d="M34 12H8" stroke="${COLORS.slate}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 5l-9 7 9 7z" fill="${COLORS.slate}"/>
    </svg></div>`;
  return page({
    width,
    height,
    extraCss: `
      .loop-wrap { width: 100%; }
      .loop-row { display: flex; align-items: stretch; }
      .loop-mid { display: flex; justify-content: space-between; padding: 0 218px; height: 48px; align-items: center; }
      .loop-mid .loop-label { font-size: 19px; color: ${COLORS.slate}; }
      .loop-mid > div { display: flex; align-items: center; gap: 14px; }
    `,
    body: `<div id="canvas">
      <div class="diagram-title">${title}</div>
      <div class="diagram-subtitle">${subtitle}</div>
      <div class="diagram-body"><div class="loop-wrap">
        <div class="loop-row">${a}${arrowRight()}${b}${arrowRight()}${c}</div>
        <div class="loop-mid">
          <div>${upDashed}<span class="loop-label">${loopLabel}</span></div>
          <div>${downArrow}</div>
        </div>
        <div class="loop-row">${f}${leftArrow}${e}${leftArrow}${d}</div>
      </div></div>
      <div class="diagram-footer">${footer}</div>
    </div>`
  });
};

/* Boundary: what runs inside the approved boundary vs control plane vs evidence. */
const boundaryHtml = ({ title, subtitle, footer, width = 1600, height = 960 }) =>
  page({
    width,
    height,
    extraCss: `
      .boundary-wrap { width: 100%; display: flex; flex-direction: column; gap: 0; }
      .boundary-top { display: flex; justify-content: flex-end; padding: 0 60px 0 0; }
      .boundary-top .node { flex: 0 0 460px; }
      .control-link { display: flex; justify-content: flex-end; padding-right: 270px; height: 74px; position: relative; }
      .control-label {
        position: absolute; right: 330px; top: 22px;
        font-size: 19px; color: ${COLORS.slate};
      }
      .boundary-box {
        border: 2.5px dashed ${COLORS.teal};
        border-radius: 24px;
        background: ${COLORS.tealSoft};
        padding: 58px 36px 36px;
        position: relative;
      }
      .boundary-box .boundary-tag {
        position: absolute; top: -21px; left: 44px;
        background: #ffffff; border: 2px solid ${COLORS.teal}; border-radius: 999px;
        color: ${COLORS.teal}; font-weight: 600; font-size: 20px;
        padding: 7px 22px;
      }
      .boundary-inner { display: flex; align-items: stretch; }
      .evidence-link { display: flex; justify-content: center; height: 74px; position: relative; }
      .evidence-label {
        position: absolute; left: calc(50% + 30px); top: 24px;
        font-size: 19px; color: ${COLORS.gold};
      }
      .evidence-row { display: flex; justify-content: center; }
      .evidence-row .node { flex: 0 0 640px; }
    `,
    body: `<div id="canvas">
      <div class="diagram-title">${title}</div>
      <div class="diagram-subtitle">${subtitle}</div>
      <div class="diagram-body"><div class="boundary-wrap">
        <div class="boundary-top">${nodeHtml({
          title: 'Cloud coordination',
          desc: 'Job coordination and health signals only',
          role: 'slate'
        })}</div>
        <div class="control-link">
          <span class="control-label">Control plane only &mdash; no clinical data crosses</span>
          <svg width="24" height="74" viewBox="0 0 24 74" fill="none">
            <path d="M12 2v54" stroke="${COLORS.slate}" stroke-width="2.5" stroke-dasharray="8 6"/>
            <path d="M5 52l7 14 7-14z" fill="${COLORS.slate}"/>
          </svg>
        </div>
        <div class="boundary-box">
          <span class="boundary-tag">Your approved boundary</span>
          <div class="boundary-inner">
            ${nodeHtml({ title: 'Healthcare team and data', desc: 'Source data stays where it is captured' })}
            <div class="arrow"><svg width="44" height="24" viewBox="0 0 44 24" fill="none">
              <path d="M8 12h28" stroke="${COLORS.teal}" stroke-width="2.5"/>
              <path d="M12 5l-9 7 9 7z" fill="${COLORS.teal}"/>
              <path d="M32 5l9 7-9 7z" fill="${COLORS.teal}"/>
            </svg></div>
            ${nodeHtml({ title: 'Edge / on-prem AI workers', desc: 'Workloads run inside the boundary' })}
          </div>
        </div>
        <div class="evidence-link">
          <svg width="24" height="74" viewBox="0 0 24 74" fill="none">
            <path d="M12 2v54" stroke="${COLORS.gold}" stroke-width="2.5"/>
            <path d="M5 52l7 14 7-14z" fill="${COLORS.gold}"/>
          </svg>
          <span class="evidence-label">Evidence output</span>
        </div>
        <div class="evidence-row">${nodeHtml({
          title: 'Immutable anchoring',
          desc: 'Traceable, reviewable deployment records',
          role: 'gold'
        })}</div>
      </div></div>
      <div class="diagram-footer">${footer}</div>
    </div>`
  });

/* Brand og card for social previews on non-product routes. */
const ogCardHtml = ({ width = 1200, height = 630 }) =>
  page({
    width,
    height,
    extraCss: `
      #canvas { align-items: center; justify-content: center; gap: 26px; padding: 64px; }
      #canvas::after {
        content: ''; position: absolute; left: 0; right: 0; top: 0; height: 10px;
        background: ${COLORS.teal};
      }
      .og-mark { width: 148px; height: 148px; filter: brightness(1.08) contrast(1.02); }
      .og-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 84px; letter-spacing: -0.02em; }
      .og-motto { font-size: 32px; color: ${COLORS.muted}; }
      .og-domain { font-size: 26px; color: ${COLORS.teal}; font-weight: 600; }
    `,
    body: `<div id="canvas">
      <img class="og-mark" src="data:image/png;base64,${readFileSync(LOGO).toString('base64')}" alt="">
      <div class="og-name">SmartClover</div>
      <div class="og-motto">Healthcare AI for screening workflows and research</div>
      <div class="og-domain">smartclover.ro</div>
    </div>`
  });

const DIAGRAMS = [
  {
    out: path.join(OUT_DIAGRAMS, 'cerviguard-workflow-flow_v2.png'),
    width: 1600,
    height: 620,
    html: flowHtml({
      title: 'CerviGuard screening workflow',
      subtitle: 'From case intake to clinician-led follow-up',
      steps: [
        { title: 'Structured case intake', desc: 'De-identified images and clinical notes' },
        { title: 'AI-assisted review', desc: 'Image signals with confidence context' },
        { title: 'Clinician review', desc: 'Context check and final judgment' },
        { title: 'Triage coordination', desc: 'Risk-based prioritization' },
        { title: 'Follow-up tracking', desc: 'Plans, status, and case history' }
      ],
      feedback: 'Outcomes feed workflow improvement',
      footer: 'SmartClover SRL &middot; CerviGuard'
    })
  },
  {
    out: path.join(OUT_DIAGRAMS, 'datagems-workflow-flow_v2.png'),
    width: 1600,
    height: 620,
    html: flowHtml({
      title: 'DataGems synthetic-data workflow',
      subtitle: 'A governed pipeline from schema to reviewable export',
      steps: [
        { title: 'Schema design', desc: 'Fields, structure, research purpose' },
        { title: 'Generation setup', desc: 'Instructions, record count, settings' },
        { title: 'Distributed generation', desc: 'Configured peers produce records' },
        { title: 'Human review', desc: 'Quality checks and suitability limits' },
        { title: 'Export package', desc: 'JSON/CSV for analytics and testing', role: 'gold' }
      ],
      footer: 'SmartClover SRL &middot; DataGems'
    })
  },
  {
    out: path.join(OUT_DIAGRAMS, 'healthcare-cyber-resilience-loop_v2.png'),
    width: 1600,
    height: 740,
    html: loopHtml({
      title: 'Healthcare cybersecurity and resilience loop',
      subtitle: 'A repeating cycle, not a one-time audit',
      steps: [
        { title: 'Assess environment and risks' },
        { title: 'Harden identity, access, and deployment paths' },
        { title: 'Configure partner security products' },
        { title: 'Automate monitoring and evidence collection' },
        { title: 'Remediate findings' },
        { title: 'Review evidence and improve procedures', role: 'gold' }
      ],
      loopLabel: 'The cycle repeats',
      footer: 'SmartClover SRL &middot; Security and resilience services'
    })
  },
  {
    out: path.join(OUT_DIAGRAMS, 'cloud-on-edge-boundary_v2.png'),
    width: 1600,
    height: 960,
    html: boundaryHtml({
      title: 'Permissioned cloud-on-edge deployment',
      subtitle: 'What stays inside your boundary, and what does not',
      footer: 'SmartClover SRL &middot; Cloud-on-edge deployment'
    })
  },
  {
    out: path.join(OUT_DIAGRAMS, 'rollout-onboarding-flow_v2.png'),
    width: 1600,
    height: 620,
    html: flowHtml({
      title: 'How a SmartClover rollout is activated',
      subtitle: 'From qualification to operational handoff',
      steps: [
        { title: 'Qualification', desc: 'Scope, fit, and requirements' },
        { title: 'Security and legal review', desc: 'RFQ, DPA, and deployment scoping' },
        { title: 'Environment readiness', desc: 'Boundary, access, and configuration' },
        { title: '30/60/90 activation', desc: 'Staged onboarding with checkpoints' },
        { title: 'Operational handoff', desc: 'Support and review cadence', role: 'ink' }
      ],
      footer: 'SmartClover SRL &middot; Procurement and onboarding'
    })
  },
  {
    out: path.join(OUT_DIAGRAMS, 'research-evidence-flow_v2.png'),
    width: 1600,
    height: 620,
    html: flowHtml({
      title: 'Healthcare AI research, tied to evidence',
      subtitle: 'How SmartClover keeps research claims reviewable',
      steps: [
        { title: 'Research question', desc: 'Grounded in screening practice' },
        { title: 'Source-linked evidence', desc: 'PubMed records and field data' },
        { title: 'Clinical review', desc: 'Human judgment on findings' },
        { title: 'Published record', desc: 'Citable, inspectable output', role: 'gold' }
      ],
      footer: 'SmartClover SRL &middot; Research'
    })
  },
  {
    out: path.join(OUT_OG, 'brand-card_v1.png'),
    width: 1200,
    height: 630,
    html: ogCardHtml({})
  }
];

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1700, height: 1400 } });
const pageHandle = await context.newPage();

for (const diagram of DIAGRAMS) {
  await pageHandle.setContent(diagram.html, { waitUntil: 'networkidle' });
  await pageHandle.evaluate(() => document.fonts.ready);
  await pageHandle.waitForTimeout(250);
  const buffer = await pageHandle.locator('#canvas').screenshot();
  await sharp(buffer).resize({ width: diagram.width }).png({ compressionLevel: 9 }).toFile(diagram.out);
  console.log('rendered', path.relative(ROOT, diagram.out));
}

await browser.close();
