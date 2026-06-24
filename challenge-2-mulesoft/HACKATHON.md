# Hackathon: MuleSoft API Layer Replacement Spike

**Date:** 12 June 2026  
**Objective:** Prove we can replace the 27-service MuleSoft 3.9 API layer with Azure-native services (NestJS on Azure Container Apps, fronted by Azure APIM) in a single day spike, using the Address service as the exemplar.  
**Architecture Decision:** See [ARCHITECTURE_DECISION.md](ARCHITECTURE_DECISION.md) for full rationale.

---

## Strategic Context

This spike implements the **"Integration Replacement (MuleSoft exit)"** roadmap item from TechRoadmap MASTER 25-26. Supplier support ends December 2028.

**Primary consumer:** Appian (Regulatory Connect, case management)  
**Architecture alignment:** Azure APIM + Container Apps — consistent with Azure-native platform strategy. Container Apps chosen over Azure Functions (see ARCHITECTURE_DECISION.md §3 for trade-off analysis).

---

## Technical Context

The `sentinel-mulesoft-repo` contains **27 MuleSoft 3.9 services** arranged in a 3-tier pattern:

```
Appian / External Consumers (unchanged)
         │
         ▼
┌─────────────────────────────────────────────┐
│  MuleSoft (current — TO BE REPLACED)        │
│  Experience APIs (mhra-e-*) — 11 services   │
│  System APIs (mhra-s-*) — 13 services       │
│  Process APIs (mhra-p-*) — 2 services       │
│  Shared: mhra-mule-common                   │
└────────────────┬────────────────────────────┘
                 │ SQL Server JDBC
┌────────────────▼────────────────────────────┐
│  Azure SQL Database                          │
│  171 stored procedures (dbo.usp_API_*)       │
│  (DigitalServiceDataStore)                   │
└──────────────────────────────────────────────┘
```

**Target state (what we're building today):**

```
Appian / External Consumers (unchanged)
         │
         ▼
┌─────────────────────────────────────────────┐
│  Azure API Management (APIM)                 │  Auth (OAuth2/client creds), rate limiting,
│                                              │  routing, OpenAPI developer portal
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Azure Container Apps                        │  NestJS (TypeScript) container
│  ┌────────────────────────────────────────┐  │  - Modular: 1 NestJS module per domain
│  │  sentinel-api                          │  │  - Shared: auth guard, logging, tracing
│  │  ├── address module     (spike target) │  │  - Pooled mssql connection
│  │  ├── application module (future)       │  │  - OpenAPI auto-generated from decorators
│  │  ├── organisation module (future)      │  │  - Scales horizontally via KEDA
│  │  └── ... (13 modules total)            │  │
│  └────────────────────────────────────────┘  │
└────────────────┬────────────────────────────┘
                 │ mssql (pooled)
┌────────────────▼────────────────────────────┐
│  Azure SQL Database (unchanged)              │
│  171 stored procedures (dbo.usp_API_*)       │
│  (DigitalServiceDataStore)                   │
└──────────────────────────────────────────────┘
```

**Current auth:** Client ID enforcement (`clientIdEnforced` RAML trait) — migrates to APIM OAuth2 client credentials policy.  
**Current protocol:** HTTPS + JSON (except `mhra-s-shot-v1` which is SOAP/WSDL to SABRE).  
**Data source:** Azure SQL Database (`DigitalServiceDataStore`) — **NOT Oracle**. This is a separate database from sentinel-core's Oracle schema. 171 stored procedures in the `dbo` schema, all prefixed `usp_API_*`.

### Database Details

| Property | Production | Dev |
|----------|-----------|-----|
| Host | `mpazr1005sql.database.windows.net` | `mdazr1005sql-dps.database.secure.windows.net` |
| Database | `DigitalServiceDataStore` | `DigitalServiceDataStore` |
| Port | 1433 | 1433 |
| Driver | SQL Server JDBC | SQL Server JDBC |
| Service Account | `App_IntegrationLayer` | `App_IntegrationLayer` |
| Platform | Azure SQL Database | Azure SQL Database (private endpoint) |

### External Service Dependencies

| Service | Provider | Used By |
|---------|----------|---------|
| GBG Address Lookup | GBGroup (Loqate) | `mhra-s-address-v1` — UK/international address validation |
| SABRE | SHOT (Serious Hazards of Transfusion) | `mhra-s-shot-v1` — haemovigilance event exchange |

### Access Requirements

To connect to the database for the hackathon you need:
1. **Azure VPN / network access** — the `.database.secure.windows.net` suffix indicates private endpoint; you must be on MHRA VPN or have IP whitelisted
2. **Credentials** — the service account `App_IntegrationLayer` is used by MuleSoft; request a read-only dev account from the DBA team
3. **Tools** — Azure Data Studio, SSMS, or VS Code `mssql` extension. From Node.js: `mssql` npm package (NOT `oracledb`)

### Inspecting Stored Procedures

Once connected, run these queries to understand the proc signatures:
```sql
-- List all 171 API stored procedures
SELECT name, create_date, modify_date 
FROM sys.procedures 
WHERE name LIKE 'usp_API_%'
ORDER BY name;

-- View parameters for a specific proc
SELECT p.name, t.name as type, p.max_length, p.is_output
FROM sys.parameters p
JOIN sys.types t ON p.user_type_id = t.user_type_id
WHERE object_id = OBJECT_ID('dbo.usp_API_Application_Address_Get')
ORDER BY p.parameter_id;

-- Get full proc source code
EXEC sp_helptext 'dbo.usp_API_Application_Address_Get';
```

---

## Agenda

### 09:00 – 09:30 | Kickoff & Architecture Decision (30 min)

**Goal:** Align on target architecture and confirm spike scope.

- [ ] Review this document and [ARCHITECTURE_DECISION.md](ARCHITECTURE_DECISION.md)
- [ ] Confirm: **we are wrapping existing stored procs** (not replacing them)
  - NestJS → `mssql` npm → existing Azure SQL stored procs
  - The business logic stays in the database. We're only replacing the middleware layer.
  - Long-term: procs may be replaced with direct Prisma/PostgreSQL queries. Not today.
- [ ] Confirm spike target: **Address service** (`mhra-e-address-v1` + `mhra-s-address-v1`)
  - Small enough to complete in a day
  - Demonstrates the full pattern: RAML → OpenAPI, DataWeave routing → TypeScript, stored proc call → `mssql`
  - Has CRUD operations (GET, POST, PUT, DELETE)
  - Has a sub-resource (`/addresses/lookup` — external GBG address lookup)
- [ ] Confirm deployment target for demo:
  - Local dev: `pnpm dev` (NestJS on localhost)
  - If Azure access available: `az containerapp up` for live demo
  - APIM config is out of scope for today (just note where it would sit)

**Already decided (see ARCHITECTURE_DECISION.md):**
1. Runtime: **Azure Container Apps** (not Functions — wrong workload shape for synchronous APIs)
2. Framework: **NestJS** (module structure needed at 171 endpoints / 13 domains)
3. Auth: **APIM handles auth in production** (for spike: simple API key guard to mirror `clientIdEnforced`)
4. Repo structure: Monorepo — one NestJS app, one module per domain

---

### 09:30 – 10:30 | Scaffold & Foundation (60 min)

**Goal:** Standing NestJS application with database connection, auth, shared infrastructure, and Dockerfile.

#### Tasks (parallelisable across team):

**Person 1 — App scaffold + database:**
```bash
npx @nestjs/cli new sentinel-api --package-manager pnpm --strict
cd sentinel-api
pnpm add @nestjs/config @nestjs/swagger mssql class-validator class-transformer
pnpm add -D @types/mssql
```

- [ ] Create NestJS project with TypeScript strict mode
- [ ] Configure `@nestjs/config` for environment variables (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `API_KEYS`)
- [ ] Set up Swagger/OpenAPI auto-generation (`@nestjs/swagger`)
- [ ] Create `DatabaseModule` wrapping `mssql` connection pool (singleton, shared across modules)
- [ ] Create `SqlServerService` injectable:
  ```typescript
  @Injectable()
  export class SqlServerService {
    async callProc(procName: string, params: Record<string, { type: sql.ISqlType; value: any }>): Promise<sql.IResult<any>> {
      const request = this.pool.request();
      for (const [name, { type, value }] of Object.entries(params)) {
        request.input(name, type, value);
      }
      return request.execute(procName);
    }
  }
  ```
- [ ] Create `Dockerfile` (multi-stage: build → production slim image)
- [ ] Create `docker-compose.yml` for local dev (app + optional Azure SQL edge for offline dev)

**Person 2 — Auth & shared middleware:**
- [ ] Create `ApiKeyGuard` (reads `X-Client-Id` header, validates against config allowlist)
- [ ] Create `RequestLoggingInterceptor` (structured JSON logs — mirrors `mhra-mule-common`)
- [ ] Create `CommonErrorFilter` (global exception filter → standard error response)
- [ ] Create `TracingInterceptor` (propagates/generates `X-Correlation-Id` header)
- [ ] Create shared DTOs: `CommonErrorResponse`, `PaginationQuery`, `OrderByQuery`
- [ ] Create `HealthController` (`/health` → checks SQL connection is alive)

**Person 3 — RAML → OpenAPI + proc mapping (use STORED_PROCEDURES.md):**
- [ ] Convert `mhra-e-address-v1.raml` to OpenAPI 3.0 (use `oas-raml-converter` or manual from RAML)
- [ ] Cross-reference [STORED_PROCEDURES.md](STORED_PROCEDURES.md) for address proc signatures
- [ ] Map each endpoint to its proc(s) and document the routing logic
- [ ] Create TypeScript interface for the address response shape (from `samples/response/get-addresses.json`)

---

### 10:30 – 10:45 | Break (15 min)

---

### 10:45 – 12:30 | Implement Address Module (105 min)

**Goal:** Working `/addresses` endpoint with full CRUD hitting Azure SQL stored procs.

#### Address API Endpoints (from RAML analysis):

| Method | Path | Description | Stored Proc Pattern |
|--------|------|-------------|---------------------|
| GET | `/addresses` | Get addresses by application/org | Routes to 5 different procs based on query params |
| GET | `/addresses/lookup` | GB address lookup (external service) | Calls external GBGroup/Loqate API |
| GET | `/addresses/:addressId` | Get specific address | Single proc call |
| POST | `/addresses` | Create new address | Insert proc |
| PUT | `/addresses/:addressId` | Update address | Update proc |
| DELETE | `/addresses` | Bulk delete addresses | Delete proc |

#### Tasks:

**Person 1 — GET endpoints:**
- [ ] `AddressController` with `@Get()` endpoint
- [ ] `AddressService` with routing logic (replicate the DataWeave `decideStoredProc` logic):
  ```typescript
  // Mirror of the Mule DataWeave routing:
  if (query.isCfs === 'true') return this.getCfsApplicationAddress(query);
  if (query.isPreviousAddress === 'true') return this.getOrgPreviousAddress(query);
  if (query.applicationRefNumber) return this.getApplicationAddress(query);
  if (query.isAddressRequestForValidation === 'true') return this.getMigrationAddress(query);
  if (query.isExists === 'true') return this.checkAddressDuplicate(query);
  ```
- [ ] `AddressRepository` calling stored procedures via `SqlServerService`
- [ ] GET `/addresses/:addressId` — single address retrieval

**Person 2 — Write endpoints + lookup:**
- [ ] POST `/addresses` — create address (call insert stored proc)
- [ ] PUT `/addresses/:addressId` — update address (call update stored proc)
- [ ] DELETE `/addresses` — bulk delete (call delete stored proc)
- [ ] GET `/addresses/lookup` — proxy to external GB address lookup service (HTTP call via `fetch`/`undici`)

**Person 3 — DTOs, validation, and response mapping:**
- [ ] `CreateAddressDto`, `UpdateAddressDto`, `DeleteAddressDto` with `class-validator` decorators
- [ ] `AddressResponseDto` matching the current JSON response schema
- [ ] Response mapping from SQL Server result sets → TypeScript DTOs
- [ ] Swagger decorators on all endpoints (`@ApiOperation`, `@ApiQuery`, `@ApiResponse`)
- [ ] Integration test file (Jest) with mocked SQL Server responses

---

### 12:30 – 13:15 | Lunch (45 min)

---

### 13:15 – 14:30 | Pattern Extraction & Generalisation (75 min)

**Goal:** Extract the repeatable pattern so any of the other 26 services can be built the same way.

- [ ] Extract abstract `BaseRepository` class with shared `callProc` helper and response mapping
- [ ] Create a **code generator script** (or Claude Code prompt template) that takes a service name and produces:
  - NestJS module file
  - Controller skeleton with all endpoints (from RAML)
  - DTOs for each request/response type (from JSON schemas in `datatypes/`)
  - Service with routing stubs (from DataWeave routing logic)
  - Repository with proc call stubs (from STORED_PROCEDURES.md)
- [ ] Document the **MuleSoft Replacement Playbook**:
  ```
  For each Mule service pair (mhra-e-X + mhra-s-X):
  1. Read the Experience RAML → list endpoints
  2. Cross-reference STORED_PROCEDURES.md → identify procs per endpoint
  3. Read System API XML → extract DataWeave routing logic
  4. Generate module + controller + service + repository
  5. Implement stored proc calls via SqlServerService
  6. Map response to DTO (from samples/response/*.json)
  7. Add Swagger decorators (@ApiOperation, @ApiQuery, @ApiResponse)
  8. Run and compare response shape to MuleSoft output
  ```
- [ ] Estimate: how long per service once the pattern is established? (Target: 2-4 hours each)
- [ ] Write the `Dockerfile` and document `az containerapp up` deployment command

---

### 14:30 – 14:45 | Break (15 min)

---

### 14:45 – 16:00 | Second Service (Stretch Goal) (75 min)

**Goal:** Validate the pattern by implementing a second service — **Product** (`mhra-e-product-v1`).

- [ ] Apply the generator/template to the Product RAML
- [ ] Implement the generated stubs
- [ ] Verify the pattern holds (or note where it breaks)
- [ ] If the pattern works cleanly, start a third service (Contact or Organisation)

---

### 16:00 – 16:45 | SHOT Service Assessment + Deployment Demo (45 min)

**Goal:** Assess the SOAP outlier and (if Azure access available) deploy to Container Apps.

**SHOT Assessment (20 min):**

`mhra-s-shot-v1` is architecturally different — it's a SOAP/WSDL bridge to the external SABRE haemovigilance system (originally IBM Lotus Domino). It does NOT follow the standard REST → proc pattern.

- [ ] Review `fromSABRE.wsdl` and `toSABRE.wsdl` — 6 inbound operations, 2 outbound
- [ ] Note: SHOT also calls 13 Azure SQL procs (`usp_API_HAEMO_SHOT_WSDL_*`) — so it's hybrid (SOAP + SQL)
- [ ] Decision: wrap with `soap` npm package in a separate NestJS module, or defer to last phase?
- [ ] Estimate effort separately

**Deployment Demo (25 min — if Azure access available):**
```bash
# Build container
docker build -t sentinel-api .

# Deploy to Container Apps (one command)
az containerapp up \
  --name sentinel-api \
  --resource-group rg-sentinel-spike \
  --source . \
  --env-vars DB_HOST=mdazr1005sql-dps.database.secure.windows.net \
             DB_NAME=DigitalServiceDataStore
```
- [ ] Show the container running in Azure Portal
- [ ] Hit the `/addresses` endpoint via the Container App URL
- [ ] Show Swagger UI at `/api/docs`
- [ ] Note: APIM would sit in front of this in production (out of scope for today)

---

### 16:45 – 17:30 | Wrap-Up & Findings (45 min)

**Goal:** Document what we proved, what worked, what didn't, and next steps.

- [ ] Demo the working Address API (and Product if completed)
- [ ] Run Swagger UI and compare endpoint shape to original RAML spec
- [ ] Document blockers and unknowns:
  - Can we connect to Azure SQL from our dev environment? (VPN/firewall rules)
  - Do we have read access to `sys.procedures` and `sp_helptext` to inspect proc definitions?
  - Which procs return result sets vs output params vs status codes?
  - Are there any services that do more than stored proc calls? (Answer: yes — address lookup calls GBG, SHOT calls SABRE)
  - Is there a test/staging Azure SQL instance we can use without risk to production?
- [ ] Update `sentinel-mulesoft-repo-requirements.md` with any new findings
- [ ] Write up the "MuleSoft Replacement Playbook" (the repeatable recipe)
- [ ] Estimate total effort: 27 services × N hours/service = total migration timeline

---

## Preparation Checklist (Before the Day)

**Essential:**
- [ ] Node.js 22 LTS installed
- [ ] `pnpm` installed
- [ ] Docker Desktop installed and running
- [ ] Clone `sentinel-mulesoft-repo` locally
- [ ] Read [ARCHITECTURE_DECISION.md](ARCHITECTURE_DECISION.md) and [STORED_PROCEDURES.md](STORED_PROCEDURES.md)
- [ ] Read through `mhra-e-address-v1` RAML and `mhra-s-address-v1` Mule XML beforehand
- [ ] Prepare mock responses from `samples/response/get-addresses.json` (in case no DB access)

**Azure access (nice to have — spike works without it via mocks):**
- [ ] Azure SQL access — VPN/network access + credentials from DBA team
- [ ] Test connection with Azure Data Studio or VS Code `mssql` extension
- [ ] Run `sp_helptext` on the 9 address stored procs to get their full definitions
- [ ] Azure CLI (`az`) installed — for Container Apps deployment demo
- [ ] Azure subscription access for `az containerapp up`

**Optional:**
- [ ] `oas-raml-converter` CLI for RAML → OpenAPI conversion
- [ ] Access to the GBG address lookup service (GBGroup/Loqate) — or prepare a mock

---

## Service Inventory (Full Scope for Future Sprints)

| # | Service Pair | Domain | Complexity | Notes |
|---|---|---|---|---|
| 1 | address | Address management | Medium | CRUD + external lookup. **SPIKE TARGET** |
| 2 | application | Regulatory applications | High | Many query params, complex filtering |
| 3 | contact | Contact management | Low | Standard CRUD |
| 4 | correspondence | Regulatory correspondence | Medium | Document references |
| 5 | device | Medical devices | Medium | Separate regulatory domain |
| 6 | document | Document management | Medium | Documentum integration |
| 7 | event | Regulatory events | Low | Standard CRUD |
| 8 | organisation | Company/org management | High | Complex hierarchy, TCA data |
| 9 | payment | Fee payments | Medium | Financial data |
| 10 | product | Licensed products | High | Core regulatory data, many relations |
| 11 | useraccount | Portal user accounts | Low | Standard CRUD |
| 12 | reference-service | Reference/lookup data | Low | Read-only code tables |
| 13 | shot | Haemovigilance (SABRE) | High | SOAP/WSDL — different pattern entirely |
| P1 | p-event | Event processing | Medium | Write operations |
| P2 | p-organisation | Org processing | Medium | Write operations |

**Estimated total migration (post-spike):** 
- 10 simple/medium services × 3 hours = 30 hours
- 4 high-complexity services × 6 hours = 24 hours  
- 1 SHOT SOAP service × 8 hours = 8 hours
- Pattern setup (done in spike) = 0 additional
- **Total: ~62 hours (~8 developer-days)**

---

## Success Criteria for Today

1. **Working Address API** — all CRUD endpoints responding correctly against Azure SQL (or mocked responses if no DB access)
2. **OpenAPI spec generated** — Swagger UI at `/api/docs` showing all endpoints with correct schemas
3. **Containerised** — `docker build` produces a deployable image; optionally running on Container Apps
4. **Pattern documented** — "MuleSoft Replacement Playbook" that any developer can follow for the other 26 services
5. **Effort estimate validated** — confidence in the "hours per service" number
6. **Architecture aligned** — can articulate why Container Apps over Functions, referencing ARCHITECTURE_DECISION.md
7. **Blockers identified** — anything that would prevent the full 27-service migration

---

## Key Files to Reference During the Day

| What | Where |
|------|-------|
| Address Experience RAML | `sentinel-mulesoft-repo/mhra-e-address-v1/src/main/api/mhra-e-address-v1.raml` |
| Address System API flows | `sentinel-mulesoft-repo/mhra-s-address-v1/src/main/app/mhra-s-address-v1-api.xml` |
| Address lookup flow | `sentinel-mulesoft-repo/mhra-s-address-v1/src/main/app/mhra-s-address-v1-address-lookup.xml` |
| Shared common library | `sentinel-mulesoft-repo/mhra-mule-common/` |
| Global config (connection strings) | `sentinel-mulesoft-repo/mhra-s-address-v1/src/main/resources/Production.properties` |
| Request/response JSON samples | `sentinel-mulesoft-repo/mhra-e-address-v1/src/main/api/samples/` |
| JSON schemas | `sentinel-mulesoft-repo/mhra-e-address-v1/src/main/api/datatypes/*.json` |
| Full requirements doc | `sentinel-mulesoft-repo-requirements.md` |
| Modernisation spike | `MODERNISATION_SPIKE.md` (Section 2.3, Phase 7) |
