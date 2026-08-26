---
title: "TealGuard is officially in implementation: building sovereign AI for gynecologic oncology"
slug: "tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology"
date: "2026-08-26"
author: "Andreea Damian and the SmartClover team"
excerpt: "The financing contract is signed. Over the next 36 months, the HIPERDIA–SmartClover consortium will mature TealGuard from TRL 6 to TRL 9, validate it in real clinical settings, and measure its contribution to better screening processes, patient navigation and continuity of care."
cover_image: "tealguard-platform-modules.png"
tags:
  - TealGuard
  - Artificial Intelligence
  - Deep Tech
  - Women's Health
  - Gynecologic Oncology
  - STEP
  - Digital Health
---

<!--
PUBLISHING REQUIREMENT:
Before publication, add the mandatory EU / Government of Romania / MIPE / Programul Sanatate visual-identity strip and funding statement in the page template, in accordance with the applicable visual identity manual.
Keep the three PNG assets in the same directory as this Markdown file, or update the relative image paths below.
-->

# TealGuard is officially in implementation: building sovereign AI for gynecologic oncology

On 19 August 2026, Financing Contract no. **108809/19.08.2026** was signed for **TealGuard — Intelligent platform for personalised management in gynecologic oncology**. The signature turns a technically ambitious proposal into a 36-month research, engineering, clinical-validation and production-readiness programme.

The project is implemented by a consortium led by **HIPERDIA**, with **SmartClover** as the artificial-intelligence and deep-tech partner. Its total value is **RON 17,618,140.27**, of which **RON 17,355,115.27** is eligible expenditure and up to **RON 11,297,237.07** represents non-refundable funding through the European Regional Development Fund.

For me and for our team, this is not a finish line. It is the point at which every technical claim must become an auditable result.

> Signing the contract does not prove that TealGuard works. It gives us the mandate, resources and accountability to prove it — clinically, technically and operationally.
>
> — **Andreea Damian**, founder and CEO, SmartClover

## Why TealGuard exists

Cervical-cancer prevention is not a single test or appointment. It is a chain of interdependent steps: correct information, access to screening, technically valid data acquisition, appropriate referral, understandable communication, timely follow-up and continuity of care.

A failure at any point can weaken the entire pathway. An image may be unusable. A woman may not understand the next step. A referral may not be visible in the hospital information system. A reminder may arrive too late. A critical piece of equipment may become unavailable during a screening campaign.

The [World Health Organization's cervical-cancer elimination strategy](https://www.who.int/initiatives/cervical-cancer-elimination-initiative) reflects this systems perspective: vaccination, effective screening and access to appropriate treatment must work together. European guidance likewise places strong emphasis on evidence-based screening and quality assurance across the full care pathway.

TealGuard is designed for that operational reality. It does not attempt to replace clinical protocols, medical judgment or regulated screening programmes. It aims to make selected processes more consistent, traceable, interoperable and resilient.

Its wider scope covers cervical and ovarian cancer management, while the first operational pathway is centred on cervical prevention, screening support, navigation and follow-up. The platform begins from the existing **CerviGuard TRL 6 prototype** and is intended to reach **TRL 9** through integration, prospective validation and production operation.

![TealGuard platform: four integrated modules across the clinical pathway](tealguard-platform-modules.png)

*Figure 1. Public architecture of the four TealGuard modules. The platform supports clinical and operational processes; responsibility for medical decisions remains with qualified professionals.*

## Four modules, one coherent pathway

### ColVisionAI: better data at the point of acquisition

**ColVisionAI** is an offline-first mobile component intended to support medical and paramedical teams during cervical-screening workflows. It combines structured data capture, image-quality assessment and explicit process rules to identify technically inadequate acquisitions — for example, insufficient illumination, blur or incomplete framing.

Its role is deliberately bounded. It provides technical and workflow feedback, not autonomous diagnosis. The clinician remains responsible for interpretation and medical action.

The research programme will evaluate compact computer-vision models suitable for mobile and edge devices, including model compression and controlled updates without moving raw patient data away from its source.

### NavigatorAI: consistent, understandable guidance

**NavigatorAI** supports medical navigators and operational teams with prevention education, logistics, preparation instructions, appointment-related questions and approved communication templates.

The module is built around grounded generative AI and small language models, not unrestricted conversation. Answers must be derived from approved knowledge sources, remain traceable, and trigger human escalation when a request is uncertain or outside the permitted scope — particularly when a user asks for diagnosis or treatment advice.

### Follow-upAI: reducing friction after screening

**Follow-upAI** is designed to support continuity after screening or after a finding that requires further monitoring. It structures reminders, appointments, preparation checklists, confirmations and escalation queues for cases at risk of being lost to follow-up.

The module will combine protocol-based rules with statistical models that support prioritisation. It will also provide an interoperability layer using **HL7 FHIR** and controlled APIs so that relevant events can be integrated with existing hospital information systems rather than creating a parallel, isolated workflow.

### EcoAI: keeping the clinical infrastructure available

**EcoAI** addresses a less visible but important part of care delivery: whether the equipment and operational capacity required by a programme are available when needed.

The module will analyse technical telemetry and utilisation patterns to support predictive maintenance, service planning, capacity balancing and resource efficiency for ultrasound equipment and associated infrastructure. It has an operational role and does not make clinical decisions.

## Deep tech constrained by clinical reality

TealGuard is not an undifferentiated “AI platform”. Different problems require different mechanisms.

Some functions are primarily **non-agentic**: deterministic workflows, interoperability connectors, access control, image-quality rules, audit trails and explicit escalation conditions. Other functions use **bounded agentic behaviour**: for example, assembling the next operational steps for a navigator or proposing a follow-up action inside an approved workflow.

The boundary matters. No component should autonomously extend its role from process support into diagnosis or therapy. Agentic behaviour is useful only when its domain, tools, data access, stopping conditions and human-approval points are explicit.

![Selected deep-tech architecture of TealGuard](tealguard-deep-tech-architecture.png)

*Figure 2. Selected deep-tech components. Detailed model topologies, security configurations, risk thresholds and deployment internals are intentionally omitted.*

The main technical directions include:

- **On-device, on-premises and edge inference**, including offline-first operation where connectivity is limited.
- **Multimodal AI**, combining image analysis, structured clinical events, operational data and approved knowledge sources.
- **Neuro-symbolic controls**, where learned models are constrained by explicit technical or procedural rules.
- **Small language models and grounded GenAI**, with source control, guardrails, monitoring and human escalation.
- **Federated learning**, so that model improvement can be studied without centralising raw clinical data; homomorphic-encryption methods will be evaluated where proportionate and technically justified.
- **Encrypted local data handling**, data minimisation, controlled anonymisation and role-based access.
- **Immutable evidence for critical events**, using cryptographic fingerprints and audit records rather than placing identifiable medical data on a public ledger.
- **HL7 FHIR interoperability**, enabling controlled integration with existing clinical systems.
- **EU-first deployment controls**, with a project target of zero raw patient-data transfer to public non-EU cloud infrastructure.

This architecture is intended to reduce dependency on external cloud and proprietary infrastructure without sacrificing interoperability. Sovereignty, in this context, does not mean technological isolation. It means retaining control over data, deployment, auditability and the ability to move between compliant infrastructure options.

## What success will be measured against

The following are **contractual targets and validation commitments**, not results already achieved:

1. **Technology maturity:** progression from a validated TRL 6 prototype to an integrated TRL 7 system, prospective TRL 8 validation and production-level TRL 9 operation.
2. **Prospective validation:** inclusion of **100–200 women** in the TRL 8 prospective validation programme, under the applicable ethical, clinical and data-protection framework.
3. **Production-scale use:** at least **1,000 women assisted** through TealGuard services or functions at TRL 9 across prevention, screening support or follow-up pathways.
4. **Multi-site implementation:** five HIPERDIA implementation locations in Romania, complemented by SmartClover's R&D implementation site in Cluj-Napoca, with a formal STEP target of at least **three implemented clinical locations** and **one validated HL7 FHIR/HIS integration**.
5. **Sovereign operation:** **four on-edge applications** and a target of **zero raw patient data transferred to public non-EU cloud infrastructure**.
6. **Research and capability:** creation of **10 full-time-equivalent jobs**, together with planned outputs of **two public datasets, two open-weight models and two open-access publications**, where ethics, privacy, intellectual property and regulatory requirements permit publication.

![TealGuard contractual implementation and impact targets](tealguard-impact-roadmap.png)

*Figure 3. The principal maturity, implementation, clinical-validation, sovereignty and open-science targets against which the project will be monitored.*

These indicators are important because they force us to distinguish ambition from evidence. We will not describe an algorithm as clinically useful because it performs well in a laboratory benchmark. It must work within real workflows, with real constraints, across different locations and users, while preserving safety, traceability and data protection.

## Evidence before claims

The project will evaluate performance at several levels:

- technical quality, reliability, latency and robustness;
- usability and comprehensibility for clinical and operational users;
- adherence to permitted use and the effectiveness of GenAI guardrails;
- interoperability with existing systems;
- patient-pathway indicators such as timeliness, attendance and continuity;
- infrastructure availability and operational efficiency;
- privacy, cybersecurity, auditability and regulatory-readiness evidence.

The regulatory programme is structured toward a Software-as-a-Medical-Device pathway and the intended MDR Class I positioning described in the project documentation. That positioning is a development target, not a claim that conformity assessment or CE marking has already been completed. Final classification and conformity will follow the applicable legal and technical process.

## What we are deliberately not disclosing yet

Transparency does not require publishing every technical or operational detail before it is safe and responsible to do so.

At this stage, we are not publishing the detailed composition of training and validation datasets, model topologies, risk thresholds, security architecture, key-management mechanisms, deployment topology, internal clinical procedures or unreleased source code.

We do intend to publish methods, evidence and selected research outputs when this is compatible with patient privacy, ethics approvals, intellectual-property strategy, cybersecurity and the regulatory path. The objective is meaningful scientific transparency, not disclosure theatre.

## From proposal to accountable execution

The contract defines a 36-month route from research and integration to prospective validation and production operation. HIPERDIA contributes the clinical environment, medical expertise and multi-site implementation capacity. SmartClover contributes the AI research, software engineering, distributed-computing architecture, interoperability work and productisation capability required to turn a prototype into a dependable system.

The work ahead is substantial: specifications, procurement, data governance, dataset preparation, model development, integration, security testing, clinical validation, regulatory evidence and operational deployment. Each stage can invalidate assumptions made at the previous one. That is precisely why the project has been structured as research and validation rather than as a premature product claim.

For the SmartClover team, TealGuard is also a test of a broader conviction: Europe can build medical AI that is technically ambitious without surrendering control of sensitive data, and commercially relevant without weakening scientific or clinical discipline.

We now have the responsibility to demonstrate that conviction with evidence.

— **Andreea Damian and the SmartClover team**

## Project and funding information

- **Project:** TealGuard — Intelligent platform for personalised management in gynecologic oncology
- **SMIS code:** 358561
- **Financing contract:** no. 108809/19.08.2026
- **Implementation period:** 36 months
- **Consortium:** HIPERDIA SA — lead partner; SmartClover SRL — project partner
- **Total project value:** RON 17,618,140.27
- **Total eligible value:** RON 17,355,115.27
- **Maximum non-refundable funding:** RON 11,297,237.07
- **Programme:** Health Programme 2021–2027, Priority 9, Specific Objective RSO1.6, Action B
- **Fund:** European Regional Development Fund

The project is co-financed by the European Union through the European Regional Development Fund under the Health Programme 2021–2027.

Official programme context:

- [Strategic Technologies for Europe Platform — Regulation (EU) 2024/795](https://eur-lex.europa.eu/eli/reg/2024/795/oj/eng)
- [Health Programme, Priority 9, Action B — Ministry of European Investments and Projects](https://mfe.gov.ro/ghiduri-ms/prioritatea_9_actiunea_b_step/)
- [WHO Cervical Cancer Elimination Initiative](https://www.who.int/initiatives/cervical-cancer-elimination-initiative)
- [European cervical-cancer guidelines and quality assurance](https://cancer-screening-and-care.jrc.ec.europa.eu/en/ec-cvc/european-cervical-cancer-guidelines)

> **Development-status notice:** TealGuard is under research, development and validation. The platform is not presented here as a currently certified medical device, and it does not replace professional medical advice, diagnosis, treatment or applicable clinical guidelines. All numerical values described as targets are project commitments, not completed outcomes.
