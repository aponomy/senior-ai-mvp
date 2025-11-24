# Budget Breakdown for €2.5M Grant

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Budget Allocation  
**Type**: Expert Consultation - Budget

---

## Budget Structure

**Total Grant**: €2.5M over 18 months
- **Direct Costs**: €2.0M (80%)
- **Indirect Costs**: €0.5M (20%, flat 25% of direct)

---

## Recommended Direct Cost Allocation (€2.0M)

### Personnel: 60% (€1.20M)
- Founders' salaries
- 5–7 FTE hires
- Statutory costs (31.42% payroll tax + pension + insurance)

### Subcontracting/External Services: 16.5% (€330k)
- Security pen tests/code audits: €80–120k
- EN 301 549 pre-audit + certification: €40–60k
- Fractional DPO + privacy legal: €60–80k
- BankID onboarding and test fees: €20–40k
- Localization, accessibility translations, UX recruitment: €40–60k

### Pilots (Direct Costs): 8% (€160k)
- Participant incentives
- Site coordinator fees
- Travel
- Training materials

### Equipment: 6% (€120k)
- Tablets/microphones/accessibility peripherals
- Test lab devices
- Secure hardware tokens
- MDM set-up

### Cloud/Compute/LLM APIs: 6% (€120k)
- Cloud infrastructure
- Observability, CI/CD
- Model hosting
- Speech services

### Travel/Meetings/Field Ops: 2% (€40k)

### Dissemination/Branding: 1.5% (€30k)

### Contingency: 0.5% (€10k)

---

## Consolidated View (Against €2.5M Total)

- Personnel: ~48% (€1.2M)
- Subcontracting: ~13% (€330k)
- Pilots: ~6–7% (€160k)
- Equipment: ~5% (€120k)
- Cloud/software: ~5% (€120k)
- Travel/branding/misc: ~3% (€80k)
- Overhead/indirect: ~20% (€500k)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# Indicative Timeline & Key Milestones

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 8 of 8

---

## 18-Month Timeline Overview

### M1–M3: Foundation
- WP1, WP2 kick-off
- Architecture/security freeze
- Accessibility framework
- DPIA draft
- Pilot protocols

### M4–M6: Alpha Platform
- Alpha platform (voice+cards, 4 domains)
- BankID sandbox
- MLOps v1
- Pilot recruitment starts
- **MS2 Alpha (M6)**

### M7–M9: Beta & First Pilots
- Feature-complete beta
- 8–10 domains
- Pen test pass
- First pilots live
- **MS3 Beta (M9)**
- **MS8 Pen test pass (M9)**

### M10–M12: Production Ready
- Production v1.0
- 10 pilots live
- Accessibility pre-audit pass
- BankID production approval
- Procurement pack
- **MS4 v1.0 (M12)**
- **MS6 Pre-audit (M10)**
- **MS7 BankID approval (M12)**
- **MS10 10 pilots live (M12)**

### M13–M15: Certification
- Complete pilots
- Fix findings
- EN 301 549 certification
- GDPR validation
- Reliability qualification
- **MS9 Certifications (M15)**
- **MS11 Pilots completed (M16)**

### M16–M18: TRL 8 & Investment Ready
- Production v1.1
- Final impact report
- Series A-ready package
- TRL 8 confirmation

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# Work Package Structure Overview - 18-Month TRL 5→8

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 1 of 4

---

## Question

What is the optimal work package structure for Senior AI's 18-month acceleration from TRL 5 to TRL 8?

## High-Level TRL Strategy

**TRL 5 to 6 (M1–M6)**: 
- Freeze security/architecture
- Deliver end-to-end alpha
- BankID sandbox
- First 4 domains
- Initial WCAG/EN 301 549 gap analysis
- DPIA draft
- Pilot protocols

**TRL 6 to 7 (M7–M12)**: 
- Feature-complete beta
- 8–10 domains
- Pen test pass
- Start multi-site pilots
- Accessibility pre-audit
- Data protection controls in production
- BankID production approval

**TRL 7 to 8 (M13–M18)**: 
- Complete 10–15 pilots in operational environments
- Security and accessibility certification
- GDPR validation
- Reliability and performance qualification
- Production v1.1
- Series A readiness

---

## Recommended Work Package Structure (8 WPs)

### WP1: Project Management, Risk and Ethics (M1–M18)
**Objectives**: Deliver on time/budget; manage risks, ethics, IPR; EIC reporting

**Deliverables**:
- D1.1 Project plan, risk and ethics framework (M1)
- D1.2 Mid-term review package (M9)
- D1.3 Final report and exploitation plan (M18)

**Milestones**: 
- MS0 Kickoff (M1)
- MS5 Final review (M18)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP2: Architecture, Security & Privacy-by-Design

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 2 of 4

---

## WP2: Architecture, Security-by-Design and Privacy-by-Design (M1–M12)

### Objectives
Define and implement zero-trust, capability-scoped architecture; design for GDPR and BankID from day one.

### Scope/Tasks
- Security architecture and threat modelling (LINDDUN/STRIDE)
- Data classification, key management, secrets rotation
- Capability-scoped tokens and policy engine for agent execution
- Least privilege; break-glass flows
- BankID integration architecture; sandbox setup; secure session binding
- Device attestation alternatives
- GDPR-by-design: data minimization, purpose limitation, privacy budgets
- Configurable data retention, user controls
- DPIA planning and drafts; Records of processing; DPA templates

### Deliverables and Timing
- **D2.1** Architecture & security design freeze + DPIA v1 (M3)
- **D2.2** BankID sandbox integration spec and test plan (M4)
- **D2.3** Privacy engineering spec and data schemas (M5)

### Milestones
- **MS1** Security/architecture design freeze (M3)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP3: Core Platform & Conversation Engine

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 3 of 4

---

## WP3: Core Platform, Conversation Engine and MLOps (M1–M18)

### Objectives
Production-ready conversation system with non-destructive branching (DAG), card renderer, STT/TTS, latency/SLOs, robust MLOps.

### Scope/Tasks

**Conversation Engine**:
- DAG persistence, rewind/branch/merge
- Grounding and safety guardrails
- Prompt/router policies

**Card-based UI Engine**:
- Three-column progressive disclosure
- Accessibility hooks
- Cross-platform rendering (tablet/desktop)

**Voice Stack**:
- On-device/off-device STT fallback
- Wake-word, barge-in
- TTS with prosody controls for cognitive accessibility

**MLOps/SRE**:
- Model registry, eval harness
- Prompt/version control
- Red team datasets
- Observability, CI/CD, rollback
- SLOs: latency < 1.2s P95 for UI actions; ASR < 300ms partials

**Data**:
- Synthetic and curated corpora across 14+ domains
- Bias/safety evals

### Deliverables and Timing
- **D3.1** E2E alpha (voice+cards, 4 domains), MLOps v1 (M6)
- **D3.2** Feature-complete beta (8–10 domains), SLOs defined, test automation suite v1 (M9)
- **D3.3** Production v1.0 (M12), v1.1 hardening (M18)

### Milestones
- **MS2** Alpha (M6)
- **MS3** Beta (M9)
- **MS4** v1.0 (M12)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP4: Accessibility UX & Human-Centered Design

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 4a of 4

---

## WP4: Accessibility UX and Human-Centered Design (M1–M18)

### Objectives
Achieve EN 301 549 conformance; validate UX for 65+ and cognitive challenges.

### Scope/Tasks
- Map UX to EN 301 549/WCAG 2.2 AA/AAA targets
- Define cognitive load metrics
- Voice-first flows, progressive disclosure patterns
- Error recovery, explainability/orientation
- Localizations
- Inclusive design research with representative users
- Iterative usability testing
- Assistive tech compatibility (screen readers, switch controls)
- Accessibility test cases and automated checks integrated in CI

### Deliverables and Timing
- **D4.1** Accessibility design system + conformance matrix (M4)
- **D4.2** Usability study report #1 (M7)
- **D4.3** EN 301 549 pre-audit report and remediation plan (M10)
- **D4.4** Accessibility test evidence pack (M14)

### Milestones
- **MS6** Accessibility pre-audit passed (M10)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP5: Domain Integrations & Agent Execution

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 4b of 4

---

## WP5: Domain Integrations and Secure Agent Execution (M1–M15)

### Objectives
Integrate 10–14 priority domains; deliver secure multi-domain agent execution; BankID production go-live.

### Scope/Tasks

**Domain Adapters/APIs**:
- Banking
- Healthcare portals/e-prescriptions
- Transport
- Government eIDs
- Utilities
- Shopping
- Communications

**Security & Governance**:
- Capabilities registry and consent manager (GDPR + BankID scopes)
- Per-domain rate limiting
- Audit trails
- Policy enforcement: static/dynamic checks, tool sandboxing
- Output filters, safety rails for transactional steps

**Monitoring**:
- Per-domain SLAs
- Error budgets
- Incident response runbooks

**BankID Production**:
- Contracts
- Security tests
- Logging
- Compliance evidence

### Deliverables and Timing
- **D5.1** 4 domains live in alpha; capability scopes v1 (M6)
- **D5.2** 8–10 domains live in beta; consent manager v1 (M9)
- **D5.3** BankID production approval and 10–12 domains with SLAs (M12–M13)

### Milestones
- **MS7** BankID production approval (M12)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP6: Verification, Security Audits & Certification

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 5 of 8

---

## WP6: Verification/Validation, Security Audits and Certification (M4–M18)

### Objectives
Qualify system in operational conditions; pass independent security and accessibility audits; GDPR compliance validation.

### Scope/Tasks

**V&V Planning**:
- V&V plan, test automation
- Performance/reliability testing (uptime, load, chaos)

**Security Audits**:
- External pen tests and code audits
- Red teaming for prompt injection, data exfiltration, tool misuse

**Accessibility Certification**:
- EN 301 549 audit by accredited body
- Fix rounds

**GDPR Validation**:
- DPIA finalization
- DPO review
- Records of processing
- TOMs validation
- Processor/sub-processor agreements
- Lawful basis and consent flows
- Privacy UX tests

**National Attestations**:
- BankID and relevant national scheme attestations

### Deliverables and Timing
- **D6.1** V&V plan + traceability matrix (M5)
- **D6.2** External pen test report + remediation (M9)
- **D6.3** EN 301 549 conformance certificate (target) (M15)
- **D6.4** GDPR compliance validation report and DPO sign-off (M15)

### Milestones
- **MS8** Pen test pass (medium severity or lower) (M9)
- **MS9** Certifications achieved (M15)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP7: Pilots & Impact Evaluation

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 6 of 8

---

## WP7: Pilots and Impact Evaluation (M6–M18)

### Objectives
Run 10–15 real-world pilots with elderly users; measure outcomes; refine product; support TRL 8 qualification.

### Scope/Tasks

**Pilot Design & Ethics**:
- Protocols, consent, safety
- Inclusion criteria
- Data sharing
- Site agreements

**Recruitment & Operations**:
- Recruitment via municipalities/care orgs
- Training and onboarding
- Support

**Field Operations**:
- Device provisioning
- Remote support
- Incident handling
- Telemetry and qualitative feedback collection

**Evaluation Metrics**:
- Usability (SUS)
- Accessibility outcomes
- Task success
- Time-on-task
- Adherence
- NPS/CSAT
- Reduced caregiver load
- Economic model inputs

### Deliverables and Timing
- **D7.1** Pilot master protocol + ethics and data plan (M6)
- **D7.2** Interim pilot report #1 (first 5 sites) (M10)
- **D7.3** Interim pilot report #2 (10 sites) (M13)
- **D7.4** Final pilot report with impact and health economics model inputs (M17)

### Milestones
- **MS10** 10 pilots live (M12)
- **MS11** 10–15 pilots completed (M16)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
# WP8: Go-to-Market & Exploitation

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 01 - Work Package Structure  
**Type**: Expert Consultation - Part 7 of 8

---

## WP8: Dissemination, Exploitation and Go-to-Market (M3–M18)

### Objectives
Prepare commercialization; procurement readiness for municipalities; Series A data room.

### Scope/Tasks

**Brand & Marketing**:
- Brand and messaging for older adults and caregivers
- Website and demos
- Case studies

**Partnerships**:
- Partnerships with care providers/municipalities
- Procurement pack (security, DPIA, accessibility, SLAs, pricing)

**Business Model Validation**:
- B2C/B2B2C validation
- Pricing tests
- Reimbursement and assistive tech funding mapping by country

**Investor Readiness**:
- Metrics dashboard
- Cohort analysis
- TAM/SAM proof
- Regulatory/compliance pack

### Deliverables and Timing
- **D8.1** Exploitation and commercialization plan v1 (M6)
- **D8.2** Procurement pack (security/accessibility/GDPR evidence) (M12)
- **D8.3** Series A data room package (M18)

### Milestones
- **MS12** First municipal LOIs for post-grant deployment (M14)

---

**Source**: Expert consultation via ask-expert (gpt-5, medium reasoning)
