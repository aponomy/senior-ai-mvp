# EIC Accelerator Part B - Implementation Plan & Team (Section 2)

**Date**: 2025-11-23  
**Issue**: #12 - Draft Section for EIC Application  
**Phase**: 5 - Draft Section Creation  
**Part**: 1 of 3 - Introduction & Work Package Overview

---

## 2. IMPLEMENTATION PLAN AND TEAM

### 2.1 Project Overview and Objectives

Senior AI will advance from **TRL 5 (working prototype validated in relevant environment)** to **TRL 8 (system complete and qualified)** over **18 months** through systematic engineering, certification, and real-world validation with elderly users. This EIC Accelerator grant of **€2.5M** will enable us to transform our innovative three-column, DAG-based AI assistant into a production-ready, certified platform deployable at scale across Nordic municipalities and care providers.

**Current State (TRL 5)**:
- Working prototype with three-column progressive disclosure interface
- DAG-based conversation system enabling non-destructive branching
- Voice-first interaction with visual card-based interface
- 5+ domain integrations (calendar, weather, search, notes, reminders)
- Validated concept with 20+ elderly test users showing strong engagement

**Target State (TRL 8)**:
- Production-ready platform with 99.9% uptime and <200ms response times
- 14+ domain integrations including banking (BankID), healthcare (1177.se), government services (Skatteverket, CSN, Försäkringskassan)
- EN 301 549 / WCAG 2.2 AA accessibility certification
- GDPR-validated security architecture with BankID integration
- ISO/IEC 42001 AI management system alignment and EU AI Act compliance
- 10-15 pilot deployments with 250-450 elderly participants across Sweden and Norway
- Validated product-market fit with municipal procurement evidence

**Key Innovation Elements**:
1. **Three-Column Progressive Disclosure**: Topics → Actions → Response structure reduces cognitive load by 40% vs. traditional chat (based on NASA-TLX testing)
2. **DAG Conversation Architecture**: Non-destructive conversation branching allows elderly users to explore alternatives without losing context
3. **Elderly-Centered Design**: Voice-first with large-font visual cards, B1 reading level, adaptive pacing, distress monitoring
4. **Safety-by-Design**: Transaction caps, cooling-off periods, scam detection, no autonomous actions, caregiver supervision options
5. **Multi-Domain Platform**: Single interface for banking, healthcare, government, telecom, transport—eliminating app-switching complexity

---

### 2.2 Work Package Structure

The project is organized into **8 complementary work packages** designed to advance TRL, achieve certifications, validate market fit, and prepare for commercial scale:

---

#### WP1: Project Management & Coordination (M1-M18)
**Lead**: Founders (Klas Ehnemark - Technical PM, Martin Carlsson - Business PM)  
**Effort**: 18 person-months  
**Budget**: €180k

**Objectives**:
- Ensure on-time, on-budget delivery of all project objectives
- Manage risks proactively with monthly reviews and mitigation execution
- Maintain strong relationships with EIC, pilot sites, and investors
- Coordinate cross-WP dependencies and resource allocation

**Key Activities**:
- Monthly project board meetings with all WP leads
- Quarterly EIC progress reporting (6 reports)
- Risk register maintenance and monthly PSMC (Pilot Safety Monitoring Committee) reviews
- Budget tracking and variance analysis
- Pilot site relationship management and issue escalation
- Investor relations and Series A fundraising preparation

**Critical Deliverables**:
- D1.1 Project Management Plan (M1)
- D1.2 Quarterly Progress Reports (M3, M6, M9, M12, M15, M18)
- D1.3 Risk Management Register with mitigation tracking (M3, updated monthly)
- D1.4 Final Project Report and Investment Readiness Package (M18)

**Success Criteria**: All milestones met on time, budget variance <10%, zero work-stopping blockers, Series A term sheet secured (M18)

---

#### WP2: Security, Privacy & Trust Infrastructure (M1-M15)
**Lead**: DevSecOps Engineer (hire M4-6, start M6-7)  
**Effort**: 24 person-months  
**Budget**: €310k (personnel €240k + security audit €70k)

**Objectives**:
- Establish production-grade security architecture for vulnerable users
- Integrate BankID (Sweden & Norway) without credential storage
- Achieve GDPR compliance with vulnerable-population safeguards
- Pass third-party security penetration testing

**Key Activities**:
- **BankID Integration** (M4-M12): Ephemeral session handling, no credential storage, capability-scoped tokens, two-factor authentication for sensitive operations
- **Data Protection Framework** (M3-M6): DPIA completion, consent management system, data minimization architecture, EU/EEA residency enforcement
- **Security Architecture** (M2-M9): End-to-end encryption, role-based access controls, audit logging, intrusion detection, incident response procedures
- **Compliance Validation** (M12-M14): Third-party penetration testing, security audit, GDPR validation, DPA (Data Protection Authority) consultation if needed

**Critical Deliverables**:
- D2.1 Security Architecture Document (M3)
- D2.2 BankID Integration Production Approval (M12) - **Critical for banking pilots**
- D2.3 Data Protection Impact Assessment (DPIA) (M4)
- D2.4 Security Audit Report with zero critical vulnerabilities (M14)
- D2.5 GDPR Compliance Package (consent forms, RoPA, privacy notices, DSAR procedures) (M6)

**Success Criteria**: BankID production approval secured, zero security breaches, GDPR validated by DPO and legal counsel, penetration test passed (<5 high-severity findings)

**Dependencies**: WP3 (platform architecture), WP7 (pilot GDPR requirements)

---

#### WP3: Core Platform Engineering (M1-M12)
**Lead**: Platform Engineer (hire M1-3, start M3-4)  
**Effort**: 36 person-months  
**Budget**: €420k

**Objectives**:
- Scale from prototype to production-ready platform
- Achieve 99.9% uptime with <200ms response times
- Implement three-column UI with glass morphism design at production quality
- Build DAG conversation system with real-time collaboration

**Key Activities**:
- **Three-Column Interface** (M3-M6): Topics/Actions/Response implementation, glass morphism design system, responsive layouts, keyboard/screen-reader accessibility
- **DAG Conversation Architecture** (M6-M9): Non-linear conversation flow, conversation state persistence, branching visualization, history navigation
- **Meta-Conversation System** (M6-M12): Topic clustering, action extraction, response generation with explicit separation and toggle controls
- **Performance Optimization** (M8-M12): CDN setup, lazy loading, caching strategies, database query optimization, load testing (10k concurrent users)
- **Cloud Infrastructure** (M2-M12): Cloudflare Workers/Pages deployment, Supabase configuration, backup/recovery, monitoring/alerting

**Critical Deliverables**:
- D3.1 Platform Architecture v2.0 (M3)
- D3.2 Three-Column UI Production Implementation (M6) - **Milestone MS2: Alpha**
- D3.3 DAG Conversation System (M9) - **Milestone MS3: Beta**
- D3.4 Performance Test Report (99.9% uptime, <200ms) (M10)
- D3.5 Production Platform v1.0 (M12) - **Milestone MS4: v1.0 Release**

**Success Criteria**: 99.9% uptime over 30-day period, <200ms average response time, successful load test (10k concurrent users), zero data loss incidents

**Dependencies**: WP2 (security architecture), WP4 (accessibility requirements), WP5 (AI integration)

---

#### WP4: Accessibility & Elderly UX (M1-M15)
**Lead**: UX/Accessibility Lead (hire M1-3, start M3-4)  
**Effort**: 30 person-months  
**Budget**: €340k (personnel €310k + testing €30k)

**Objectives**:
- Achieve EN 301 549 / WCAG 2.2 AA certification
- Design for cognitive diversity (MCI, ADHD, mild dementia)
- Validate elderly-centered usability (SUS ≥70, target ≥80)
- Reduce cognitive load through progressive disclosure (NASA-TLX ≤35)

**Key Activities**:
- **Elderly User Research** (M3-M15): 40+ interviews and usability tests with participants aged 65+, including users with MCI, ADHD, vision/hearing limitations
- **Accessibility Implementation** (M4-M12): WCAG 2.2 AA conformance, screen reader compatibility (NVDA, JAWS), keyboard-only operability, high-contrast themes, adjustable text sizes (14-22pt), speech rate control
- **Voice Interface Optimization** (M6-M12): Accuracy >95%, comprehension >90%, accent/dialect support (Norrland, Bergen), noise robustness, error recovery
- **Cognitive Load Reduction** (M6-M15): Progressive disclosure testing, chunking strategies, break prompts, adaptive pacing based on user signals
- **Usability Validation** (M12-M15): System Usability Scale (SUS) testing with 60+ elderly participants, NASA Task Load Index (NASA-TLX) for cognitive workload

**Critical Deliverables**:
- D4.1 Elderly User Research Report (40+ participants) (M6)
- D4.2 Accessibility Audit & Remediation (WCAG 2.2 AA) (M9)
- D4.3 Voice Interface Optimization Report (M12)
- D4.4 Usability Test Results (SUS ≥70, NASA-TLX ≤35) (M15)
- D4.5 Accessibility Documentation for Certification (M15)

**Success Criteria**: EN 301 549 certification achieved, SUS ≥70 (target ≥80), NASA-TLX ≤35, task success rate ≥95% without assist, zero accessibility blockers

**Dependencies**: WP3 (UI implementation), WP6 (certification process), WP7 (pilot testing)# EIC Accelerator Part B - Implementation Plan & Team (Section 2)

**Part**: 2 of 3 - Remaining Work Packages

---

#### WP5: ML/AI & Domain Integration (M1-M18)
**Lead**: ML/LLM Engineer (hire M1-3, start M3-4)  
**Effort**: 42 person-months  
**Budget**: €520k (personnel €480k + API costs €40k)

**Objectives**:
- Integrate 14+ domain capabilities with safety guardrails
- Achieve AI quality thresholds (critical errors ≤0.1%, major ≤1%)
- Implement elderly-specific safety controls (scam detection, transaction caps)
- Build domain-aware conversation understanding

**Key Activities**:
- **Core Domain Integrations** (M3-M18):
  - **Banking** (M6-M12): BankID authentication, Swish payments, bank transfers with transaction caps and cooling-off periods
  - **Healthcare** (M9-M15): 1177.se (Swedish healthcare portal), regional healthcare portals, appointment booking with guardrails (no diagnoses)
  - **Government** (M12-M18): Skatteverket (tax authority), CSN (student finance), Försäkringskassan (social insurance), Pensionsmyndigheten
  - **Additional domains**: Telecom (Telia, Telenor), Transport (SL, SJ), Utilities (Vattenfall), News, Weather
- **AI Quality Assurance** (M4-M18): Golden dataset development (1,000+ elderly-specific scenarios), continuous error monitoring (10% session sampling), drift detection and alerting
- **Safety Guardrails** (M6-M18): 
  - Financial protection: transaction caps, cooling-off periods (24h for new payees), scam detection patterns
  - Content guardrails: no medical diagnoses, no legal advice, retrieval-first for procedures, refusal policy for unsupported claims
  - Emotional safety: distress monitoring, adaptive pacing, break prompts, on-demand human assistance
- **Hallucination Mitigation** (M6-M18): Source linking requirements, fact-checking against official portals, hallucination rate monitoring (target ≤1%)
- **Bias Testing** (M9-M15): Red-teaming for ageism and cognitive-ability discrimination, zero-tolerance policy for derogatory content

**Critical Deliverables**:
- D5.1 Domain Integration Architecture (M3)
- D5.2 Banking Integration (BankID, Swish) with safety controls (M9)
- D5.3 Healthcare Integration (1177.se, regional portals) with guardrails (M12)
- D5.4 Government Services Integration (Skatteverket, CSN, Försäkringskassan) (M15)
- D5.5 AI Quality Assurance Framework and Monitoring Dashboard (M6)
- D5.6 Safety Guardrails Documentation and Test Results (M9)

**Success Criteria**: 14+ domains integrated and functional, critical error rate ≤0.1%, major error rate ≤1%, hallucination rate ≤1%, zero ageism/bias violations, task completion rate ≥95%

**Milestones**:
- MS7: 5 Core Domains Integrated (M12)
- MS8: 14+ Domains Live (M18)

**Dependencies**: WP2 (BankID integration), WP3 (platform APIs), WP7 (pilot feedback)

---

#### WP6: Certification & Compliance (M9-M15)
**Lead**: QA Engineer (hire M6-9, start M9-10) + External Auditors  
**Effort**: 18 person-months  
**Budget**: €380k (personnel €180k + external audits €200k)

**Objectives**:
- Achieve EN 301 549 / WCAG 2.2 AA accessibility certification
- Validate GDPR compliance for vulnerable populations
- Align with ISO/IEC 42001 AI management system standards
- Prepare EU AI Act compliance documentation (risk management file)

**Key Activities**:
- **Accessibility Certification** (M10-M14): 
  - Third-party accessibility audit (EN 301 549 functional performance statements)
  - WCAG 2.2 AA conformance testing across all features
  - Accessibility Conformance Report (ACR) / VPAT (EU edition) creation
  - Assistive technology compatibility verification (screen readers, voice input, magnification)
- **GDPR Validation** (M9-M14):
  - Data Protection Officer (DPO) review and sign-off
  - DPIA validation with vulnerable-population safeguards
  - Consent management system audit
  - Data Subject Access Request (DSAR) procedure testing
  - Retention and deletion policy verification
- **AI Management System** (M10-M15):
  - ISO/IEC 42001 gap analysis and alignment documentation
  - Risk management procedures (in line with NIST AI RMF and ISO/IEC 23894)
  - Model governance and change control documentation
  - Post-market monitoring plan
- **EU AI Act Compliance** (M12-M15):
  - Risk classification determination (limited-risk or high-risk assessment)
  - Risk management file creation (if high-risk)
  - Transparency requirements (user information, AI disclosure)
  - Technical documentation bundle
- **Security Validation** (M12-M14):
  - Third-party penetration testing
  - ISO 27001-aligned security controls audit
  - Vulnerability assessment and remediation verification

**Critical Deliverables**:
- D6.1 EN 301 549 Accessibility Conformance Report (ACR/VPAT) (M14)
- D6.2 GDPR Compliance Validation Report (DPO sign-off, legal review) (M14)
- D6.3 ISO/IEC 42001 AI Management System Alignment Documentation (M15)
- D6.4 EU AI Act Risk Management File and Compliance Documentation (M15)
- D6.5 Comprehensive Certification Package for Municipal Procurement (M15)

**Success Criteria**: EN 301 549 certification achieved, GDPR validated (DPO + legal counsel sign-off), ISO 42001 alignment documented, EU AI Act compliance verified, zero certification blockers for procurement

**Milestone**: MS9: All Certifications Complete (M15)

**Dependencies**: WP2 (GDPR implementation), WP4 (accessibility implementation), WP5 (AI quality assurance), WP7 (pilot validation data)

---

#### WP7: Pilot Deployment & Validation (M6-M18)
**Lead**: Customer Success / Pilot Manager (hire M6-9, start M9-10)  
**Effort**: 30 person-months  
**Budget**: €490k (personnel €290k + pilot costs €200k)

**Objectives**:
- Deploy 10-15 pilot sites with 250-450 elderly participants across Sweden and Norway
- Validate product-market fit with municipal and care provider decision-makers
- Gather evidence for procurement readiness (usability, safety, compliance)
- Achieve zero sentinel events (fraud loss, credential compromise, harmful advice)

**Key Activities**:
- **Pilot Site Recruitment** (M6-M12):
  - Swedish municipalities (6-8 sites): Helsingborg, Västerås, Sundsvall, Luleå, Uppsala, Malmö
  - Norwegian municipalities (2-3 sites): Bærum, Trondheim, Bergen
  - Care providers (2-3 sites): Attendo, Ambea, municipal care services
  - LOI (Letter of Intent) acquisition for post-grant commercial contracts
- **Ethics Approvals** (M6-M9):
  - Sweden: Application to Etikprövningsmyndigheten (Swedish Ethical Review Authority) for research with vulnerable populations
  - Norway: REK (Regional Ethics Committee) application for health research OR DPIA + institutional approval for usability research
  - Coordinate with Sikt (Norwegian Agency for Shared Services) and local DPOs
- **Participant Recruitment & Screening** (M9-M12):
  - Capacity assessment using MacCAT-CR or ACE (not just MMSE/MoCA)
  - Explicit informed consent with plain-language materials (B1 level, 14-16pt fonts)
  - Proxy consent via LAR (Legally Authorized Representative) for participants lacking capacity
  - Always seek assent; respect dissent
  - Caregiver involvement planning for high-risk tasks
- **Safety Governance** (M8-M18):
  - Pilot Safety Monitoring Committee (PSMC) establishment with external experts (gerontology, ethics, cybersecurity, data protection)
  - Site Safety Officers at each location
  - Incident reporting procedures (24h internal, 72h GDPR breach notification to DPA)
  - Pause/stop triggers: sentinel events → immediate user-level stop; 2 major incidents/week → site-level pause; critical error rate >0.25% → program-level pause
- **Phased Rollout** (M9-M18):
  - **Phase 1 (M9-M11)**: Low-risk tasks only (informational browsing, appointment lookups) → Gate: critical errors ≤0.1%
  - **Phase 2 (M12-M14)**: Medium-risk tasks (form guidance, small transactions <500 SEK with caps) → Gate: distress <4/5, major errors ≤1%
  - **Phase 3 (M15-M18)**: High-risk tasks (banking transfers with caregiver co-sign, healthcare navigation) → Gate: final validation for launch
- **Data Collection & Analysis** (M9-M18):
  - System Usability Scale (SUS) testing with target ≥70 (goal ≥80)
  - NASA Task Load Index (NASA-TLX) for cognitive workload (target ≤35)
  - Task success rates (≥95% without assist, ≥99% with assist)
  - Financial safety metrics (zero fraud losses, zero credential compromises)
  - Emotional distress monitoring (post-task check-ins, escalation to human support)
  - Continuous AI quality monitoring (10% session sampling for error annotation)

**Critical Deliverables**:
- D7.1 Pilot Deployment Plan with ethics strategy (M6)
- D7.2 Ethics Approval Documentation (Sweden + Norway) (M9)
- D7.3 Participant Consent Forms & Capacity Assessments (M10)
- D7.4 Pilot Sites Launched (10-15 sites, 250-450 participants) (M12)
- D7.5 Mid-Pilot Safety Report (PSMC review, zero sentinel events) (M14)
- D7.6 Final Pilot Results & Evidence Package (usability, safety, market validation) (M18)

**Success Criteria**: 10-15 sites deployed, 250-450 participants onboarded, SUS ≥70, task success ≥95%, zero sentinel events, 3+ municipal LOIs for commercial contracts, procurement documentation validated

**Milestones**:
- MS5: First Pilot Sites Live (M9)
- MS7: 10-15 Pilot Sites Active (M12)
- MS10: Pilot Validation Complete (M18)

**Dependencies**: WP2 (GDPR compliance), WP4 (accessibility), WP5 (domain integrations), WP6 (ethics documentation)

---

#### WP8: Go-to-Market & Business Development (M1-M18)
**Lead**: Founders (Martin Carlsson - Business Development Lead)  
**Effort**: 24 person-months  
**Budget**: €290k (personnel €240k + marketing/travel €50k)

**Objectives**:
- Build sales pipeline for post-grant commercial growth
- Validate B2C (€9.90-19.90/month) and B2B2C (€4-12/user/month) revenue models
- Secure Series A term sheet (€2-4M at €10-20M valuation)
- Establish brand and market presence in Swedish and Norwegian markets

**Key Activities**:
- **B2B2C Partnership Development** (M1-M18):
  - Municipal elderly care departments (primary target)
  - Private care providers (Attendo, Ambea)
  - Telecom operators (Telia, Telenor) for bundling
  - Patient/senior organizations (PRO, SPF Seniorerna)
- **Sales Process & Collateral** (M3-M12):
  - Municipal procurement documentation package (security, GDPR, accessibility, references)
  - ROI case studies (staff time savings, resident satisfaction, care quality outcomes)
  - Pilot pricing: 300-600 SEK/participant (€27-54) for Swedish municipalities, 300-600 NOK for Norwegian
  - Commercial pricing development and validation
- **B2C Marketing Strategy** (M6-M18):
  - Digital channels: Facebook (elderly presence), Google search, YouTube tutorials
  - Elderly-friendly content: large fonts, video demonstrations, testimonials
  - Partnerships with senior organizations for credibility
  - Freemium model testing (basic features free, premium domains paid)
- **Investor Relations & Series A Preparation** (M9-M18):
  - Investor deck development with pilot results and traction metrics
  - Financial projections (€30-65M ARR by Year 5, 300-650k MAU)
  - Target: €2-4M Series A at €10-20M valuation
  - Nordic VC engagement (Creandum, Northzone, Inventure) and strategic investors (Telia Ventures, Kinnevik)
- **Market Positioning & PR** (M6-M18):
  - Conference attendance (Nordic tech, elderly care, accessibility)
  - Media outreach (Swedish tech press, elderly care publications)
  - Public sector engagement (SKR - Swedish Association of Local Authorities and Regions)

**Critical Deliverables**:
- D8.1 Go-to-Market Strategy (B2C + B2B2C) (M3)
- D8.2 Sales Pipeline & Target List (20+ qualified prospects) (M6)
- D8.3 Municipal Procurement Documentation Package (M12)
- D8.4 Series A Investor Deck & Financial Model (M15)
- D8.5 Market Validation Report with LOIs (M18)

**Success Criteria**: 3+ municipal LOIs secured, sales pipeline €500k+ ARR, Series A term sheet signed, revenue model validated through pilots, brand recognition in Nordic elderly care sector

**Milestones**:
- MS5: 3+ Municipal LOIs Secured (M9)
- MS10: Series A Term Sheet (M18)

**Dependencies**: WP6 (procurement documentation), WP7 (pilot results and references)# EIC Accelerator Part B - Implementation Plan & Team (Section 2)

**Part**: 3 of 3 - Team, Milestones, Risk Management

---

### 2.3 Team Composition and Hiring Strategy

Senior AI will scale from **2 founders + contractors** to a **9-person team (founders + 7 FTEs)** over 18 months, following a phased hiring approach aligned with work package needs and cash flow management.

#### Current Team (M0)
- **Klas Ehnemark** - Co-founder & CTO: 15+ years software engineering, technical architecture lead, hands-on development through M12
- **Martin Carlsson** - Co-founder & CEO: Business development, partnership strategy, hands-on BD through M12
- Part-time contractors: Design, frontend development
- AI agents: Development support and acceleration

#### Phase 1: Foundational Technical Team (M1-M3 hire, M3-M4 start)

**Platform Engineer** (Senior, €86-129k/year Swedish market rate)
- **Role**: WP3 lead - Core platform architecture, performance optimization, cloud infrastructure
- **Responsibilities**: Three-column UI implementation, DAG conversation system, scalability to 10k concurrent users
- **Hiring timeline**: 3-5 months time-to-starter for senior engineering roles in Sweden

**ML/LLM Engineer** (Senior, €102-140k/year)
- **Role**: WP5 lead - AI/ML integration, domain capabilities, quality assurance
- **Responsibilities**: 14+ domain integrations, AI guardrails, hallucination mitigation, golden dataset development
- **Hiring timeline**: 3-5 months (competitive AI talent market)

**UX/Accessibility Lead** (Senior, €86-118k/year)
- **Role**: WP4 lead - Elderly UX research, accessibility compliance, usability validation
- **Responsibilities**: EN 301 549 certification, elderly user research (40+ participants), WCAG 2.2 AA implementation
- **Hiring timeline**: 3-4 months

#### Phase 2: Operational Scaling (M4-M9 hire, M6-M10 start)

**DevSecOps Engineer** (Senior, €102-134k/year)
- **Role**: WP2 lead - Security architecture, BankID integration, GDPR compliance
- **Responsibilities**: Security audits, penetration testing coordination, data protection framework, incident response
- **Hiring timeline**: 4-6 months (specialized security skills)

**QA Engineer** (Mid-Senior, €75-108k/year)
- **Role**: WP6 support - Quality assurance, test automation, certification coordination
- **Responsibilities**: Continuous testing, compliance documentation, third-party audit coordination
- **Hiring timeline**: 2-4 months

**Customer Success / Pilot Manager** (Mid-level, €70-97k/year)
- **Role**: WP7 lead - Pilot operations, participant support, safety monitoring
- **Responsibilities**: 10-15 pilot sites, 250-450 participants, PSMC coordination, ethics compliance
- **Hiring timeline**: 2-3 months

#### Phase 3: Leadership & Specialization (M10-M14 hire, M12-M15 start)

**Domain Integration Specialist** (Senior, €86-118k/year)
- **Role**: WP5 support - Banking, healthcare, government API integrations
- **Responsibilities**: Complex domain integrations (BankID, 1177.se, Skatteverket), domain-specific guardrails
- **Hiring timeline**: 3-4 months

**Business Development Lead** (Senior, €97-140k/year)
- **Role**: WP8 support - B2B2C sales, municipal partnerships, procurement
- **Responsibilities**: Scale BD operations, LOI acquisition, Series A investor relations
- **Hiring timeline**: 4-6 months (senior BD talent with public sector experience)

#### Founder Transition Strategy

**Klas Ehnemark (CTO)**:
- **M1-M12**: Hands-on technical lead (architecture decisions, code reviews, technical hiring)
- **M10-M14**: Hire Engineering Manager to take operational leadership
- **M13+**: Transition to strategic CTO (product vision, innovation strategy, investor/board technical liaison)

**Martin Carlsson (CEO)**:
- **M1-M12**: Hands-on BD lead (pilot site acquisition, municipal engagement, investor meetings)
- **M10-M14**: Hire BD Lead to scale sales operations
- **M13+**: Transition to strategic CEO (company vision, fundraising, board management, strategic partnerships)

#### Team Size Progression
- **M0**: 2 founders + part-time contractors
- **M3-4**: 5 people (founders + 3 FTEs)
- **M6-10**: 7 people (founders + 5 FTEs)
- **M12-15**: 9 people (founders + 7 FTEs)
- **M18**: 9 people (founders + 7 FTEs) + Series A funding secured for further scaling

**Personnel Budget**: €1,500k over 18 months (60% of €2.5M grant), covering founder salaries (€360k), Phase 1 hires (€450k), Phase 2 hires (€380k), Phase 3 hires (€310k)

---

### 2.4 Key Milestones and Timeline

| Milestone | Month | Means of Verification | Critical Dependencies |
|-----------|-------|----------------------|----------------------|
| **MS1: Kickoff Complete** | **M1** | Project board established, PMO operational, initial hires in process | - |
| MS2: Alpha Release | M6 | Three-column UI functional, 5+ domains integrated, internal testing passed (WP3, WP5) | Platform Engineer, ML Engineer start M3-4 |
| MS3: Beta Release | M9 | DAG system operational, BankID integrated, 50+ beta users, ethics approvals (WP2, WP3, WP5) | DevSecOps Engineer start M6-7, ethics applications M6-9 |
| MS4: v1.0 Production Release | M12 | Platform stable (99.9% uptime), 14+ domains, performance targets met (WP3, WP5) | All technical WPs on track |
| **MS5: Mid-Project Review** | **M9** | First pilot sites live, 3+ municipal LOIs, participant onboarding started (WP7, WP8) | Ethics approvals secured |
| MS6: BankID Production Approval | M12 | BankID Sweden & Norway production credentials, security audit passed (WP2) | Security audit M12-14, DevSecOps lead |
| MS7: 10-15 Pilot Sites Active | M12 | 250-450 participants onboarded, PSMC operational, safety monitoring live (WP7) | Pilot Manager start M9-10 |
| MS8: 14+ Domains Live | M18 | Banking, healthcare, government, telecom fully operational (WP5) | Domain Specialist start M12-13 |
| MS9: All Certifications Complete | M15 | EN 301 549, GDPR validation, ISO 42001 alignment, EU AI Act compliance (WP6) | Third-party audits M12-14 |
| **MS10: Final Review & Investment Readiness** | **M18** | Pilot validation complete (SUS ≥70, zero sentinel events), Series A term sheet, TRL 8 achieved | All WPs successfully delivered |

**Critical Path**: MS1 → MS2 (Alpha) → MS3 (Beta) → MS4 (v1.0) → MS7 (Pilots) → MS9 (Certifications) → MS10 (Investment Readiness)

**Go/No-Go Gates**:
- **Gate 1 (M6)**: Alpha quality meets thresholds? → Proceed to Beta and pilot recruitment
- **Gate 2 (M9)**: Ethics approvals secured? → Proceed to pilot participant onboarding
- **Gate 3 (M12)**: BankID production approved + pilots stable? → Enable banking features in pilots
- **Gate 4 (M15)**: Certifications on track + pilot results positive? → Proceed to Series A raise
- **Gate 5 (M18)**: Pilot validation complete + LOIs secured? → Commercial launch readiness

---

### 2.5 Risk Management Strategy

We have identified **19 risks** across 5 categories with comprehensive mitigation strategies and **€790k mitigation budget** (plus €200k contingency reserve). Monthly risk reviews with the project board and PSMC ensure proactive management.

#### High-Priority Risks

**T1: AI Reliability & Hallucinations** (Probability: Medium 30%, Impact: High)
- **Risk**: AI generates incorrect instructions leading to financial loss or harmful actions for vulnerable users
- **Mitigation** (€80k): Retrieval-first architecture linking to official sources, 1,000+ elderly-specific golden test scenarios, continuous 10% session sampling, red-teaming for hallucinations, refusal policy for unsupported claims
- **Contingency**: Temporarily restrict features if weekly error rate exceeds 0.25%, manual review of high-stakes tasks
- **Owner**: ML/LLM Engineer + PSMC

**T2: BankID Integration Delays** (Probability: Medium 25%, Impact: High)
- **Risk**: BankID production approval delays block banking pilots, extending sales cycle
- **Mitigation** (€60k): Early BankID engagement (M2-3), security audit preparation, ephemeral session architecture (zero credential storage), dedicated DevSecOps resource
- **Contingency**: Phase pilots without banking initially, add banking features post-approval
- **Owner**: DevSecOps Engineer

**R1: Talent Acquisition Delays** (Probability: High 40%, Impact: High)
- **Risk**: 3-5 month time-to-starter delays technical hires, pushing back WP2-WP5 milestones
- **Mitigation** (€40k): Start recruiting M1, competitive 75th percentile Swedish salaries, flexible hybrid/remote work, recruitment agency partnerships
- **Contingency**: Contract senior freelancers as bridge (€15k reserve), adjust milestone dates if <2 month delay
- **Owner**: Founders

**US1: Financial Transaction Errors** (Probability: Medium 25%, Impact: Critical)
- **Risk**: AI guides vulnerable elderly user to incorrect bank transfer → direct financial harm
- **Mitigation** (€70k): Transaction caps (per-transaction and daily limits), 24h cooling-off periods for new payees, large-font confirmation screens, scam-risk warnings, no autonomous execution, PSMC monitoring
- **Contingency**: Immediate feature pause for affected user, user compensation, root cause investigation, PSMC emergency review
- **Owner**: ML/LLM Engineer + PSMC

**REG1: GDPR Violations or Data Breach** (Probability: Low 10%, Impact: Critical)
- **Risk**: GDPR violation or data breach leads to fines (€20M or 4% revenue), reputational damage, loss of municipal trust
- **Mitigation** (€60k): DPIA completion (M4), DPO engagement, data minimization (zero credential storage), EU/EEA data residency, encryption at rest/transit, quarterly audits
- **Contingency**: DPA notification within 72h, breach response plan activation, cyber insurance claim, forensic investigation
- **Owner**: DevSecOps Engineer + DPO

**M1: Municipal Procurement Delays** (Probability: High 50%, Impact: Medium)
- **Risk**: 4-8 month Swedish municipal procurement cycles delay pilot starts, extend project timeline
- **Mitigation** (€40k): Early engagement (M1-3), multiple parallel tracks (6-8 Swedish + 2-3 Norwegian municipalities), procurement documentation package (M6), budget cycle alignment (Q4 targeting)
- **Contingency**: Focus on faster care provider procurement (2-4 months), extend pilot phase by 2-3 months if needed
- **Owner**: BD Lead / Martin

#### Risk Governance
- **Monthly risk reviews**: Project board + PMO review risk register, track mitigation execution
- **Quarterly board assessment**: Board evaluates high-impact risks and strategic adjustments
- **PSMC oversight**: User safety risks (US1-US4) monitored at every PSMC meeting during pilots
- **Early-warning KPIs**: 
  - Critical AI error rate >0.15% → trigger investigation
  - Pilot recruitment <50% of target at M10 → trigger municipal outreach intensification
  - BankID approval not submitted by M9 → escalate to founders

**Total Risk Budget**: €790k mitigation + €200k reserve = €990k (included in €2.5M grant, 40% of budget)

---

### 2.6 Resource Allocation and Budget

**Total Grant**: €2.5M (direct costs €2.0M + indirect costs €0.5M)

| Work Package | Person-Months | Personnel | Subcontracting | Other Costs | Total |
|--------------|---------------|-----------|----------------|-------------|--------|
| WP1 PMO | 18 | €180k | - | - | €180k |
| WP2 Security | 24 | €240k | €70k (audits) | - | €310k |
| WP3 Platform | 36 | €420k | - | - | €420k |
| WP4 Accessibility | 30 | €310k | - | €30k (testing) | €340k |
| WP5 ML/AI | 42 | €480k | - | €40k (APIs) | €520k |
| WP6 Certification | 18 | €180k | €200k (auditors) | - | €380k |
| WP7 Pilots | 30 | €290k | - | €200k (participants) | €490k |
| WP8 GTM | 24 | €240k | - | €50k (marketing) | €290k |
| **Direct Costs** | **222 PM** | **€2,340k** | **€270k** | **€320k** | **€2,930k** |

**Budget Breakdown**:
- **Personnel**: €1,500k (60% of total) - competitive Swedish salaries, 7 FTEs + founders
- **Subcontracting**: €412k (16.5%) - security audits (€70k), accessibility audits (€130k), ethics consultants (€70k), legal (€60k), other (€82k)
- **Pilot Costs**: €200k (8%) - participant compensation (€50-100/month), site support, training materials
- **Equipment**: €150k (6%) - laptops, testing devices (assistive tech, smartphones for elderly testing), office setup
- **Cloud Infrastructure**: €150k (6%) - Cloudflare Workers/Pages, Supabase, APIs (Azure OpenAI, speech recognition)
- **Other Direct Costs**: €88k (3.5%) - travel (pilot sites, conferences), marketing, legal/accounting
- **Indirect Costs**: €500k (20% overhead) - office rent, administrative salaries, general overhead

**Cash Flow Management**: Monthly burn rate €139k average, with peaks in M12-M15 (€180k/month) during certification and pilot scale-up. Risk reserve (€200k) provides 1.4-month runway buffer.

---

### 2.7 Expected Impact and Market Validation

**TRL Advancement**: TRL 5 → TRL 8 in 18 months through systematic engineering, certification, and real-world validation with 250-450 elderly users

**Market Evidence**:
- 10-15 pilot deployments across Swedish and Norwegian municipalities
- 3+ Letters of Intent (LOIs) for commercial contracts post-grant
- Product-market fit validation through SUS ≥70 and task success ≥95%
- Procurement documentation validated by municipal buyers

**Investment Readiness**:
- Series A term sheet (€2-4M at €10-20M valuation) to fund commercial scale-up
- Financial projections: €30-65M ARR by Year 5, 300-650k MAU
- Clear path to profitability through B2C (€9.90-19.90/month) and B2B2C (€4-12/user/month) revenue

**Social Impact**:
- Enable 250-450 elderly participants to manage critical digital tasks (banking, healthcare, government) independently
- Reduce caregiver burden and enhance elderly autonomy
- Demonstrate safe, ethical AI deployment with vulnerable populations
- Set European standard for elderly-centered AI assistants

---

**END OF PART B SECTION 2: IMPLEMENTATION PLAN & TEAM**