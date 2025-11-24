# Implementation Plan & Team - Synthesis Document

**Date**: 2025-11-23  
**Issue**: #12 - Implementation Plan & Team  
**Phase**: 4 - Synthesis & Writing  
**Sources**: 5 expert consultations (12_01 through 12_05)

---

## EXECUTIVE SUMMARY

This synthesis consolidates comprehensive research for the EIC Accelerator Implementation Plan covering:
- **8 Work Packages** (WP1-WP8) over 18 months
- **Team scaling** from 2 founders to 7-9 people (€1.5M personnel)
- **€2.5M grant budget** (€2.0M direct + €0.5M indirect)
- **19 identified risks** with €790k mitigation + €300k reserve
- **10-15 pilot sites** targeting 250-450 elderly participants
- **TRL 5 → TRL 8** progression with 3 major certifications

---

## 1. WORK PACKAGE STRUCTURE

### WP1: Project Management & Coordination (M1-M18)
**Lead**: Founders (Klas technical PM, Martin business PM)  
**Effort**: 18 PM  
**Budget**: €180k

**Objectives**:
- Overall project coordination and quality assurance
- Risk management and mitigation execution
- Stakeholder communication (EIC, pilot sites, investors)
- Progress reporting and milestone verification

**Key Tasks**:
- Monthly project board meetings
- Quarterly EIC progress reports
- Risk register maintenance and monthly reviews
- Budget tracking and resource allocation
- Pilot site relationship management
- Investor relations and fundraising preparation

**Deliverables**:
- D1.1 Project Management Plan (M1)
- D1.2 Quarterly Progress Reports (M3, M6, M9, M12, M15, M18)
- D1.3 Risk Management Register (M3, updated M6/M9/M12/M15/M18)
- D1.4 Final Project Report (M18)

**Milestones**:
- MS1: Kickoff Complete (M1)
- MS5: Mid-Project Review (M9)
- MS10: Final Review & Investment Readiness (M18)

---

### WP2: Security, Privacy & Trust Infrastructure (M1-M15)
**Lead**: DevSecOps Engineer (hire M4-6)  
**Effort**: 24 PM  
**Budget**: €310k (personnel €240k + security audit €70k)

**Objectives**:
- Achieve GDPR compliance with vulnerable-population safeguards
- Implement BankID integration without credential storage
- Pass security penetration testing
- Establish data protection framework for pilots

**Key Tasks**:
- BankID integration (Sweden/Norway) with ephemeral session handling
- Capability-scoped token architecture
- End-to-end encryption for sensitive interactions
- GDPR compliance framework (DPIA, RoPA, consent management)
- Security audit and penetration testing (M12-14)
- Incident response procedures and DPA notification templates
- Data residency and localization (EU/EEA)

**Deliverables**:
- D2.1 Security Architecture Document (M3)
- D2.2 BankID Integration (Sweden/Norway) (M6)
- D2.3 Data Protection Impact Assessment (DPIA) (M4)
- D2.4 Security Audit Report (M14)
- D2.5 GDPR Compliance Package (consent forms, RoPA, privacy notices) (M6)

**Milestones**:
- MS6: BankID Production Approval (M12)
- MS9: Security Certification Complete (M15)

**Dependencies**: WP3 (platform architecture), WP7 (pilot GDPR requirements)

---

### WP3: Core Platform Engineering (M1-M12)
**Lead**: Platform Engineer (hire M1-3)  
**Effort**: 36 PM  
**Budget**: €420k

**Objectives**:
- Scale architecture from working prototype (TRL 5) to production-ready system
- Implement three-column progressive disclosure UI
- Build DAG-based conversation system with non-destructive branching
- Achieve 99.9% uptime with <200ms response times

**Key Tasks**:
- Three-column interface implementation with glass morphism design
- DAG conversation architecture (non-linear conversation flow)
- Meta-conversation system (Topic/Action/Response separation)
- Real-time collaboration infrastructure
- Performance optimization (CDN, caching, lazy loading)
- Scalability testing (load testing for 10k concurrent users)
- Cloud infrastructure setup (Cloudflare Workers/Pages, Supabase)

**Deliverables**:
- D3.1 Platform Architecture v2.0 (M3)
- D3.2 Three-Column UI Implementation (M6)
- D3.3 DAG Conversation System (M9)
- D3.4 Performance Test Report (M10)
- D3.5 Production Platform v1.0 (M12)

**Milestones**:
- MS2: Alpha Release (M6)
- MS3: Beta Release (M9)
- MS4: v1.0 Production Release (M12)

---

### WP4: Accessibility & Elderly UX (M1-M15)
**Lead**: UX/Accessibility Lead (hire M1-3)  
**Effort**: 30 PM  
**Budget**: €340k (personnel €310k + testing €30k)

**Objectives**:
- Achieve EN 301 549 / WCAG 2.2 AA compliance
- Design for cognitive diversity (MCI, ADHD, dementia)
- Validate usability with elderly users (SUS ≥70, NASA-TLX ≤35)
- Progressive disclosure to reduce cognitive load

**Key Tasks**:
- Elderly user research (interviews, usability testing with 40+ participants)
- Accessibility audit and remediation (WCAG 2.2 AA)
- Screen reader compatibility (NVDA, JAWS)
- Voice interface optimization (accuracy, speech rate, clarity)
- High-contrast themes and adjustable text sizes
- Cognitive load testing (NASA-TLX)
- Usability testing across cognitive profiles (MCI, ADHD, dementia)# Implementation Plan Synthesis - Part 2: WP5-WP8 & Team

**Continued from Part 1**

---

### WP5: ML/AI & Domain Integration (M1-M18)
**Lead**: ML/LLM Engineer (hire M1-3)  
**Effort**: 42 PM  
**Budget**: €520k (personnel €480k + API costs €40k)

**Objectives**:
- Integrate 14+ domain capabilities (banking, healthcare, government, etc.)
- Achieve AI quality thresholds (critical errors ≤0.1%, major ≤1%)
- Implement safety guardrails for vulnerable users
- Build domain-aware conversation understanding

**Key Tasks**:
- Domain integration: Banking (BankID, Swish), Healthcare (1177.se), Government (Skatteverket, CSN, Försäkringskassan)
- AI output quality assurance framework
- Guardrails: No medical diagnoses, no legal advice, retrieval-first for procedures
- Hallucination detection and mitigation (≤1% hallucination rate)
- Red-teaming for ageism and cognitive-ability bias
- Transaction safety: caps, cooling-off periods, scam detection
- Continuous QA monitoring (10% session sampling)

**Deliverables**:
- D5.1 Domain Integration Architecture (M3)
- D5.2 Banking Integration (BankID, Swish) (M9)
- D5.3 Healthcare Integration (1177.se, regional portals) (M12)
- D5.4 Government Services Integration (Skatteverket, CSN) (M15)
- D5.5 AI Quality Assurance Framework (M6)
- D5.6 Safety Guardrails Documentation (M9)

**Milestones**:
- MS7: 5 Core Domains Integrated (M12)
- MS8: 14+ Domains Live (M18)

---

### WP6: Certification & Compliance (M9-M15)
**Lead**: QA Engineer (hire M6-9) + External Auditors  
**Effort**: 18 PM  
**Budget**: €380k (personnel €180k + audits €200k)

**Objectives**:
- EN 301 549 / WCAG 2.2 AA accessibility certification
- GDPR validation for vulnerable populations
- ISO/IEC 42001 AI management system alignment
- EU AI Act readiness (risk management file, transparency, post-market monitoring)

**Key Tasks**:
- Accessibility Conformance Report (ACR/VPAT EU edition)
- GDPR compliance validation (DPIA, consent procedures, data minimization)
- ISO 27001-aligned security controls
- EU AI Act compliance documentation
- Pre-market testing and documentation
- Third-party accessibility audit
- Security penetration testing

**Deliverables**:
- D6.1 EN 301 549 Accessibility Conformance Report (M14)
- D6.2 GDPR Compliance Validation Report (M14)
- D6.3 ISO/IEC 42001 Alignment Documentation (M15)
- D6.4 EU AI Act Risk Management File (M15)
- D6.5 Certification Package for Procurement (M15)

**Milestones**:
- MS9: All Certifications Complete (M15)

---

### WP7: Pilot Deployment & Validation (M6-M18)
**Lead**: Customer Success / Pilot Manager (hire M6-9)  
**Effort**: 30 PM  
**Budget**: €490k (personnel €290k + pilot costs €200k)

**Objectives**:
- Deploy 10-15 pilot sites with 250-450 elderly participants
- Validate product-market fit in Swedish/Norwegian municipalities
- Gather evidence for procurement readiness
- Achieve SUS ≥70 and task success ≥95%

**Key Tasks**:
- Pilot site recruitment (municipalities, care providers)
- Ethics approvals (Sweden Etikprövningsmyndigheten, Norway REK/Sikt)
- Participant recruitment and screening (capacity assessment, consent)
- Pilot Safety Monitoring Committee (PSMC) establishment
- Training delivery (participants, caregivers, municipal staff)
- Safety monitoring (financial protection, distress monitoring, incident reporting)
- Phased rollout: Phase 1 low-risk tasks, Phase 2 medium-risk, Phase 3 high-risk
- Data collection and analysis (SUS, NASA-TLX, task success rates)

**Deliverables**:
- D7.1 Pilot Deployment Plan (M6)
- D7.2 Ethics Approval Documentation (M9)
- D7.3 Pilot Participant Consent & Capacity Assessments (M10)
- D7.4 Pilot Sites Launched (10-15 sites) (M12)
- D7.5 Mid-Pilot Safety Report (M14)
- D7.6 Final Pilot Results & Evidence Package (M18)

**Milestones**:
- MS5: First Pilot Sites Live (M9)
- MS7: 10-15 Pilot Sites Active (M12)
- MS10: Pilot Validation Complete (M18)

**Critical Success Factors**:
- Critical error rate ≤0.1%, major ≤1%
- SUS ≥70 (target ≥80)
- Task success ≥95% without assist, ≥99% with assist
- Zero sentinel events (fraud loss, credential compromise, harmful advice)

---

### WP8: Go-to-Market & Business Development (M1-M18)
**Lead**: Founders (Martin business development lead)  
**Effort**: 24 PM  
**Budget**: €290k (personnel €240k + marketing €50k)

**Objectives**:
- Establish sales pipeline for post-grant growth
- Validate B2C and B2B2C revenue models
- Prepare for €2-4M Series A raise
- Build brand and market presence in Nordics

**Key Tasks**:
- B2B2C partnership development (municipalities, care providers, telecom)
- B2C marketing strategy (digital channels, elderly-friendly content)
- Sales collateral and procurement documentation
- Pricing validation (B2C €9.90-19.90/mo, B2B2C €4-12/user/mo)
- Investor relations and Series A preparation
- Brand development and positioning
- Public sector engagement (conferences, procurement frameworks)

**Deliverables**:
- D8.1 Go-to-Market Strategy (M3)
- D8.2 Sales Pipeline & Target List (M6)
- D8.3 Procurement Documentation Package (M12)
- D8.4 Series A Investor Deck (M15)
- D8.5 Market Validation Report (M18)

**Milestones**:
- MS5: 3+ Municipal LOIs Secured (M9)
- MS10: Series A Term Sheet (M18)

---

## 2. TEAM COMPOSITION & HIRING PLAN

### Current Team (M0)
- **Klas Ehnemark** - Co-founder, CTO (Technical Lead)
- **Martin Carlsson** - Co-founder, CEO (Business Lead)
- Part-time contractors (design, development)
- AI agents (development support)

---

### Phase 1 Hires (M1-M3) - Foundational Technical Team

**Platform Engineer** (M1-3 hire, start M3-4)
- **Role**: Core platform architecture, performance, scalability
- **Salary**: €86-129k/year (Swedish market, senior level)
- **Time-to-starter**: 3-5 months
- **Responsibilities**: WP3 lead, three-column UI, DAG system, cloud infrastructure

**ML/LLM Engineer** (M1-3 hire, start M3-4)
- **Role**: AI/ML integration, domain capabilities, quality assurance
- **Salary**: €102-140k/year
- **Time-to-starter**: 3-5 months
- **Responsibilities**: WP5 lead, domain integration, AI guardrails, hallucination mitigation

**UX/Accessibility Lead** (M1-3 hire, start M3-4)
- **Role**: Elderly UX research, accessibility compliance, usability testing
- **Salary**: €86-118k/year
- **Time-to-starter**: 3-4 months
- **Responsibilities**: WP4 lead, EN 301 549 compliance, elderly user research

---

### Phase 2 Hires (M4-M9) - Operational Scaling

**DevSecOps Engineer** (M4-6 hire, start M6-7)
- **Role**: Security architecture, BankID integration, GDPR compliance
- **Salary**: €102-134k/year
- **Time-to-starter**: 4-6 months
- **Responsibilities**: WP2 lead, security audits, data protection, incident response

**QA Engineer** (M6-9 hire, start M9-10)
- **Role**: Quality assurance, testing automation, certification support
- **Salary**: €75-108k/year
- **Time-to-starter**: 2-4 months
- **Responsibilities**: WP6 support, test automation, compliance documentation

**Customer Success / Pilot Manager** (M6-9 hire, start M9-10)
- **Role**: Pilot site management, participant support, data collection
- **Salary**: €70-97k/year
- **Time-to-starter**: 2-3 months
- **Responsibilities**: WP7 lead, pilot operations, safety monitoring, ethics compliance

---

### Phase 3 Hires (M10-M18) - Leadership & Specialization

**Domain Integration Specialist** (M10-12 hire, start M12-13)
- **Role**: Banking, healthcare, government service integration
- **Salary**: €86-118k/year
- **Time-to-starter**: 3-4 months
- **Responsibilities**: WP5 support, API integrations, domain-specific guardrails

**Business Development Lead** (M10-14 hire, start M14-15)
- **Role**: B2B2C sales, municipal partnerships, procurement
- **Salary**: €97-140k/year
- **Time-to-starter**: 4-6 months
- **Responsibilities**: WP8 support, pilot site acquisition, Series A preparation

---

### Founder Transition Strategy

**Klas (CTO)**:
- M1-12: Hands-on technical lead (architecture, code reviews, technical decisions)
- M10-14: Hire Engineering Manager to take operational leadership
- M13+: Transition to strategic CTO role (vision, innovation, investor relations)

**Martin (CEO)**:
- M1-12: Hands-on BD lead (pilot site acquisition, investor relations)
- M10-14: Hire BD Lead to scale sales operations
- M13+: Transition to strategic CEO role (company vision, fundraising, board management)

---

### Team Size Progression
- **M0**: 2 founders + contractors
- **M3-4**: 5 people (founders + 3 FTEs)
- **M6-9**: 7 people (founders + 5 FTEs)
- **M12-15**: 9 people (founders + 7 FTEs)
- **M18**: 9 people (founders + 7 FTEs)

---

### Personnel Budget Summary
- **Total Personnel**: €1,500k over 18 months
- **Founders**: €360k (€20k/month combined)
- **Phase 1 Hires**: €450k (Platform, ML, UX)
- **Phase 2 Hires**: €380k (DevSecOps, QA, Pilot Manager)
- **Phase 3 Hires**: €310k (Domain Specialist, BD Lead)

---

## 3. RESOURCE ALLOCATION MATRIX

| Work Package | PM | Personnel € | Subcontr. € | Other € | Total € |
|--------------|----|-----------:|------------:|--------:|--------:|
| WP1 PMO | 18 | €180k | - | - | €180k |
| WP2 Security | 24 | €240k | €70k | - | €310k |
| WP3 Platform | 36 | €420k | - | - | €420k |
| WP4 Accessibility | 30 | €310k | - | €30k | €340k |
| WP5 ML/AI | 42 | €480k | - | €40k | €520k |
| WP6 Certification | 18 | €180k | €200k | - | €380k |
| WP7 Pilots | 30 | €290k | - | €200k | €490k |
| WP8 GTM | 24 | €240k | - | €50k | €290k |
| **Direct Costs** | **222** | **€2,340k** | **€270k** | **€320k** | **€2,930k** |

### Budget Categories (€2.5M Total Grant)
- **Personnel**: €1,500k (60% of total)
- **Subcontracting**: €412k (16.5%) - audits, certifications, external expertise
- **Pilot Costs**: €200k (8%) - participant compensation, site support
- **Equipment**: €150k (6%) - laptops, testing devices, assistive tech
- **Cloud Infrastructure**: €150k (6%) - hosting, APIs, storage
- **Other Direct Costs**: €88k (3.5%) - travel, marketing, legal
- **Indirect Costs**: €500k (20% overhead)

**Total**: €3.0M (€2.5M grant + €0.5M company contribution)# Implementation Plan Synthesis - Part 3: Deliverables & Milestones

**Continued from Part 2**

---

## 4. COMPLETE DELIVERABLES LIST

### WP1: Project Management & Coordination

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D1.1 | Project Management Plan | M1 | EIC review |
| D1.2 | Quarterly Progress Reports | M3, M6, M9, M12, M15, M18 | EIC submission |
| D1.3 | Risk Management Register | M3, updated M6/M9/M12/M15/M18 | Monthly PSMC review |
| D1.4 | Final Project Report | M18 | EIC final review |

### WP2: Security, Privacy & Trust

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D2.1 | Security Architecture Document | M3 | Technical review |
| D2.2 | BankID Integration (SE/NO) | M6 | Production approval from BankID |
| D2.3 | Data Protection Impact Assessment | M4 | DPO sign-off, DPA consultation |
| D2.4 | Security Audit Report | M14 | Third-party security audit |
| D2.5 | GDPR Compliance Package | M6 | Legal counsel review, DPO approval |

### WP3: Core Platform Engineering

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D3.1 | Platform Architecture v2.0 | M3 | Technical review |
| D3.2 | Three-Column UI Implementation | M6 | User acceptance testing |
| D3.3 | DAG Conversation System | M9 | Functional testing |
| D3.4 | Performance Test Report | M10 | 99.9% uptime, <200ms response |
| D3.5 | Production Platform v1.0 | M12 | Release readiness review |

### WP4: Accessibility & Elderly UX

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D4.1 | Elderly User Research Report | M6 | 40+ user interviews/tests |
| D4.2 | Accessibility Audit & Remediation | M9 | WCAG 2.2 AA conformance |
| D4.3 | Voice Interface Optimization | M12 | Accuracy >95%, comprehension >90% |
| D4.4 | Usability Test Results | M15 | SUS ≥70, NASA-TLX ≤35 |
| D4.5 | Accessibility Documentation | M15 | EN 301 549 evidence |

### WP5: ML/AI & Domain Integration

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D5.1 | Domain Integration Architecture | M3 | Technical review |
| D5.2 | Banking Integration (BankID, Swish) | M9 | BankID production approval |
| D5.3 | Healthcare Integration (1177.se) | M12 | Regional portal testing |
| D5.4 | Government Services (Skatteverket, CSN) | M15 | End-to-end testing |
| D5.5 | AI Quality Assurance Framework | M6 | Critical errors ≤0.1%, Major ≤1% |
| D5.6 | Safety Guardrails Documentation | M9 | PSMC approval |

### WP6: Certification & Compliance

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D6.1 | EN 301 549 ACR/VPAT | M14 | Third-party accessibility audit |
| D6.2 | GDPR Compliance Validation | M14 | DPO sign-off, legal review |
| D6.3 | ISO/IEC 42001 Alignment | M15 | Internal audit, gap analysis |
| D6.4 | EU AI Act Risk Management File | M15 | Legal counsel review |
| D6.5 | Certification Package for Procurement | M15 | Municipal procurement review |

### WP7: Pilot Deployment & Validation

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D7.1 | Pilot Deployment Plan | M6 | PSMC approval |
| D7.2 | Ethics Approval Documentation | M9 | Etikprövningsmyndigheten (SE), REK (NO) |
| D7.3 | Participant Consent & Capacity Assessments | M10 | Ethics compliance review |
| D7.4 | Pilot Sites Launched (10-15 sites) | M12 | 250-450 participants onboarded |
| D7.5 | Mid-Pilot Safety Report | M14 | PSMC review, zero sentinel events |
| D7.6 | Final Pilot Results & Evidence | M18 | SUS ≥70, task success ≥95% |

### WP8: Go-to-Market & Business Development

| ID | Title | Due | Verification |
|----|-------|-----|--------------|
| D8.1 | Go-to-Market Strategy | M3 | Board approval |
| D8.2 | Sales Pipeline & Target List | M6 | 20+ qualified prospects |
| D8.3 | Procurement Documentation Package | M12 | Municipal procurement review |
| D8.4 | Series A Investor Deck | M15 | Investor feedback |
| D8.5 | Market Validation Report | M18 | Revenue model validation |

**Total Deliverables**: 36 across 8 work packages

---

## 5. MILESTONES TABLE

| ID | Title | Month | Means of Verification | Dependencies |
|----|-------|-------|----------------------|--------------|
| **MS1** | **Kickoff Complete** | **M1** | Team hired, work started, PMO established | - |
| MS2 | Alpha Release | M6 | Three-column UI functional, 5+ domains integrated, internal testing complete | WP3, WP5 |
| MS3 | Beta Release | M9 | DAG system operational, BankID integrated, 50+ beta users | WP2, WP3, WP5 |
| MS4 | v1.0 Production Release | M12 | Platform stable (99.9% uptime), 14+ domains, performance targets met | WP3, WP5 |
| **MS5** | **Mid-Project Review** | **M9** | First pilot sites live, 3+ municipal LOIs, ethics approvals secured | WP7, WP8 |
| MS6 | BankID Production Approval | M12 | BankID Sweden & Norway production credentials, security audit passed | WP2 |
| MS7 | 10-15 Pilot Sites Active | M12 | 250-450 participants onboarded, safety monitoring active, 5 core domains validated | WP7 |
| MS8 | 14+ Domains Live | M18 | Banking, healthcare, government, telecom, transport, utilities, etc. fully operational | WP5 |
| MS9 | All Certifications Complete | M15 | EN 301 549, GDPR validation, ISO 42001 alignment, EU AI Act compliance | WP6 |
| **MS10** | **Final Review & Investment Readiness** | **M18** | Pilot validation complete, Series A term sheet, TRL 8 achieved | All WPs |

**Critical Path**: MS1 → MS2 → MS3 → MS4 → MS7 → MS9 → MS10

**Go/No-Go Gates**:
- **Gate 1 (M6)**: Alpha quality acceptable? → Proceed to Beta
- **Gate 2 (M9)**: Ethics approvals secured? → Proceed to pilots
- **Gate 3 (M12)**: BankID production approved? → Enable banking features
- **Gate 4 (M15)**: Certifications on track? → Proceed to market launch prep
- **Gate 5 (M18)**: Pilot results positive? → Series A raise

---

## 6. PARTNERSHIP STRATEGY & PILOT ACQUISITION

### Target Pilot Sites (10-15 Total)

**Swedish Municipalities (6-8 sites)**:
- Helsingborg (elderly care innovation leader)
- Västerås (digital services focus)
- Sundsvall (rural elderly population)
- Luleå (northern Sweden representation)
- Uppsala (academic partnership potential)
- Malmö (diversity, multicultural elderly)

**Norwegian Municipalities (2-3 sites)**:
- Bærum (affluent, high digital adoption)
- Trondheim (tech-forward, university connection)
- Bergen (coastal, elderly services focus)

**Care Providers (2-3 sites)**:
- Attendo (largest private care provider in Nordics)
- Ambea (digital health focus)
- Municipal care services (integrated with municipality pilots)

---

### Sales Cycles & Procurement

**Swedish Municipalities**:
- **Timeline**: 4-8 months from first contact to pilot start
- **Decision-makers**: Elderly care director, IT director, procurement, legal/DPO
- **Procurement requirements**: GDPR compliance, security, accessibility (DOS-lagen), references
- **Budget cycle**: Annual, Q4 planning for next year
- **Pilot pricing**: 300-600 SEK/participant (€27-54)

**Norwegian Municipalities**:
- **Timeline**: 3-6 months (more streamlined than Sweden)
- **Decision-makers**: Similar to Sweden, plus universal design compliance officer
- **Procurement requirements**: GDPR, universal design regulations, accessibility
- **Budget cycle**: Similar to Sweden
- **Pilot pricing**: 300-600 NOK/participant (~€27-54)

**Care Providers**:
- **Timeline**: 2-4 months (faster than municipalities)
- **Decision-makers**: COO, care quality director, IT director
- **Procurement focus**: Care quality outcomes, staff efficiency, resident satisfaction
- **Pilot pricing**: 400-800 SEK/participant (€36-72) - higher willingness to pay

---

### Resource Allocation for Pilot Acquisition

**Business Development (40-46 PM total)**:
- Founder BD (Martin): 9-12 PM (M1-M12 hands-on, then oversight)
- BD Manager (hire M10-14): 15 PM (M14-M18 active selling)
- Sales Engineer: 6 PM (technical presentations, security questions)
- Customer Success: 6-8 PM (pilot support, relationship management)
- Legal/Compliance: 4-6 PM (contracts, DPAs, ethics applications)

**Activities by Phase**:
- **M1-3**: Target list finalization, outreach sequences, conference attendance
- **M4-6**: Initial meetings (20-30 prospects), needs assessment, proposal development
- **M7-9**: Ethics applications, procurement submissions, contract negotiations
- **M10-12**: Pilot onboarding, training delivery, site setup
- **M13-18**: Pilot operations, expansion discussions, reference building

---

## 7. RISK REGISTER WITH MITIGATION STRATEGIES

### Technical Risks (€240k mitigation budget)

**T1: AI Reliability & Hallucinations**
- **Probability**: Medium (30%)
- **Impact**: High (critical errors → harm to vulnerable users)
- **Mitigation** (€80k):
  - Retrieval-first architecture (link to official sources)
  - Golden dataset testing (1,000+ elderly-specific scenarios)
  - Red-teaming for hallucinations
  - Continuous QA (10% session sampling)
  - Refusal policy for unsupported claims
- **Contingency**: Temporarily restrict features if error rate > 0.25%
- **Owner**: ML/LLM Engineer

**T2: BankID Integration Complexity**
- **Probability**: Medium (25%)
- **Impact**: High (blocks banking features, delays pilots)
- **Mitigation** (€60k):
  - Early engagement with BankID (M2-3)
  - Security audit preparation (penetration testing)
  - Ephemeral session architecture (no credential storage)
  - Dedicated DevSecOps resource
- **Contingency**: Phase pilots without banking initially, add later
- **Owner**: DevSecOps Engineer

**T3: Voice Interface Accessibility**
- **Probability**: Low (15%)
- **Impact**: Medium (usability issues for hearing-impaired, accents)
- **Mitigation** (€50k):
  - Multi-vendor speech recognition testing
  - Accent and regional dialect testing (Norrland, Bergen, etc.)
  - Text fallback always available
  - Adjustable speech rate and volume
- **Contingency**: Enhanced visual mode for users with hearing challenges
- **Owner**: UX/Accessibility Lead

**T4: Security Vulnerabilities**
- **Probability**: Medium (20%)
- **Impact**: Critical (data breach, credential exposure)
- **Mitigation** (€50k):
  - Quarterly penetration testing
  - Bug bounty program (M9+)
  - Security audit (M12-14)
  - Incident response plan and DPA notification templates
- **Contingency**: Immediate pause, breach notification, forensic investigation
- **Owner**: DevSecOps Engineer

---

### Resource Risks (€105k mitigation budget)

**R1: Talent Acquisition Delays**
- **Probability**: High (40%)
- **Impact**: High (delays to WP2-WP5, missed milestones)
- **Mitigation** (€40k):
  - Start recruiting M1 (3-5 month time-to-starter)
  - Competitive salaries (75th percentile Swedish market)
  - Flexible work arrangements (hybrid/remote)
  - Recruitment agency partnerships (€25k contingency)
- **Contingency**: Contract senior freelancers as bridge (€15k reserve)
- **Owner**: Founders

**R2: Key Person Dependency**
- **Probability**: Low (10%)
- **Impact**: Critical (founder absence disrupts project)
- **Mitigation** (€30k):
  - Cross-training and documentation
  - Deputy roles for critical functions
  - Knowledge transfer sessions
  - Key person insurance
- **Contingency**: Interim management, accelerate leadership hires
- **Owner**: Board

**R3: Budget Overruns**
- **Probability**: Medium (25%)
- **Impact**: High (unable to complete all WPs)
- **Mitigation** (€20k):
  - Monthly budget tracking and variance analysis
  - 15% contingency buffer (€300k risk reserve)
  - Prioritization framework (must-have vs nice-to-have)
- **Contingency**: Reduce scope (fewer pilot sites, fewer domains)
- **Owner**: Founders / PMO

**R4: Pilot Recruitment Difficulties**
- **Probability**: Medium (30%)
- **Impact**: High (insufficient validation, weak evidence)
- **Mitigation** (€15k):
  - Early municipal engagement (M1-3)
  - Multiple recruitment channels (municipalities, care providers, patient organizations)
  - Participant compensation (€50-100/month)
  - Ethics approval support
- **Contingency**: Extend pilot phase, reduce sample size (acceptable if quality maintained)
- **Owner**: Pilot Manager

---

### Regulatory Risks (€175k mitigation budget)

**REG1: GDPR Violations or Data Breach**
- **Probability**: Low (10%)
- **Impact**: Critical (fines €20M or 4% revenue, reputational damage)
- **Mitigation** (€60k):
  - DPIA completion (M4)
  - DPO engagement
  - Data minimization (no credential storage)
  - EU/EEA data residency
  - Encryption at rest and in transit
  - Regular audits
- **Contingency**: DPA notification within 72h, breach response plan, cyber insurance
- **Owner**: DevSecOps Engineer + DPO

**REG2: Accessibility Certification Failure**
- **Probability**: Low (15%)
- **Impact**: High (blocks procurement, delays pilots)
- **Mitigation** (€50k):
  - Early accessibility testing (M6+)
  - Third-party audit (M13-14)
  - Remediation budget and timeline
  - WCAG 2.2 AA as minimum from day 1
- **Contingency**: Remediation sprint, delay market launch if needed
- **Owner**: UX/Accessibility Lead + QA Engineer

**REG3: Medical Device Classification Risk**
- **Probability**: Low (10%)
- **Impact**: High (MDR compliance required, 12-18 month delay)
- **Mitigation** (€40k):
  - Legal opinion on classification (M3)
  - Avoid diagnostic/therapeutic claims
  - Position as "digital assistant" not "health device"
  - Consultation with medical device experts
- **Contingency**: If classified as MDR: pivot to non-health use cases, or pursue MDR pathway
- **Owner**: Founders + Legal Counsel

**REG4: BankID Production Approval Delays**
- **Probability**: Medium (25%)
- **Impact**: High (delays banking features, pilot impact)
- **Mitigation** (€25k):
  - Early application (M6)
  - Security audit preparation
  - Compliance with BankID requirements
  - Regular communication with BankID team
- **Contingency**: Phase pilots without banking, add banking features later
- **Owner**: DevSecOps Engineer# Implementation Plan Synthesis - Part 4: Risks, QA, Timeline

**Continued from Part 3**

---

### Market Risks (€95k mitigation budget)

**M1: Municipal Procurement Delays**
- **Probability**: High (50%)
- **Impact**: Medium (delays pilots, extends sales cycle)
- **Mitigation** (€40k):
  - Early engagement (M1-3)
  - Multiple parallel tracks (6-8 Swedish, 2-3 Norwegian municipalities)
  - Procurement support (documentation package, compliance evidence)
  - Budget cycle alignment (Q4 targeting)
- **Contingency**: Focus on care providers (faster procurement), extend pilot phase
- **Owner**: BD Lead / Martin

**M2: Pilot Site Failures or Dropouts**
- **Probability**: Medium (30%)
- **Impact**: Medium (reduced evidence, weak market validation)
- **Mitigation** (€30k):
  - Over-recruit (15 sites target vs 10 minimum)
  - Strong pilot support (training, CS, safety monitoring)
  - Regular check-ins and issue resolution
  - Clear value demonstration
- **Contingency**: Replace failed sites, extend pilot phase
- **Owner**: Pilot Manager

**M3: Competitive Response**
- **Probability**: Medium (30%)
- **Impact**: Medium (pressure on pricing, slower adoption)
- **Mitigation** (€25k):
  - Differentiation (three-column UI, DAG, elderly-specific design)
  - Fast execution (18-month TRL 5→8)
  - Patents/IP protection (three-column interface, DAG conversation)
  - Lock-in through integrations (BankID, 1177.se, etc.)
- **Contingency**: Adjust pricing, accelerate unique features
- **Owner**: Founders

---

### User Safety Risks (€175k mitigation budget)

**US1: Financial Transaction Errors**
- **Probability**: Medium (25%)
- **Impact**: Critical (direct financial harm to vulnerable users)
- **Mitigation** (€70k):
  - Transaction caps (per-transaction and daily limits)
  - Cooling-off periods for new payees
  - Large-font confirmation screens
  - Scam-risk warnings (unusual amounts, first-time payees)
  - No autonomous execution (user always confirms)
  - PSMC monitoring
- **Contingency**: Immediate feature pause, user compensation, incident investigation
- **Owner**: ML/LLM Engineer + PSMC

**US2: Scam Vulnerability**
- **Probability**: Medium (20%)
- **Impact**: Critical (financial loss, emotional distress)
- **Mitigation** (€45k):
  - Scam detection patterns (urgency, secrecy, gift cards, crypto)
  - Red-flag warnings
  - Cooling-off periods
  - Caregiver supervision for high-risk users
  - Financial literacy training
- **Contingency**: Immediate stop for affected user, bank coordination, support
- **Owner**: ML/LLM Engineer + Pilot Manager

**US3: Cognitive Overload or Distress**
- **Probability**: Medium (30%)
- **Impact**: High (emotional harm, pilot dropout)
- **Mitigation** (€35k):
  - Progressive disclosure (three-column design)
  - Adaptive pacing
  - Post-task stress check-ins (Likert scale)
  - On-demand human assistance
  - NASA-TLX monitoring (target ≤35)
  - Break prompts
- **Contingency**: Reduce task complexity, increase human support
- **Owner**: UX/Accessibility Lead + Pilot Manager

**US4: Data Breach or Privacy Violation**
- **Probability**: Low (10%)
- **Impact**: Critical (reputational damage, loss of trust)
- **Mitigation** (€25k):
  - Encryption at rest and in transit
  - No credential storage
  - EU/EEA data residency
  - Access controls and audit logging
  - Incident response plan
  - Cyber insurance
- **Contingency**: DPA notification (72h), participant notification, forensics, compensation
- **Owner**: DevSecOps Engineer + DPO

---

### Risk Budget Summary

| Category | Risks | Mitigation Budget | Reserve |
|----------|-------|-------------------|---------|
| Technical | 4 | €240k | €60k |
| Resource | 4 | €105k | €30k |
| Regulatory | 4 | €175k | €45k |
| Market | 3 | €95k | €25k |
| User Safety | 4 | €175k | €40k |
| **Total** | **19** | **€790k** | **€200k** |

**Total Risk Management Budget**: €990k (included in €2.5M grant)

**Governance**:
- Monthly risk review (PMO)
- Quarterly board risk assessment
- PSMC oversight for user safety risks
- Early-warning KPIs monitored weekly

---

## 8. QUALITY ASSURANCE & ETHICS FRAMEWORK

### Pre-Pilot Validation Requirements

**AI Quality Thresholds** (WP5 + WP6):
- **Critical error rate**: ≤ 0.1% of guided steps
- **Major error rate**: ≤ 1% of guided steps
- **Hallucination rate**: ≤ 1% of factual claims
- **Toxic content rate**: ≤ 0.01%
- **Bias testing**: Zero tolerance for ageism or cognitive-ability discrimination

**Accessibility Thresholds** (WP4 + WP6):
- **WCAG 2.2 AA compliance**: 100% (no blockers)
- **Screen reader compatibility**: 100% operability (NVDA, JAWS)
- **Keyboard-only operability**: 100% of features
- **Elderly usability**: SUS ≥70 (target ≥80)
- **Cognitive load**: NASA-TLX ≤35 for critical tasks
- **Task success rate**: ≥95% without assist, ≥99% with assist

**Security Thresholds** (WP2 + WP6):
- **Penetration testing**: Zero critical vulnerabilities, <5 high-severity
- **Encryption**: 100% of sensitive data at rest and in transit
- **Authentication**: MFA required for all staff access
- **BankID integration**: No credential storage, ephemeral sessions only

---

### Ethics Review Requirements

**Sweden** (Etikprövningsmyndigheten):
- **Required if**: Research on humans OR sensitive personal data + vulnerable participants
- **Application timeline**: 6-10 weeks for decision
- **Requirements**:
  - Swedish Principal Investigator
  - Research protocol with vulnerable-population safeguards
  - Consent forms (standard, proxy, re-consent)
  - Capacity assessment procedures (MacCAT-CR or ACE)
  - Data protection plan and DPIA
  - Safety monitoring plan (PSMC charter)

**Norway** (REK - Regional Committees for Medical and Health Research Ethics):
- **Required if**: Medical/health research
- **If not health research**: DPIA + institutional DPO approval + Sikt coordination
- **Application timeline**: 4-8 weeks for decision
- **Requirements**: Similar to Sweden

**Consent Procedures**:
- **Capacity assessment**: MacCAT-CR or ACE (not just MMSE/MoCA)
- **Plain language**: B1 reading level, 14-16pt fonts
- **Teach-back verification**: Confirm understanding of purpose, risks, withdrawal rights
- **Proxy consent**: For participants lacking capacity → LAR (Sweden: "God man"/"Förvaltare"; Norway: legal guardian)
- **Always seek assent**: Even with proxy consent
- **Respect dissent**: Participant refusal overrides proxy consent

---

### Safety Monitoring Governance

**Pilot Safety Monitoring Committee (PSMC)**:
- **Composition**:
  - Gerontology/geriatrics expert (Chair)
  - Clinical ethicist
  - Cybersecurity/financial crime expert
  - Data protection specialist
- **Authority**: Pause/stop authority for user-level, site-level, or program-level
- **Meetings**: Monthly during pilots (M9-M18), ad-hoc for incidents
- **Responsibilities**:
  - Review incident reports
  - Assess safety thresholds
  - Approve protocol changes
  - Oversee ethics compliance

**Internal Roles**:
- **Pilot Safety Lead**: Overall safety oversight (Pilot Manager)
- **Site Safety Officers**: One per pilot site (municipal staff)
- **Incident Manager**: 24h incident response (DevSecOps Engineer)
- **DPO**: Data protection compliance

---

### Pause/Stop Triggers

**Immediate User-Level Stop**:
- **Sentinel events**:
  - Confirmed fraud loss (any amount)
  - Credential compromise
  - Health-related harmful advice
  - Identity theft
- **Action**: Immediate feature disable for affected user, PSMC notification within 24h

**Site-Level Pause**:
- **Threshold**: 2 major incidents at single site within 7 days
- **Action**: Pause site, root cause analysis, PSMC review before resumption

**Program-Level Pause**:
- **Thresholds**:
  - Critical error rate > 0.25% (weekly)
  - Major error rate > 2% (weekly)
  - 2+ sentinel events across all sites within 14 days
- **Action**: Full program pause, emergency PSMC meeting, remediation plan required

---

### Continuous QA During Pilots

**Shadow Evaluation**:
- **Sample**: 10% of sessions weekly
- **Process**: Human reviewers annotate errors using taxonomy
- **Reporting**: Weekly QA dashboards, monthly trend analysis

**Drift Monitoring**:
- **Automated alerts**: Critical > 0.25%, major > 2%
- **Trigger**: Investigation within 48h, feature pause if not resolved

**Model Updates**:
- **Policy**: No silent mid-pilot updates
- **Process**: Canary cohorts (10-20 users), golden test re-run, PSMC approval
- **Documentation**: Change logs, A/B test results

**Financial Safety**:
- **Transaction caps**: Per-user limits configured based on risk profile
- **Cooling-off periods**: 24h delay for first-time payees, 2h for unusual amounts
- **Scam detection**: Automated warnings (urgency, secrecy, gift cards, suspicious IBANs)
- **No autonomous execution**: User always confirms each step

**Emotional Distress**:
- **Post-task check-ins**: "Was this stressful?" (1-5 Likert scale)
- **Threshold**: Distress > 4/5 for two consecutive tasks → human follow-up
- **Passive signals**: Long pauses, repeated help requests → adaptive pacing

---

### Data Protection in Pilots

**Legal Basis**:
- **Consent**: Explicit consent (Art. 6(1)(a) and Art. 9(2)(a) for sensitive categories)
- **DPIA**: Required for vulnerable subjects + sensitive data + novel tech (Art. 35)
- **Controller determination**: Senior AI as controller OR joint controller with municipalities (Art. 26 agreement)

**Data Minimization**:
- **DO NOT STORE**:
  - Credentials (passwords, BankID codes, PINs)
  - Full payment details (use tokens)
- **Log only**:
  - Task type (anonymized outcome codes)
  - Timestamps
  - Coarse-grain interaction metrics
  - Pseudonymized participant IDs (no direct identifiers)

**Retention**:
- **Raw logs**: Maximum 6-12 months post-pilot
- **De-identified research data**: Per ethics approval (typically 5 years)
- **Deletion**: Immediate on request (DSAR), documented audit trail

**Security**:
- **EU/EEA data residency**: All storage and processing
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Access controls**: Role-based, least-privilege, MFA for staff
- **Audit logging**: All data access logged and monitored

---

### Phased Pilot Approach

**Phase 0: Lab Verification (M6-M8)**:
- **Quality gates**: Meet all QA thresholds
- **Compliance**: DPIA complete, ethics approved, ACR draft
- **Safety**: SOPs finalized, PSMC established
- **Participants**: Internal testing only (staff, friends/family)

**Phase 1: Low-Risk Tasks (M9-M11)**:
- **Use cases**:
  - Government informational browsing (Skatteverket FAQ)
  - Appointment lookups (1177.se)
  - Weather, news, calendar
- **Monitoring**: Weekly error review, monthly PSMC
- **Gate 1**: Proceed if critical errors ≤ 0.1% and zero sentinel events

**Phase 2: Medium-Risk Tasks (M12-M14)**:
- **Use cases**:
  - Form guidance (tax return, benefits application)
  - Benefits applications with human check
  - Small-value transactions (<500 SEK) with caps
- **Monitoring**: Distress tracking, financial safety checks
- **Gate 2**: Proceed if distress <4/5 and major errors ≤ 1%

**Phase 3: High-Risk Tasks (M15-M18)**:
- **Use cases**:
  - Banking transfers with caregiver co-sign (flagged users)
  - Healthcare portal navigation (tight guardrails)
  - Government applications (Försäkringskassan)
- **Monitoring**: Enhanced safety (PSMC review all incidents)
- **Gate 3**: Final validation for market launch

---

## 9. TIMELINE OVERVIEW (18 MONTHS)

### Months 1-3: Foundation & Team Building
- **Focus**: PMO setup, initial hires, architecture planning
- **Hires**: Platform Engineer, ML/LLM Engineer, UX/Accessibility Lead (M1-3 recruiting)
- **Key activities**: Security architecture design, domain integration planning, user research kickoff
- **Milestone**: MS1 Kickoff Complete (M1)

### Months 4-6: Alpha Development
- **Focus**: Core platform build, BankID integration, accessibility foundation
- **Hires**: DevSecOps Engineer (M4-6 recruiting)
- **Key activities**: Three-column UI, DPIA completion, ethics applications, pilot planning
- **Milestone**: MS2 Alpha Release (M6) - functional UI, 5+ domains, internal testing

### Months 7-9: Beta & Pilot Prep
- **Focus**: DAG system, safety guardrails, ethics approvals, pilot site onboarding
- **Hires**: QA Engineer, Pilot Manager (M6-9 recruiting)
- **Key activities**: Beta testing with 50+ users, ethics approval securing, first pilot site agreements
- **Milestone**: MS3 Beta Release (M9), MS5 Mid-Project Review (M9) - first pilots live

### Months 10-12: Production & Pilot Scale
- **Focus**: v1.0 production release, 10-15 pilot sites active, BankID production approval
- **Hires**: Domain Integration Specialist (M10-12 recruiting)
- **Key activities**: Platform stabilization, pilot scaling, continuous QA, safety monitoring
- **Milestones**: MS4 v1.0 Production (M12), MS6 BankID Production (M12), MS7 10-15 Pilots Active (M12)

### Months 13-15: Certification & Optimization
- **Focus**: Accessibility certification, GDPR validation, pilot data collection
- **Hires**: BD Lead (M10-14 recruiting)
- **Key activities**: Third-party audits, ACR/VPAT completion, mid-pilot safety review, Series A prep
- **Milestone**: MS9 All Certifications Complete (M15)

### Months 16-18: Validation & Series A
- **Focus**: Final pilot results, market validation, investment readiness
- **Key activities**: Pilot completion, evidence package, investor deck, Series A pitch
- **Milestones**: MS8 14+ Domains Live (M18), MS10 Final Review & Investment Readiness (M18)

---

## 10. SUCCESS CRITERIA & VERIFICATION

### Technical Success (TRL 5 → TRL 8)
- [ ] Platform operational: 99.9% uptime, <200ms response times
- [ ] 14+ domain integrations functional
- [ ] BankID production approval (Sweden + Norway)
- [ ] Critical AI error rate ≤ 0.1%, major ≤ 1%
- [ ] Zero security breaches or credential exposures

### Accessibility & UX Success
- [ ] EN 301 549 certification achieved
- [ ] WCAG 2.2 AA compliance: 100%
- [ ] SUS ≥70 across elderly participants (target ≥80)
- [ ] NASA-TLX ≤35 for critical tasks
- [ ] Task success ≥95% without assist, ≥99% with assist

### Pilot & Market Success
- [ ] 10-15 pilot sites deployed
- [ ] 250-450 elderly participants onboarded
- [ ] Zero sentinel events (fraud loss, credential compromise, harmful advice)
- [ ] 3+ municipal LOIs for post-grant contracts
- [ ] Procurement documentation validated

### Business & Investment Success
- [ ] Series A term sheet secured (€2-4M at €10-20M valuation)
- [ ] Revenue model validated (B2C + B2B2C pricing)
- [ ] Investor deck and financial projections ready
- [ ] Market validation report complete

### Regulatory & Ethics Success
- [ ] Ethics approvals secured (Sweden + Norway)
- [ ] GDPR compliance validated (DPO sign-off)
- [ ] ISO/IEC 42001 AI management alignment
- [ ] EU AI Act risk management file complete
- [ ] Zero GDPR violations or DPA penalties

---

**END OF SYNTHESIS DOCUMENT**

This synthesis consolidates findings from 5 major expert consultations covering work packages, team composition, partnership strategy, risk management, and quality assurance/ethics protocols. Ready for Phase 5: Draft Section Creation.