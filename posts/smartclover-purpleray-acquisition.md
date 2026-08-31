---
title: "SmartClover acquires PurpleRay: making healthcare cybersecurity testable"
date: 2026-08-03
updated: 2026-08-30
author: "Andreea Damian and the SmartClover team"
category: "Cybersecurity Evidence"
summary: "The acquisition adds a local-first purple-team platform, a controlled laboratory and an open-source SBOM foundation to SmartClover's healthcare AI and research portfolio."
tags:
  - PurpleRay
  - cybersecurity
  - healthcare AI
  - purple teaming
  - SBOM
  - software supply chain
---

# SmartClover acquires PurpleRay: making healthcare cybersecurity testable

*Published 3 August 2026 · Updated 30 August 2026*

Healthcare AI cannot be considered secure because it was designed with good intentions. It has to be examined: component by component, permission by permission and incident by incident.

Under an acquisition agreement signed on 3 August 2026, SmartClover acquired **PurpleRay** — a local-first purple-team ecosystem combining software supply-chain analysis, controlled security experiments, operator education and an evidence-centred orchestration layer.

This is not a detour from our healthcare work. It closes an important gap.

SmartClover's portfolio is already built around inspectable workflows. [CerviGuard](https://smartclover.ro/cerviguard) supports clinician-led cervical-screening operations. [TealGuard](https://smartclover.ro/blog/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology) extends that foundation through a 36-month research, engineering and clinical-validation programme for sovereign multimodal AI in gynecologic oncology. [DataGems](https://smartclover.ro/blog/datagems-synthetic-data-workflows) makes synthetic-data work reviewable, while [NIS2COMPASS](https://smartclover.ro/blog/nis2compass-verifiable-cybersecurity-proof) links cybersecurity activity to structured evidence.

Across these projects, the same questions recur: **What runs where? What data moves? Who authorised an action? What evidence supports the conclusion? Who remains accountable?**

PurpleRay gives us a controlled environment in which those questions can be tested, not merely documented.

![PurpleRay's role as an assurance layer across SmartClover's healthcare AI, research and cybersecurity work.](images/01-smartclover-purpleray-assurance-layer.png)

*Figure 1. PurpleRay connects software inventory, authorised exercises, defensive observation and human review around SmartClover's clinical products and applied research.*

## From disconnected tools to a defensible chain

Most organisations do not lack security tools. The break usually appears between them: the approved scope sits in one place, the active test in another, defensive telemetry elsewhere, and the conclusion is reconstructed later.

PurpleRay is designed around this missing chain. Work begins with explicit authority. Tests and observations remain within that boundary. Evidence is recorded as the engagement unfolds, reviewed by named people and carried into reporting and remediation.

Local-first operation matters in healthcare. Network maps, vulnerability findings and test evidence can be nearly as sensitive as clinical information. PurpleRay is intended to keep that material under the operator's control, including in segmented or disconnected environments.

Its laboratory adds a practical education layer. Teams can repeat controlled attack-and-defence scenarios, inspect what their controls actually recorded, and learn without turning a hospital's production environment into a classroom.

## The open-source foundation stays open

![PurpleRay SBOM Analyzer 1.3.0 dashboard after an offline scan of a synthetic application folder.](images/02-purpleray-sbom-analyzer-dashboard.png)

*Figure 2. The open-source PurpleRay SBOM Analyzer running locally. The screenshot was captured from the public v1.3.0 release using a synthetic folder; no customer data or online advisory lookup was used.*

The [PurpleRay SBOM Analyzer](https://github.com/aidamian/PurpleRay_SBOM_Analyzer) is the public foundation: a native desktop application that inventories local software and generates deterministic CycloneDX 1.7 SBOMs. It operates offline by default, never executes files from the selected folder, keeps unsupported or partially parsed artefacts visible, and can compare retained scans. An OSV.dev lookup is available only when the operator explicitly requests it.

For healthcare software, this is basic but consequential. A team cannot reason about vulnerable dependencies, supplier exposure or release drift until it knows what the software contains.

**The Analyzer remains open source under the Apache License 2.0.** The acquisition does not narrow those rights.

## PurpleRay CCC and the controlled laboratory

The commercial layer is separate. **PurpleRay Command and Control Center (CCC)**, the orchestration and evidence workflows, SmartClover-developed integrations, product packaging and laboratory assets form the proprietary PurpleRay product.

This layer is being developed to connect software inventory, defensive observation, threat intelligence, controlled adversary emulation, human review and remediation evidence. The platform is under active development; we will continue to distinguish implemented capability from design intent.

**PurpleRay CCC and the proprietary PurpleRay product layer are Copyright © 2026 SmartClover SRL. All rights reserved.** Third-party components remain governed by their respective licences.

![CerviGuard demonstration dashboard showing the clinical workflow context around which SmartClover develops its assurance capabilities.](images/03-cerviguard-dashboard.png)

*Figure 3. CerviGuard illustrates the clinical workflow context in which SmartClover operates. PurpleRay is an engineering, testing and education capability around such systems; it is not a clinical decision-making module.*

## Why PurpleRay belongs at SmartClover

CerviGuard and TealGuard are designed around clinician control, local and edge processing, traceable workflows and sensitive data boundaries. PurpleRay does not become a clinical function inside those systems. It strengthens the engineering and assurance work around them: software inventory, deployment testing, control validation, reproducible failure analysis and team readiness.

For healthcare customers and research partners, the objective is not another badge or generic security report. It is a defensible answer to four questions:

> **What was authorised? What happened? What did the system and defenders observe? What changed as a result?**

That is PurpleRay's role inside SmartClover: helping us build healthcare AI that can not only be useful, but also challenged, tested and defended.

[Explore PurpleRay](https://purpleray.eu) · [Open the SBOM Analyzer](https://github.com/aidamian/PurpleRay_SBOM_Analyzer) · [Review SmartClover's healthcare AI portfolio](https://smartclover.ro/products)
