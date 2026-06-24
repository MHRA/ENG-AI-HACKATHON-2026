# AI Assessment — Challenge 2: MuleSoft API Layer Replacement

**Team:** MuleSoft / Sentinel API  
**Date:** 24 June 2026

---

## Qualitative Evidence

| AI contribution type | What happened | Tool used |
|---|---|---|
| Boilerplate generation | Claude Code generated all 12 NestJS domain modules (controllers, services, repositories, DTOs, and module wiring) from the MuleSoft RAML specs and DataWeave XML flows. This produced 77 TypeScript source files — covering Address, Application, Contact, Device, Document, Event, Organisation, Payment, Product, Reference, SHOT, and User Account — with correct stored procedure bindings for all 162 procs, and zero compilation errors, in a single day. | Claude Code (Claude Sonnet 4.6) |
| Contextual problem solving / debugging | Claude Code translated the DataWeave `decideStoredProc` conditional routing chains from MuleSoft XML into TypeScript service logic (e.g. the address module's 5-branch query-param router), correctly inferred `mssql` parameter types (`INT`, `NVARCHAR`, `BIT`, `DATETIME2`) from MuleSoft XML parameter declarations, and identified that the SHOT service required a distinct SOAP/WSDL pattern rather than the standard REST→proc pattern used by the other 11 modules. | Claude Code (Claude Sonnet 4.6) |
| Refactoring | After the address module spike, Claude Code extracted a reusable `BaseRepository` pattern with a shared `callProc` helper, then factored out all cross-cutting concerns — `ApiKeyGuard`, `RequestLoggingInterceptor`, `TracingInterceptor`, `CommonErrorFilter` — into a shared `common/` directory. This made the pattern consistent across all 12 modules without duplicating infrastructure code. | Claude Code (Claude Sonnet 4.6) |

---

## Quantitative Metrics

| Metric | Estimate |
|---|---|
| TypeScript source files generated | 77 |
| Lines of TypeScript produced | ~5,500 |
| Domain modules implemented | 12 (all MuleSoft services covered) |
| Stored procedures wired up | 162 across 12 domains |
| Time to complete full implementation | 1 day |
| Estimated time without AI assistance | 8 developer-days (per HACKATHON.md estimate of ~62 hrs) |
| Time saving | ~75–80% |
| Compilation errors at end of day | 0 |
| Test spec files produced | 5 (60+ passing tests in address module alone) |

---

## Playback Notes

### What we built
A NestJS/TypeScript replacement for the entire 27-service MuleSoft 3.9 API layer — all 12 domain modules, routing to the same 162 Azure SQL stored procedures, running in a single containerised app.

### How AI helped (from the table above)
1. **Boilerplate generation** — generated 77 TypeScript files with correct proc bindings for all 12 modules from MuleSoft RAML/XML specs in a single day, instead of writing each controller/service/repository by hand.
2. **Contextual problem solving** — translated DataWeave routing logic to TypeScript without manual XML parsing, and correctly identified the SHOT module as a structural outlier requiring a different approach.
3. **Refactoring** — extracted the repeatable `BaseRepository` pattern after the first module, meaning modules 2–12 inherited it for free.

### What surprised us
- AI performed **better than expected** on boilerplate generation at scale: 12 modules in one day far exceeded the initial estimate of 2–4 hours per service. The key was giving Claude Code the RAML specs and STORED_PROCEDURES.md directly so it had the exact proc names, parameter names, and SQL types.
- AI performed **as expected** on contextual reasoning: translating the DataWeave conditionals was non-trivial but Claude Code handled it once we pointed it at the actual XML flows.
- AI performed **worse than expected** on detecting the SHOT SOAP outlier without explicit prompting — we had to flag it manually before it adjusted approach.

### What comes next
Connect `sentinel-api` to the real `DigitalServiceDataStore` dev environment and run integration tests to validate that response shapes match current MuleSoft output — then raise the APIM configuration PR to route production traffic.
