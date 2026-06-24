# Architecture Decision: MuleSoft API Layer Replacement

**Date:** June 2026  
**Status:** Proposed (pending spike validation)  
**Decision:** Azure Container Apps + NestJS + Azure APIM  
**Scope:** Replacement of 27 MuleSoft 3.9 services (sentinel-mulesoft-repo)

---

## 1. Context

MHRA's Sentinel platform uses MuleSoft 3.9 Enterprise as the integration layer between Appian (the external portal UI) and Azure SQL Database. The MuleSoft exit is a named roadmap item (TechRoadmap MASTER 25-26) with a December 2028 supplier support deadline.

The MuleSoft layer consists of:
- **27 services** in a 3-tier pattern (Experience → System → Process APIs)
- **171 stored procedures** in Azure SQL (`DigitalServiceDataStore`)
- **Client ID enforcement** for auth (not JWT/OAuth)
- **DataWeave** transformations mapping SQL result sets to JSON
- **Appian** as the primary consumer

The business logic lives in the stored procedures, not in MuleSoft. MuleSoft is routing, transformation, and auth — replaceable middleware.

---

## 2. Decision

**Replace MuleSoft with: Azure API Management → NestJS on Azure Container Apps → Azure SQL (unchanged)**

```
Appian / External Consumers (unchanged)
         │
         ▼
┌─────────────────────────────────┐
│  Azure API Management (APIM)    │  Auth, rate limiting, routing, OpenAPI portal
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│  Azure Container Apps           │  TypeScript/NestJS container
│  ┌───────────────────────────┐  │  - 13 domain modules (address, application, etc.)
│  │  sentinel-api container   │  │  - Shared middleware (logging, tracing, errors)
│  │                           │  │  - Connection pool to Azure SQL
│  │  171 endpoints            │  │  - OpenAPI auto-generation
│  │  13 domain modules        │  │  - Horizontal autoscale via KEDA
│  └───────────────────────────┘  │
└────────────────┬────────────────┘
                 │ mssql (pooled connections)
┌────────────────▼────────────────┐
│  Azure SQL Database             │  Same 171 stored procs, unchanged
│  (DigitalServiceDataStore)      │
└─────────────────────────────────┘
```

---

## 3. Options Considered

### Option A: Azure APIM + Azure Functions (Serverless)

**Evidence for:** Documented as the pattern in RC/Clinical Trials design material. "Function Apps are the assumed runtime environment for microservices" (Clinical Trials HLD - SAMs).

**Rejected because:**

| Problem | Impact |
|---------|--------|
| **Cold starts** | Consumption plan: 1-5s latency on first request after idle. Appian users experience visible delay. Premium plan mitigates but costs ≈ App Service. |
| **Connection pooling** | Functions spin up/down unpredictably. Each instance opens new SQL connections. At 171 endpoints under load, you hit Azure SQL connection limits (max ~900 on Standard tier). |
| **Shared middleware** | Auth, logging, correlation ID propagation, error formatting — must be duplicated per function or hacked via a custom middleware layer that fights the Functions programming model. |
| **171 endpoints = 171 functions** | Management overhead: each function has its own `function.json`, scaling config, and monitoring. Deployment becomes unwieldy at this scale. |
| **Local dev experience** | `func start` with 171 functions, shared SQL pool config, and environment variables is significantly more complex than `pnpm dev`. |
| **Vendor lock-in** | `@azure/functions` SDK is Azure-specific. Rewriting to another runtime requires changing every function's entry point and bindings. |
| **Not the right workload shape** | Functions excel at event-driven, sporadic workloads (file processing, queue triggers, webhooks). This is a sustained synchronous API layer with consistent traffic during business hours. |

**When Functions ARE right:** For the future event-driven pieces (e.g. Service Bus message processing, document ingestion triggers, async notifications). These should still use Functions — this decision is specifically about the synchronous API layer.

---

### Option B: Azure APIM + NestJS on App Service

**Evidence for:** "Azure WebApp hosted on App Service plan is the preferred option for moving forward as a deployment option" (Gap Analysis - Utility Service).

**Viable but not preferred because:**

| Aspect | Assessment |
|--------|-----------|
| Works fine technically | Yes — App Service runs Node.js containers well |
| Autoscaling | Rule-based only (CPU/memory thresholds). Not as responsive as KEDA |
| Cost efficiency | Always-on (pay for provisioned capacity even at zero traffic) |
| Portability | Low — tied to App Service deployment model (not standard container orchestration) |
| Future path | Microsoft is clearly investing in Container Apps as the next evolution of App Service for containers |

**Verdict:** Would work, but Container Apps is strictly better for containerised workloads and is the direction Azure is moving.

---

### Option C: Azure APIM + Service Bus + Event-Driven

**Evidence for:** Architecture docs show Service Bus/Event Grid for "secure messaging workflows" and "real-time synchronisation" (RMS Technology Reference Architecture).

**Not applicable because:**

This is a **synchronous request/response API layer**. Appian sends a request, waits for JSON, and renders it. There is no event-driven use case here. Service Bus is for:
- Async document processing pipelines
- Cross-system notifications
- Eventual consistency patterns

None of which apply to "Appian calls GET /addresses and needs a JSON array back in <200ms."

**When Service Bus IS right:** For replacing the batch integrations (CESP file ingest, E2B message processing, ecomms letter delivery). Those are genuinely async/event-driven. This decision doesn't cover those.

---

### Option D (Selected): Azure APIM + NestJS on Azure Container Apps

**Why this wins:**

| Factor | Assessment |
|--------|-----------|
| **Right workload shape** | Sustained synchronous API — Container Apps excels here |
| **Connection pooling** | Single long-lived container with a persistent SQL pool. No cold start connection churn |
| **Shared middleware** | NestJS modules, guards, interceptors, pipes — write once, apply to all 171 endpoints |
| **Autoscaling** | KEDA-based: scales on HTTP request count, not just CPU. Can scale to zero in non-prod |
| **Local dev** | Standard `pnpm dev` — no Azure tooling required for development |
| **Portability** | Standard OCI container. Moves to AKS, AWS ECS, GCP Cloud Run, or bare metal with zero code changes |
| **Cost** | Pay-per-use with scale-to-zero option. Cheaper than always-on App Service at low traffic, scales up for peak |
| **Azure-native** | Integrates with APIM, Key Vault, Managed Identity, Azure Monitor — no departure from platform strategy |
| **Team skills** | TypeScript/Node.js — no specialist MuleSoft or Azure Functions knowledge required |
| **OpenAPI** | `@nestjs/swagger` generates OpenAPI 3.0 spec automatically from decorators. APIM imports it. |

---

## 4. Why NestJS (Framework Choice)

At 27 modules / 171 endpoints, framework structure matters. Options considered:

| | NestJS | Fastify (raw) | Hono | Express |
|--|--------|--------------|------|---------|
| Module system | Built-in | DIY | DIY | DIY |
| DI container | Built-in | Add awilix | None | None |
| OpenAPI generation | Automatic (decorators) | Plugin | Via zod | Manual |
| Validation | class-validator pipes | DIY | Zod | DIY |
| Guards/middleware | Declarative | Manual | Manual | Manual |
| Enterprise adoption | Very high | High | Growing | Declining |
| Suitability at 171 endpoints | Excellent | Requires discipline | Requires discipline | Poor |

**Decision:** NestJS (on Fastify adapter for performance). The structure it provides at this scale prevents the codebase from becoming unmaintainable as the team grows.

---

## 5. What Stays the Same

| Component | Change? | Notes |
|-----------|---------|-------|
| Azure SQL stored procedures | **No change** | All 171 procs remain — we call them from TypeScript instead of DataWeave |
| Database schema | **No change** | Same tables, same data |
| Appian front-end | **Minimal change** | Same JSON API contract. Only APIM endpoint URL changes |
| API response shapes | **No change** | TypeScript DTOs reproduce the exact JSON structure MuleSoft currently returns |
| Auth model | **Evolves** | Client ID → OAuth2 client credentials (via APIM policy). Can be done transparently |
| GBG address lookup | **No change** | HTTP call to same external service, just from TypeScript instead of DataWeave |

---

## 6. What About SABRE/SHOT?

The SHOT service (`mhra-s-shot-v1`) is a SOAP/WSDL bridge to an external system. It doesn't follow the standard pattern. Options:

1. **Wrap it** — NestJS service using `soap` npm package to call the same WSDL. Quick.
2. **Negotiate REST** — Ask SABRE team if they have/plan a REST API.
3. **Migrate last** — It works in MuleSoft today. Do the other 26 first.

Recommended: Option 3 (migrate last), then Option 1 (wrap with `soap` package). Don't let the outlier block the standard migration.

---

## 7. Migration Phasing

| Phase | Services | Approach | Estimated Effort |
|-------|----------|----------|-----------------|
| **Spike** | Address (1 service) | Prove pattern end-to-end | 1 day |
| **Phase 1** | Reference data, Contact, User Account | Simple read-heavy services | 2 days |
| **Phase 2** | Product, Application, Organisation | Complex CRUD, multiple procs per endpoint | 4 days |
| **Phase 3** | Device, Document, Payment, Correspondence, Event | Medium complexity | 3 days |
| **Phase 4** | Process APIs (p-event, p-organisation) | Orchestration | 1 day |
| **Phase 5** | SHOT/SABRE | SOAP outlier | 1 day |
| **Total** | 27 services | | ~12 developer-days |

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Azure SQL connectivity from Container Apps | Low | High | Use Private Endpoint + VNet integration (same as MuleSoft currently uses) |
| Stored proc behaviour differs from DataWeave mapping assumptions | Medium | Medium | Compare responses byte-for-byte during parallel run period |
| Appian integration breaks on URL change | Low | High | Use APIM custom domain — URL stays same, backend changes |
| Team unfamiliar with NestJS | Medium | Low | Standard TypeScript — pattern is simple (controller → service → proc call) |
| SHOT/SABRE WSDL incompatibility | Low | Low | Keep SHOT on MuleSoft until last; doesn't block other services |
| Performance regression | Low | Medium | Load test with k6 before cutover; connection pooling handles steady state |

---

## 9. Alignment with MHRA Architecture

| Principle | How This Aligns |
|-----------|----------------|
| "MuleSoft exit" roadmap item | Directly implements this |
| Azure-native platform | Container Apps + APIM + Managed Identity + Key Vault |
| Integration Replacement strategy | Replaces MuleSoft integration layer with Azure-native equivalent |
| Microservices on App Service/AKS (documented preference) | Container Apps is the managed evolution of both — Kubernetes under the hood, App Service simplicity on top |
| APIM as API gateway (RC HLD) | APIM sits in front, handles auth/routing/analytics |
| December 2028 deadline | 12 dev-days of migration work fits comfortably before deadline |

---

## 10. Decision Criteria Summary

| Criterion | Functions | App Service | Container Apps |
|-----------|-----------|-------------|----------------|
| Right for synchronous API | No | Yes | **Yes** |
| Autoscaling | Coarse | Manual | **KEDA (fine-grained)** |
| Connection pooling | Unreliable | Good | **Good** |
| Local dev simplicity | Poor | Good | **Good** |
| Portability (multi-cloud) | None | Low | **High (OCI container)** |
| Cost at steady traffic | Premium ≈ App Service | Fixed | **Pay-per-use** |
| 171 endpoint management | Painful | Fine | **Fine** |
| Azure platform alignment | Yes | Yes | **Yes** |
| Future direction (Microsoft) | Maintenance mode (Consumption) | Mature | **Active investment** |

**Decision: Azure Container Apps.**
