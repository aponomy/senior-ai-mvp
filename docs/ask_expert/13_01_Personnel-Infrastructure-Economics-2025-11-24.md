# Personnel Costs and Infrastructure Economics

**Date**: 2025-11-24  
**Issue**: #13 Task 1-3  
**Purpose**: Personnel cost benchmarking, infrastructure economics, and financial assumptions validation for EIC grant budget and 5-year projections  
**Expert**: Azure OpenAI GPT-5 (high reasoning effort)

---

## Executive Summary

**Swedish Personnel Costs (2025-2027)**:
- Senior AI/ML Engineer: 65-85k SEK/month (median ~75k) = €5,800-7,400/month
- Platform Engineer: 55-75k SEK/month (median ~65k) = €4,800-6,500/month
- DevSecOps: 60-80k SEK/month (median ~70k) = €5,200-7,000/month
- UX/Accessibility: 48-65k SEK/month (median ~55k) = €4,200-5,700/month
- Product Manager: 55-75k SEK/month (median ~65k) = €4,800-6,500/month
- **Loaded cost multiplier**: 1.40-1.50× (includes 31.42% social charges + 4.5-6% pension + insurances)
- **Founder salaries during grant**: 40-55k SEK/month (€3,500-4,800) is acceptable and advisable

**External Services Costs**:
- Security pentest + audit: €40-70k initial, €20-40k annual follow-up
- Accessibility certification (EN 301 549): €30-50k (audit + remediation + retest)
- User studies (60-80 elderly participants): €22-52k depending on scope
- GDPR compliance (DPIA, policies): €10-25k + €700-1,500/month DPO retainer
- ISO/IEC 42001 AI certification: €24-60k implementation + €15-30k audit

**SaaS Infrastructure Economics**:
- Per-user COGS: €0.18-0.36/month (LLM + voice + infrastructure)
- Monthly all-in COGS:
  - 10k MAU: €2-6k (gross margin 94-98%)
  - 100k MAU: €20-45k (gross margin 95-98%)
  - 500k MAU: €90-200k (gross margin 95-98%)

**Financial Assumptions Validated**:
- CAC B2C digital: €120-250 realistic (blended with partnerships: €70-150)
- Churn: 20-35% annually realistic, improving with BankID habit-forming use cases
- B2B2C cycle: 9-15 months from pilot to first payment
- Break-even: Year 4-5 realistic (Year 3 possible with heavy B2B2C mix)
- EIC equity: €2-4M at €10-20M pre-money (10-25% dilution)

---

## Question Asked

Personnel costs and infrastructure economics for Swedish AI startup building elderly-focused SaaS platform.

I need to build accurate financial projections for an EIC Accelerator grant application (€2.5M) and 5-year company financials for Senior AI - an AI assistant for elderly users in Sweden/EU.

**Specific questions:**

1. **Swedish Personnel Costs (2025-2027)**:
   - Monthly gross salary ranges for: Senior AI/ML Engineer, Platform Engineer (full-stack), UX/Accessibility Specialist, DevSecOps Engineer, Product Manager
   - Employer social costs in Sweden (% on top of gross salary)
   - Consulting/contractor rates if we hire part-time specialists
   - Founder salary norms for pre-seed/EIC-funded startup (should we pay ourselves during grant phase?)

2. **External Service Costs (EU market)**:
   - Security penetration testing + audit for consumer SaaS (€X per engagement?)
   - Accessibility certification (EN 301 549 / WCAG 2.2 AA) - audit + remediation costs
   - User studies with elderly participants (60-80 people, usability testing, compensation rates)
   - GDPR legal compliance consulting (DPIA, DPA consultation if needed)
   - ISO/IEC 42001 AI management system audit costs

3. **SaaS Infrastructure Economics**:
   - LLM API costs at scale: Assuming 10k/100k/500k MAU, 20-40 messages/user/month, mix of GPT-4o-mini + Claude Sonnet. Cost per user per month?
   - Cloudflare Workers/Pages + Supabase costs at same scale
   - Expected gross margin profile: Year 1 (10k users) vs Year 5 (500k users)

4. **Financial Assumptions Validation**:
   - CAC for elderly-focused tech (B2C): Are €100-200 digital channels realistic? Benchmark against telecare, Doro, ElliQ if data exists
   - Churn rates for elderly subscription services: 20-30% annually realistic? Lower/higher?
   - B2B2C payment terms: How long from pilot → contract → first payment for Swedish municipality deals?

5. **Startup Financial Planning**:
   - Recommended cash runway buffer (months) for hardware-free SaaS startup?
   - Break-even timeline expectations for deep-tech B2C+B2B2C model (realistic target?)
   - EIC equity typical range (€2-4M) at what valuation/dilution for pre-revenue TRL 5 company?
   - Series A timing and typical raise amount post-EIC for enterprise SaaS scaling?

---

## Expert Answer

Below are benchmarked, planning-grade numbers for Sweden/EU in 2025–2027. Where market prices vary, I give realistic ranges and the assumptions behind them so you can tune for your EIC budget and 5‑year model. All SEK figures are gross monthly salaries (before tax). Currency conversion note: many Swedish budgets use SEK; if you need € quickly, 1 € ≈ 11–11.5 SEK is a safe planning range.

### 1) Swedish Personnel Costs (2025–2027)

**Salary ranges (Stockholm/remote Sweden, senior IC level)**:
- Senior AI/ML Engineer: 65,000–85,000 SEK/month (median ~75k)
- Platform Engineer (full‑stack): 55,000–75,000 SEK/month (median ~65k)
- DevSecOps Engineer: 60,000–80,000 SEK/month (median ~70k)
- UX/Accessibility Specialist: 48,000–65,000 SEK/month (median ~55k)
- Product Manager: 55,000–75,000 SEK/month (median ~65k)
- Annual increases to model: 2026 +3%, 2027 +3% (Sweden's current wage-setting and inflation outlook make 2–3% a reasonable planning assumption).

**Employer social costs in Sweden (on top of gross salary)**:
- Statutory employer contributions (arbetsgivaravgifter): 31.42% for most employees.
- Occupational pension and insurances: commonly 4.5–6% up to the income ceiling; add 0.5–1.5% for group insurances. Not strictly mandatory without a collective agreement, but strongly expected at tech startups competing for talent.
- Practical "loaded" multiplier to budget: **1.40–1.50 times gross salary** (includes payroll taxes, pension/insurance, and minor overhead like holiday premiums). 
- Example: 75,000 SEK salary → 75,000 × 1.45 ≈ 108,750 SEK/month fully-loaded cost.

**Consulting/contractor rates (Sweden; senior specialist)**:
- AI/ML engineer: 1,300–1,900 SEK/hour (10,400–15,200 SEK/day at 8h)
- DevSecOps/Security: 1,400–2,200 SEK/hour
- Full‑stack/Platform: 1,000–1,500 SEK/hour
- UX/Accessibility: 900–1,400 SEK/hour
- Product management: 1,000–1,500 SEK/hour
- EU boutique consultancies often quote in € at 1,200–1,800 €/day; security and AI experts sit at the high end.

**Founder salary norms (pre‑seed/EIC grant phase)**:
- It is acceptable and advisable to pay founders under the grant as employees; auditors prefer personnel cost traceability.
- Common founder gross salaries: **40,000–55,000 SEK/month** during grant phase (keep well within market medians to minimize audit queries; escalate post‑grant or at revenue).
- If a founder is 100% on the project, don't set salary to zero—zero salary risks sustainability concerns at review.

### 2) External Service Costs (EU market, realistic ranges)

**Security pentest + audit** (consumer SaaS with web/app + API + cloud, plus BankID integration):
- Scope: threat modeling, external pentest of app/API, cloud config review, retest.
- Budget per major engagement: **€40k–70k initial** (25–45 consultant days at €1,300–1,700/day), including retest (€5k–10k). 
- Annual follow‑up: **€20k–40k** depending on delta.
- Add €10k–20k if you want secure SDLC/code review coaching and CI checks set up.

**Accessibility (EN 301 549 / WCAG 2.2 AA)**:
- Audit and certification-oriented report for a moderately complex SaaS: €15k–35k.
- With multimodal/voice UI and deep remediation support and retest: **€30k–50k total**.
- Engineering remediation cost typically equals 2–6 sprints of 1–2 developers plus a specialist reviewer (budget internally, not as external fees).

**User studies with elderly participants (60–80 participants)**:
- Incentives: 500–800 SEK per 60–90 min session; on‑site elder testing often leans 600–800 SEK to ensure show‑up.
- Recruitment (agency/panel): 1,500–3,000 SEK per recruit depending on screening and geography.
- Moderation/analysis: internal or external at 900–1,400 SEK/h for a senior UX researcher; add venue/assistive transport where needed.
- Typical all‑in budget:
  - Lean (one wave, mixed remote and on‑site, n=60): **250,000–400,000 SEK (€22k–35k)**
  - Rich (two waves, n=80 with travel/venues and in‑home shadowing): **400,000–600,000 SEK (€35k–52k)**

**GDPR compliance (DPIA, policies, DPO, potential DPA consultation)**:
- DPIA + records of processing, data mapping, policy pack (small startup with sensitive flows like BankID and potential health-adjacent tasks): **€10k–25k** (8–15 consulting days plus reviews).
- DPO‑as‑a‑Service: **€700–1,500/month retainer**.
- If a prior consultation with the supervisory authority is needed (rare, only if residual high risk remains): add €4k–12k for legal hours; lead time 1–3 months.

**ISO/IEC 42001 (AI management system) certification**:
- Implementation support: **€24k–60k** (20–40 consulting days) depending on pre‑existing ISO 27001 maturity.
- Certification body Stage 1+2 audit (≤25 staff): **€15k–30k initial**; annual surveillance **€8k–12k**.
- If you plan ISO 27001 for BankID/municipal trust, do 27001 first and add 42001—incremental cost drops ~25–35% by sharing controls, risk and audit evidence.

### 3) SaaS Infrastructure Economics

**Assumptions to make cost transparent**:
- Mix of models per message: 80% GPT‑4o‑mini, 20% Claude Sonnet (you can tune down Sonnet for savings).
- Messages per user per month (MPUM): 20–40; I model at 30.
- Token footprints:
  - Lean: mini 700 input/250 output tokens; Sonnet 1,200/600.
  - Rich (RAG/tooling/summarization): mini 2,000/800; Sonnet 3,000/1,200.
- 2024/25 prices used:
  - GPT‑4o‑mini: $0.15/M input tokens; $0.60/M output.
  - Claude Sonnet: $3/M input; $15/M output.
- Voice:
  - STT: ~$0.006/min (OpenAI Whisper‑1 or comparable).
  - TTS: ~$16 per 1M characters.
  - Average speech per message 10–20 seconds.

**Per‑user LLM+voice cost (30 MPUM)**:
- Lean content: LLM ~ $0.08 per user/month; STT+TTS ~ $0.10; retrieval/misc ~$0.02 → total ≈ **$0.20 (€0.18)** per user/month.
- Rich content: LLM ~ $0.18; STT+TTS ~ $0.18; retrieval/misc ~$0.03 → total ≈ **$0.39 (€0.36)** per user/month.
- Sensitivity: each +10 messages/user/month adds ~$0.07–0.13 to COGS depending on lean vs rich and Sonnet share.

**Cloudflare + Supabase + observability**:

Cloudflare Workers/Pages/Durable Objects/KV:
- Requests per message often 6–10 (auth, fetch, write, KV, events). At 8 requests/message and 30 MPUM:
  - 10k MAU ≈ 2.4M requests/month
  - 100k MAU ≈ 24M
  - 500k MAU ≈ 120M
- Budget: €50–€200/month at 10k MAU; €300–€1,000 at 100k; €1,500–€5,000 at 500k (depends on Unbound CPU time, Durable Objects, bandwidth).

Supabase (Postgres + Auth + Storage + pgvector):
- 10k MAU: €500–€1,500/month (DB 50–150 GB, 0.5–1 TB storage; modest egress)
- 100k MAU: €2,000–€5,000/month
- 500k MAU: €6,000–€15,000/month (optimize cold storage and prune logs; consider read replicas)

Observability (Sentry/Datadog/Prometheus/Grafana + log retention/alerts):
- 10k MAU: €200–€500
- 100k MAU: €800–€2,000
- 500k MAU: €2,000–€4,000

**Monthly COGS (all‑in infra) at the three scales**:
- 10k MAU: **€2k–€6k**
- 100k MAU: **€20k–€45k**
- 500k MAU: **€90k–€200k**

Note: the spread reflects lean vs rich content mix and Claude share. If you cap Claude to 10% and tune contexts, you can hit the lower end.

**Expected gross margin profile**:
- Year 1 (10k users, assume €10–€15 ARPU B2C): monthly revenue €100k–€150k; COGS €2k–€6k → **gross margin 94–98%**.
- Year 5 (500k users, blended ARPU €6.5–€9 from B2C/B2B2C mix): monthly revenue €3.25M–€4.5M; COGS €90k–€200k → **gross margin 95–98%**.

Realistically, support and payment processing (2–3% + fixed per transaction) will shave a couple of points; still very high‑margin if you keep model mix optimized.

### 4) Financial Assumptions Validation

**CAC for elderly‑focused B2C digital channels**:
- Pure digital CAC of €100–€200 is achievable but not trivial in this demographic. Benchmarks:
  - Consumer telehealth/telecare DTC in EU: often €150–€300 CAC online (lower with strong brand or referrals).
  - Age‑tech devices/services often migrate to B2B2C because retail/paid digital CAC >€200 is common.
  - Lower CAC is achievable targeting adult children/caregivers via Facebook/YouTube/Google and partnerships (libraries, pharmacies, pensioner orgs), but expect slower ramp.
- **Plan ranges**: paid digital CAC €120–€250; blended CAC with partnerships €70–€150; B2B2C effectively shifts CAC into sales cycle cost.

**Churn rates (elderly subscription services)**:
- B2C: expect 3–6% monthly churn initially (30–60% annual), improving to 2–3% monthly (20–35% annual) once product‑market fit and habit‑forming use cases exist (bank/government tasks and medication flows reduce churn).
- B2B2C municipal/care contracts: gross churn typically 8–15% annually; net revenue retention 95–110% depending on seat expansion and upsell. Pilot cohorts may "churn" when pilots end unless you bridge to tenders.

**B2B2C payment terms and cycle in Sweden (municipalities)**:
- Payment terms post‑contract: Net 30 is standard; first payment usually after delivery/milestone acceptance.
- Cycle time:
  - Exploratory + pilot setup: 2–4 months
  - Pilot execution: 3–6 months
  - Tender/pre‑procurement: 3–6 months for small frameworks, 6–9+ months for broader deals
  - Implementation after award: 1–3 months
- **Realistic time from pilot kick‑off to first production payment: 9–15 months**. Keep pilots under direct‑award thresholds when possible to shorten the path.

### 5) Startup Financial Planning

**Cash runway buffer for hardware‑free SaaS**:
- Aim for **18–24 months of runway** post‑round/grant signature, given certification/security dependencies and public‑sector sales cycles. Minimum 15 months is workable; 24 months is safer in EU procurement contexts.

**Break‑even timeline for deep‑tech B2C + B2B2C**:
- With your pricing and cost structure, **break‑even in year 4–5 is realistic**. Year 3 is possible only with a heavy B2B2C mix, short sales cycles, and disciplined burn (or if B2C viral/partnership lift reduces CAC materially).

**EIC equity (blended finance) range and implied dilution**:
- EIC Accelerator equity tickets commonly €2–4M for pre‑revenue deep‑tech; EIC can go higher, but €2–4M is typical at your stage.
- Dilution depends on negotiated pre‑money; for TRL 5, pre‑revenue companies often land **€10–20M pre-money** in recent EIC deals, implying **~10–25% dilution for €2–4M**.
- EIC sometimes matches the valuation of the last qualified round; if none, be ready to justify with traction, IP, and regulatory moat.

**Series A timing and size post‑EIC**:
- Timing: 12–24 months after EIC funds, ideally when you show repeatable B2B2C sales motion and growing B2C unit economics.
- Size: **€8–15M for EU enterprise SaaS scaling**; for an AI/age‑tech platform with certification/security completed and municipal logos, **€10–20M is feasible**.

---

## Key Insights for Financial Planning

### Practical Budgeting Tips for EIC Application

**Personnel share**: 55–65% of the €2.5M grant is common for a team moving TRL 5→8 (7–8 FTEs + founders).

**External services**: explicitly line‑item:
- Security (€40–70k)
- Accessibility (€30–50k with retest)
- GDPR/DPIA (€10–25k + DPO retainer)
- ISO 42001 (€40–90k over 18–24 months)
- User research (€25–50k per wave)

**Cloud/LLM**: justify using usage‑based scenarios and commit to optimization levers (model mix caps, context compression, on‑device/edge STT where possible).

**Pilots**: budget for 2–4 municipal pilots with travel/training and post‑pilot evaluation; include legal/procurement support to bridge to tenders.

### Key Risks and Levers to Manage Unit Economics

**LLM cost drift**: 
- Cap Claude/Sonnet usage to high‑value flows
- Compress context
- Cache tool outputs
- Prefer GPT‑4o‑mini for the majority of turns
- Consider distillation to smaller local models for routine intents over time

**Voice cost control**: 
- Keep TTS verbosity concise
- Provide mixed UI (voice for input, condensed text output with option to "read summary")

**CAC control**: 
- Prioritize partnerships with pensioner associations, pharmacies, libraries, and caregiver channels
- Leverage BankID use cases in content marketing
- Run referral incentives for adult children

**Churn reduction**: 
- Build habit anchors (monthly task checklists, reminders tied to BankID flows, medication/calendar integrations)
- Offer onboarding help (phone line, community workshops)

---

**Sources**: 
- Swedish salary data: Unionen 2024, Jusek 2024, tech.se salary surveys
- Employer costs: Swedish Tax Agency arbetsgivaravgifter 2024-2025
- External services: Market rates from Nordic security consultancies, accessibility audit firms, UX research agencies
- Cloud costs: Cloudflare/Supabase pricing 2024-2025, OpenAI/Anthropic API pricing
- Financial benchmarks: EIC Accelerator portfolio data, Nordic SaaS benchmarks, elderly tech market research
