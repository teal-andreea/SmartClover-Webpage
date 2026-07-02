---
title: "DataGems: Synthetic Data With a Workflow Around It"
date: "2026-05-11"
excerpt: "How SmartClover is using DataGems to explore structured synthetic-data workflows, traceable generation jobs, and reviewable exports for healthcare AI research."
---

Healthcare AI teams do not only need model ideas. They need safe ways to rehearse data structure, integration logic, and review steps before sensitive data is available or appropriate.

That is the gap we are exploring with DataGems.

DataGems supports the research side of SmartClover's healthcare AI work. It helps teams shape synthetic-data workflows before real datasets can be used: define the job, draft a schema, review it, confirm generation, track progress, and export results for analysis or testing.

The practical problem is familiar. A team may need to test a dashboard, rehearse an import pipeline, prototype an analytics workflow, or decide whether a proposed schema is useful at all. Synthetic data can help with that early work when the workflow is explicit and the limits are visible.

Synthetic data is not magic, and we do not treat it as clinical proof or a way to bypass privacy review. It can preserve bias from source assumptions, miss rare cases, produce unrealistic outliers, or create false confidence if nobody evaluates it. [NIST's 2025 guidance on synthetic data and differential privacy](https://csrc.nist.gov/pubs/sp/800/226/final) is a useful reminder: privacy and utility claims need methods, tests, and context. Without that work, synthetic data should not be marketed as anonymous or automatically safe.

That is why DataGems starts with workflow instead of hype.

![DataGems workflow from schema design and generation setup through distributed generation and human review to a JSON/CSV export package.](/images/diagrams/datagems-workflow-flow_v2.png)
*A reviewable DataGems workflow keeps synthetic-data work scoped from schema definition through export.*

In the current application, a user defines a generation job with a title, description, instructions, and record count. DataGems drafts a structured schema first. The user reviews the schema before confirming the job. Once confirmed, generation can run across configured peers, with progress, timing, generated-record counts, failure counts, and peer-level status persisted for review.

When a job completes, results can be exported as JSON or CSV. That matters because synthetic data only becomes useful when teams can move it into the tools they already use: notebooks, analytics environments, test suites, dashboards, validation scripts, and internal review packs.

We are also keeping the generation layer flexible. DataGems can use its internal inference path or saved external inference profiles when a scoped research workflow requires a different model. That flexibility is useful, but it also increases the need for clear configuration, authenticated workspace access, and review. Model choice, generation instructions, and output limits should be visible.

For healthcare research, this discipline matters more than the synthetic-data label itself.

European health-data policy is moving toward more structured secondary use of health data. The [European Health Data Space](https://health.ec.europa.eu/ehealth-digital-health-and-care/reuse-health-data_en) emphasizes authorized access, secure processing environments, and responsible reuse for research and innovation. The [EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3) also raises expectations around risk management, data quality, user information, and human oversight for high-risk AI systems.

DataGems is not used to diagnose cases or direct patient care. It is a research workflow for the work that happens before and around clinical AI: defining schemas, generating structured examples, testing pipelines, and documenting what was produced. That boundary keeps the value useful without turning a research tool into an unsupported regulatory claim.

Our next direction is to make the review layer stronger. Useful synthetic-data workflows should include dataset documentation, generation summaries, utility checks, privacy-risk review, and reviewer sign-off. They should say what a dataset is good for and what it is not good for. They also need to keep synthetic records separate from evidence about real clinical performance.

For SmartClover, DataGems helps research partners make data-workflow questions concrete. The intended value is a faster path from an idea to a reviewable prototype when teams need schema discipline, traceable generation, and exportable results before sensitive data can be used.

Research teams, healthcare AI builders, and data partners who want to explore controlled synthetic-data workflows can contact SmartClover to scope a bounded research or data-workflow pilot: one schema, one synthetic dataset, reviewable export, and documented limits.

Last reviewed: 2026-05-11.
