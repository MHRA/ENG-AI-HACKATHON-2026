# MHRA AI Hackathon

Date: 18th June 2026 | Location: RMS Hub | Organised by: Version 1 / Department for Science, Innovation and Technology (DSIT) in partnership with MHRA

Welcome. This repository contains everything you need for the day.

---

## What this is

A one-day event where cross-functional teams build AI-assisted prototypes against real MHRA problems. You will use AI coding assistants — GitHub Copilot, Claude Code — to build as far as you can in the time available.

This is not a polished delivery sprint. It is a focused proof-of-concept day. A working prototype that demonstrates one core idea clearly is a better outcome than an ambitious build that does not run.

---

## The day

| Time | Activity | Location |
|---|---|---|
| 09:30 – 10:00 | Introduction and icebreaker | RMS Hub |
| 10:00 – 12:30 | Problem definition and team working | RMS Hub |
| 12:30 – 13:15 | Lunch | RMS Hub |
| 13:30 – 13:45 | Lightning session: model selection and token cost | RMS Hub, 10th floor |
| 13:45 – 15:45 | Build / prototype solutions | RMS Hub |
| 15:45 – 16:30 | Team playback and outcomes | RMS Hub, 10th floor |

---

## The challenges

Choose one challenge per team. 

---

### Challenge 1 — OpenAPI Codegen Repository

The problem: OpenAPI spec files are scattered across projects. Setting up TypeScript code generation from scratch takes hours and is inconsistent between teams.

Build: A GitHub repository with Actions that automatically runs TypeScript codegen from OpenAPI specs. It bundles the output into npm packages and publishes them to the MHRA npm registry on GitHub.

Minimum viable product (MVP): Repo exists. A committed `.yaml` spec triggers an Action that generates TypeScript types and publishes a package.

Stretch: Change detection (only runs for modified specs), semantic versioning determined automatically from spec diff.

Why it matters: Contract-driven development becomes the path of least resistance. CT AI and SPEED teams can adopt this immediately.

---

### Challenge 2 — MuleSoft API replacement spike

The problem: Sentinel runs a MuleSoft 3.9 API layer with 27 services. It adds licensing cost and slows iteration. You need to prove the replacement pattern before committing to a full migration.

Build: A NestJS / TypeScript replacement for the Address service pair. Create, read, update and delete (CRUD) endpoints, OpenAPI/Swagger auto-generation, standard routing and data transfer object (DTO) structure, connectivity to Azure SQL via the `mssql` npm package.

MVP: Address API with CRUD endpoints and Swagger docs running locally. Mocked Azure SQL responses are acceptable if live connectivity is not achievable on the day.

Stretch: Implement a second service (e.g. Product) to validate the pattern. Document a repeatable migration playbook.

Why it matters: A proven pattern reduces migration risk. One playbook covers 26 remaining services.

---

### Challenge 3 — AI Pharmacovigilance drug-drug interaction (DDI) detection

The problem: Cancer patients on microtubule-targeting agents may face drug-drug interactions with anaesthetic agents. Relevant signals may exist in Yellow Card data but are undetectable at scale with current tools.

Build: A pipeline using Synapse, Serverless SQL, PySpark, and Azure OpenAI to filter Yellow Card Parquet files for relevant drugs and MedDRA terms. Extract structured insights from free-text narratives and output a filtered dataset with JSON extractions.

MVP: Hardcoded SQL filter on Yellow Card data, PySpark user-defined function (UDF) calling Azure OpenAI with strict JSON schema, basic MicroStrategy or notebook visualisation of results.

Stretch: Abstract the notebook to work with different drug/term sets. Generate boilerplate test frameworks using AI assistants.

Why it matters: Earlier detection of anaesthesia-related risks directly improves patient safety.

---

### Challenge 4 — Document intelligence and semantic search

The problem: Large volumes of PDFs migrated from Documentum are keyword-searchable only. Contextual or semantic queries return poor results.

Build: A Fabric-based pipeline that reads PDFs from Blob Storage, chunks text, generates embeddings, and stores vectors in Postgres. It then enables semantic search via a basic user interface (UI) or API endpoint.

MVP: End-to-end pipeline working. A natural language query returns relevant document chunks.

Stretch: Frontend UI with keyword and semantic search combined. Filter by auto-generated document keywords.

Why it matters: Unlocks value from unstructured documents. Reduces dependence on third-party document intelligence vendors.

---

### Challenge 5 — Test failure intelligence assistant

The problem: Diagnosing test failures requires significant manual effort — reading logs, identifying root causes, writing up findings. This slows continuous integration and deployment (CI/CD) pipelines and increases quality assurance (QA) overhead.

Build: An AI assistant that monitors a test run, detects failures, passes logs to a large language model (LLM) for automated analysis, and posts a structured diagnosis to Teams, Slack, or email.

MVP: Test framework runs, detects a failure, sends logs to AI, and posts the diagnosis to a channel automatically.

Stretch: Auto-create a Jira defect from the AI diagnosis. Append AI-generated comments to an existing Jira ticket.

Why it matters: Faster feedback loops reduce developer wait time and improve CI/CD throughput.

---

## Rules

1. Use AI coding assistants. This is the point of the day. Using one is mandatory, not optional.
2. Build against your chosen challenge brief. Do not pivot to an unrelated idea mid-session.
3. Capture AI assessment data. Fill in the tracking table below. Judges will ask about it.
4. MVP first, stretch goals second. A working small thing beats a broken ambitious thing.
5. No real patient data. Use synthetic or mocked data. If you are unsure, ask a facilitator.
6. You own your code. Make sure you can present your work by the end of the day.

---

## AI assessment tracking

Every team must complete this table and include it in their playback. It is part of the judging criteria.

### Qualitative evidence

| AI contribution type | What happened | Tool used |
|---|---|---|
| Boilerplate generation | | |
| Contextual problem solving / debugging | | |
| Refactoring | | |

### Quantitative metrics

| Metric | Your estimate |
|---|---|
| Estimated hours saved vs. manual coding to reach MVP | |
| Approximate % of AI-generated code merged without significant rework | |
| Average minutes spent unblocking errors via AI prompting | |
| Developer Experience score (1–5) — how well did the AI fit your workflow? | |

---

## Playback format

Each team presents for 8 minutes, followed by 3 minutes of judge questions.

Cover these points:

1. What we built — one sentence, then a demo or walkthrough.
2. How AI helped — two or three specific examples from your assessment table.
3. What surprised us — where the AI performed better or worse than expected.
4. What comes next — one concrete next step if this prototype were to continue.

Slides are optional. A live demo or code walkthrough works better.

---

## Repository structure

```
/
├── README.md                  ← this file
├── challenge-1-openapi/       ← team 1 work
├── challenge-2-mulesoft/      ← team 2 work
├── challenge-3-pharmacovig/   ← team 3 work
├── challenge-4-doc-intel/     ← team 4 work
├── challenge-5-test-intel/    ← team 5 work
└── resources/
    └── ai-assessment-template.md
```

---

## Questions on the day

Speak to a FDE. Do not wait — if you have an environment or access blocker, raise it immediately. Time is the one thing you cannot recover.
