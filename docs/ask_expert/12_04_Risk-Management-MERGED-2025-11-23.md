# Risk Management Comprehensive Analysis

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Task**: 04 - Risk Management  
**Type**: Expert Consultation - Comprehensive Risk Register

---

## Budget Overview

**Total mitigation allocations**: €790k (part of €2.5M grant)
**Dedicated risk reserve**: €300k (released against contingency actions only)
**Remaining budget**: €1.41M (core build, pilots, staffing)

---

## 1. TECHNICAL RISKS

### AI Reliability with Vulnerable Users
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: 
  - Confidence gating on AI outputs
  - Guardrail policies
  - Deterministic guided flows for high-risk tasks (banking, healthcare)
  - Human-in-the-loop escalation
  - RLHF and gerontology-informed UX content
  - Instrumentation for error tracking
  - Red-team testing with vulnerable-user panels
- **Contingency**:
  - Freeze high-risk features
  - Revert to deterministic scripts
  - Temporarily disable sensitive intents
  - Route to human support
  - Additional data labeling sprint
  - Expand test cohorts
- **Budget**: €50k (user panels €40k, guardrail tooling €10k)
- **WPs**: WP3, WP4, WP7

---

### BankID Integration Complexity
- **Probability**: Medium
- **Impact**: High
- **Target**: Production go-live by M12
- **Mitigation**:
  - Start sandbox integration in M2
  - Adopt certified SDKs
  - Threat modeling on BankID flows
  - Ephemeral tokens
  - Do not store personal numbers
  - Early reviews with BankID
  - Test across Sweden/Norway context including Freja eID compatibility
- **Contingency**:
  - Fallback auth (Freja eID/BankID Mobile)
  - Limit financial intents until approval
  - Adjust pilot scope to non-financial tasks
  - Escalate with BankID vendor support
- **Budget**: €70k (vendor support/cert €25k, security review €20k, test harness €25k)
- **WPs**: WP5, WP2

---

### Voice and Accessibility Challenges
- **Probability**: High
- **Impact**: High
- **Target**: EN 301 549 compliance
- **Mitigation**:
  - ASR/TTS tuned for Swedish/Norwegian seniors
  - Large touch targets, high-contrast themes, plain language
  - Progressive onboarding
  - Offline fallback for poor connectivity
  - Usability labs with seniors
  - Meet EN 301 549 functional performance statements
- **Contingency**:
  - Limit voice to supported intents
  - Default to chat + large-button UI
  - Add human support triggers for low confidence
  - Defer non-critical voice features
- **Budget**: €50k (ASR/TTS licensing €25k, usability labs €25k)
- **WPs**: WP4, WP3, WP6

---

### Security Vulnerabilities
- **Probability**: Medium
- **Impact**: High
- **Mitigation**:
  - DevSecOps pipeline (SAST/DAST, SBOM)
  - OWASP ASVS L2 baseline
  - KLASSA-based information classification
  - Encryption at rest/in-transit
  - Secrets vault
  - Threat modeling
  - External penetration tests
  - Least-privilege IAM
- **Contingency**:
  - Hotfix within 72h for critical CVEs
  - Rotate keys
  - Notify affected pilot sites per GDPR
  - Temporary feature deactivation
  - Additional pentest cycle
- **Budget**: €70k (pentest €35k, SAST/DAST €20k, threat modeling €15k)
- **WPs**: WP2, WP3

**Technical Risks Total**: €240k

---

## 2. RESOURCE RISKS

### Talent Acquisition in Competitive Swedish Market
- **Probability**: High
- **Impact**: High
- **Mitigation**:
  - Dedicated recruiter
  - Remote-friendly Nordic/EU hiring
  - Competitive equity
  - Clear mission branding (accessibility/security specialists)
  - Internship pipeline
  - Contractor bench for burst capacity
- **Contingency**:
  - Extend timelines for non-critical features
  - Outsource tasks (cert testing, pentest, UX research)
  - Increase contractor utilization 3–6 months
- **Budget**: €40k (recruiter fees €25k, employer branding €15k)
- **WPs**: WP1

---

### Key Person Dependency (2 Founders)
- **Probability**: Medium
- **Impact**: High
- **Mitigation**:
  - Document architecture/runbooks
  - Dual ownership of critical components
  - Cross-training
  - Code reviews
  - Disaster recovery exercises
- **Contingency**:
  - Interim technical lead via contractor
  - Defer complex feature launches
  - Reassign backlog to reduce bus-factor hotspots
- **Budget**: €15k (documentation tools, external audit of runbooks)
- **WPs**: WP1, WP3

---

### Budget Overruns
- **Probability**: Medium
- **Impact**: High
- **Mitigation**:
  - Monthly burn monitoring
  - Stage-gates tied to M12/M15/M16 deliverables
  - Rolling 90-day reforecast
  - Vendor rate cards
  - Cloud cost guardrails
- **Contingency**:
  - Pause low-ROI experiments
  - Reduce pilot count to minimum viable
  - Renegotiate licenses
  - Leverage credits/optimizations
- **Budget**: €15k (PMO tooling €10k, financial controller €5k)
- **WPs**: WP1

---

### Pilot Recruitment Failures
- **Probability**: Medium
- **Impact**: High
- **Target**: 10–15 sites, 250–450 users
- **Mitigation**:
  - Over-recruit LOIs (20+ sites)
  - Partner with PRO/SPF Seniorerna and municipal senior centers
  - Clear inclusion criteria
  - Site playbook
  - Incentives to sites and users
  - Ethical consent processes
- **Contingency**:
  - Add Norwegian sites
  - Use NGOs/private eldercare
  - Extend pilot window by 2–3 months
  - Scale down per-site targets but increase site count
- **Budget**: €35k (site/user incentives €20k, travel/outreach €15k)
- **WPs**: WP7

**Resource Risks Total**: €105k

---

## 3. REGULATORY/COMPLIANCE RISKS

### GDPR Violations
- **Probability**: Medium
- **Impact**: High
- **Sensitive use cases**: Banking, healthcare, government services
- **Mitigation**:
  - DPO retainer
  - DPIA/LIA for high-risk processing
  - Data minimization and purpose limitation
  - EU-only data residency
  - Vendor DPAs
  - Schrems II safeguards
  - Consent management and audit logs
  - Privacy by design reviews
- **Contingency**:
  - Suspend implicated processing
  - Notify DPA and affected users
  - Remediation plan
  - Independent audit
  - Reverify DPIA
  - Data deletion if needed
- **Budget**: €60k (DPO €30k, legal/audit €30k)
- **WPs**: WP2, WP6

---

### Accessibility Certification Failures
- **Probability**: Medium
- **Impact**: High
- **Target**: EN 301 549 by M15
- **Mitigation**:
  - Early gap analysis
  - Iterative audits
  - Include cognitive accessibility best practices
  - Test with low digital literacy cohorts
  - Meet Norwegian universal design and EAA timelines
  - Fix blockers by M13
- **Contingency**:
  - Narrow feature scope to meet minimum criteria
  - Provide alternative accessible workflows
  - Engage second lab for targeted retest
- **Budget**: €70k (consultant €30k, certification lab €40k)
- **WPs**: WP4, WP6

---

### Medical Device Classification Risk
- **Probability**: Low
- **Impact**: Medium
- **Risk**: MDR borderline classification
- **Mitigation**:
  - Avoid diagnostic/therapeutic claims
  - "Information/support" positioning
  - Disclaimers
  - MDR specialist review of copy and flows
  - Ensure AI outputs are advisory
  - Redirect clinical questions to providers
- **Contingency**:
  - Remove/alter features triggering classification
  - If unavoidable, plan MDR class I pathway scoping and timeline impact
- **Budget**: €20k (MDR regulatory counsel)
- **WPs**: WP6, WP8

---

### BankID Approval Delays
- **Probability**: Medium
- **Impact**: High
- **Target**: Production readiness M12
- **Mitigation**:
  - Start early with sandbox
  - Conformance checklist
  - UX alignment with BankID guidelines
  - Pre-submission review
  - Align logging/security per BankID requirements
- **Contingency**:
  - Fallback to Freja eID
  - Defer financial features
  - Maintain pilots with non-authenticated informational flows
  - Reschedule M12 to M13 while protecting M15/M16
- **Budget**: €25k (vendor liaison, pre-audit, sandbox infrastructure)
- **WPs**: WP5, WP2

**Regulatory/Compliance Risks Total**: €175k

---

## 4. MARKET/PARTNERSHIP RISKS

### Municipal Procurement Delays
- **Probability**: High
- **Impact**: Medium-High
- **Mitigation**:
  - Pre-tender engagement (RFI/dialogue meetings)
  - Piggyback on existing framework agreements via partners
  - Procurement advisor
  - Clear value cases tied to EAA/GDPR compliance and safety
- **Contingency**:
  - Go-to-market via NGOs/associations
  - Small direct-to-consumer pilot
  - Extend sales cycles
  - Add resellers with framework access
- **Budget**: €35k (procurement advisory €20k, stakeholder engagement €15k)
- **WPs**: WP7, WP8

---

### Pilot Site Failures
- **Probability**: Medium
- **Impact**: Medium
- **Risk**: Dropout, low usage
- **Mitigation**:
  - Strong site onboarding
  - Champion users
  - Weekly cadence
  - Usage dashboards
  - Quick support
  - Backup sites ready
  - Remove friction (hardware, login)
- **Contingency**:
  - Replace sites from over-recruited pool within 2–3 weeks
  - Offer additional support/incentives
  - Simplify scope to regain momentum
- **Budget**: €25k (backup site onboarding and support materials)
- **WPs**: WP7

---

### Competitive Responses
- **Probability**: Medium
- **Impact**: Medium
- **Risk**: Larger players entering market
- **Mitigation**:
  - Differentiate on accessibility rigor, safety features, BankID integrations
  - Municipal compliance (KLASSA, EAA)
  - Niche focus on vulnerable users
  - Partnerships with banks/health portals
  - Publish safety/performance metrics
- **Contingency**:
  - Accelerate features with clear moat (transaction safety, caregiver modes)
  - Targeted PR
  - Co-marketing with accessibility NGOs
- **Budget**: €20k (positioning work, communications assets)
- **WPs**: WP8

---

### Changing Tender Requirements
- **Probability**: Medium
- **Impact**: Medium
- **Mitigation**:
  - Modular architecture
  - Configurable policy engines
  - Keep non-functional requirements mapped (security, privacy, accessibility)
  - Maintain tender response library
- **Contingency**:
  - Rapid proposal updates
  - Negotiate variant compliance
  - Pilot under innovation clauses
- **Budget**: €15k (spec writing support, legal review)
- **WPs**: WP8, WP1

**Market/Partnership Risks Total**: €95k

---

## 5. USER SAFETY RISKS

### Elderly Users Making Financial Transaction Errors
- **Probability**: Medium-High
- **Impact**: High
- **Mitigation**:
  - Transaction guardrails (plain-language confirmation, repeat-back)
  - Second-factor via BankID
  - Limits by default
  - "Safe Mode" for beginners
  - Clear affordances and cancel/undo
  - Caregiver/trusted-contact review option
- **Contingency**:
  - Temporarily cap transaction amounts
  - Require human review for atypical transfers
  - Suspend banking flows for flagged users until re-onboarding
- **Budget**: €40k (design/research €20k, guardrail implementation €20k)
- **WPs**: WP5, WP4, WP3

---

### Scam Vulnerability
- **Probability**: High
- **Impact**: High
- **Risk**: Social engineering, phishing
- **Mitigation**:
  - On-device scam detection patterns (language/intent anomalies)
  - Scam education micro-modules
  - "Trusted Contacts" whitelist
  - Warnings on risky actions
  - Bank partner coordination on fraud signals
- **Contingency**:
  - Lock account flows if scam suspected
  - Notify caregiver/trusted contact
  - Guide user to bank fraud hotline
  - Post-incident coaching
- **Budget**: €35k (content and detection development €20k, partner integration €15k)
- **WPs**: WP5, WP3, WP7

---

### Cognitive Overload Leading to Misuse
- **Probability**: High
- **Impact**: Medium-High
- **Mitigation**:
  - Progressive disclosure
  - Cognitive-friendly UI
  - Consistent routines
  - Short steps
  - Multimodal feedback
  - A/B tested reading levels
  - Per-user adaptivity based on capability
- **Contingency**:
  - Switch affected users to simplified "Basic Mode"
  - Additional assisted onboarding
  - Pause complex flows
- **Budget**: €30k (UX research/testing and content simplification)
- **WPs**: WP4, WP7

---

### Data Breach Impact on Vulnerable Population
- **Probability**: Low-Medium
- **Impact**: High
- **Mitigation**:
  - Zero-trust posture
  - Encryption
  - Minimal data retention
  - Audit logging
  - Role-based access
  - Incident response playbook
  - Cyber insurance
  - Regular backups and recovery drills
- **Contingency**:
  - Execute breach response plan within 24h
  - Notify DPA/users
  - Forensic audit
  - Credentials rotation
  - Temporary service lockdown
  - Credit monitoring offering if appropriate
- **Budget**: €70k (incident tooling and retainer €30k, cyber insurance €40k)
- **WPs**: WP2, WP1

**User Safety Risks Total**: €175k

---

## RISK GOVERNANCE

### Governance Structure
- **Monthly risk review** in WP1 PMO
- **Owners assigned** per WP
- **Early-warning KPIs**: Pilot engagement, defect leakage, certification gap counts

### Milestone Alignment
- **BankID M12 mitigations**: Front-loaded
- **GDPR and EN 301 549 certification**: Centered M6–M15
- **Pilot recruitment and safety mitigations**: Run M8–M16

### Nordic Compliance Specifics
- Apply **KLASSA** for municipal info security classification
- Meet **EAA** and Norwegian universal design
- Ensure **EU data residency** and Schrems II-compliant vendor posture

---

## BUDGET SUMMARY BY CATEGORY

| Category | Budget | % of Total |
|----------|--------|-----------|
| Technical Risks | €240k | 30% |
| Resource Risks | €105k | 13% |
| Regulatory/Compliance | €175k | 22% |
| Market/Partnership | €95k | 12% |
| User Safety | €175k | 22% |
| **Total Mitigation** | **€790k** | **100%** |
| **Risk Reserve** | **€300k** | *Contingency* |

---

**Source**: Expert consultation via ask-expert (gpt-5, high reasoning)
