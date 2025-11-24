# Implementation Plan Annex - Senior AI

> **EIC Accelerator Full Proposal** (Maximum 10 pages)
> **DRAFT VERSION - Based on current available information**

---

## Work Plan and Resources

### 1. Overall Structure

**Project Overview:**
Senior AI is undertaking an 18-month acceleration program to advance from TRL 5 (validated in lab) to TRL 8 (complete and qualified system) for our voice-first AI assistant designed for elderly users and people with cognitive challenges.

**Strategic Approach:**
The work plan follows a three-phase TRL progression:
- **Phase 1 (M1-M6): TRL 5→6** - Freeze security architecture, deliver end-to-end alpha platform with 4 domains, establish BankID sandbox integration, complete DPIA draft
- **Phase 2 (M7-M12): TRL 6→7** - Feature-complete beta with 8-10 domains, pass penetration testing, launch multi-site pilots, achieve accessibility pre-audit, secure BankID production approval
- **Phase 3 (M13-M18): TRL 7→8** - Complete 10-15 operational pilots, obtain security and accessibility certifications, validate GDPR compliance, achieve production readiness v1.1

**Key Innovation Elements:**
1. **Conversation Atlas with multi-resolution information gradient** reducing cognitive load
2. **Non-destructive conversation branching** preserving full context while enabling exploration
3. **Visual AI Apps with workflow skeletons** making complex tasks transparent and confidence-building
4. **Privacy-by-design** with E2E encryption and local processing options
5. **BankID integration** enabling secure task execution for vulnerable users

**Logical Work Package Structure:**
Eight work packages ensure systematic development:
- WP1 coordinates overall project management, risk, ethics, and IPR
- WP2-WP5 deliver core technical capabilities (security, platform, accessibility, BankID)
- WP6 ensures regulatory compliance (GDPR, EN 301 549, ISO/IEC 42001)
- WP7 validates through real-world pilots
- WP8 prepares market readiness and exploitation

**Critical Dependencies:**
- WP2 (security architecture) must freeze by M3 to enable WP3/WP5 development
- WP4 (accessibility) informs WP3 (platform) iteratively throughout
- WP5 (BankID) sandbox completion (M4) gates production integration (M12)
- WP6 (compliance) DPIA (M3) gates pilot launch (M7)
- WP7 (pilots) requires WP3 beta (M9) and WP6 pre-audits (M10)

### 2. Work Package Lists

#### Grant Component Work Packages (up to TRL 8)

| WP # | Type | Title | Objectives | Lead | PM | Start | End | Target TRL |
|------|------|-------|------------|------|----|----- |-----|------------|
| 1 | Management | Project Management, Risk and Ethics | On-time/budget delivery; risk management; ethics oversight; EIC reporting | Founder 1 | 18 | M1 | M18 | - |
| 2 | Development | Architecture, Security & Privacy-by-Design | Zero-trust architecture; GDPR-by-design; BankID security foundation | Founder 2 | 24 | M1 | M12 | 6-7 |
| 3 | Development | Core Platform & Conversation Engine | Production-ready conversation system; card UI; voice stack; MLOps | Tech Lead | 48 | M1 | M18 | 5-8 |
| 4 | Development | Accessibility UX & Human-Centered Design | EN 301 549 conformance; elderly-optimized UX; cognitive accessibility | UX Lead | 30 | M1 | M18 | 6-8 |
| 5 | Development | BankID Integration & Agent Security | Secure task execution; BankID flows; scam protection | Security Engineer | 20 | M2 | M15 | 6-8 |
| 6 | Compliance | Regulatory Compliance & Certification | GDPR validation; accessibility certification; ISO/IEC 42001 | Compliance Manager | 22 | M2 | M18 | 7-8 |
| 7 | Validation | Pilot Testing & User Validation | 10-15 operational pilots; 250-450 elderly users; real-world validation | BD/Pilots Lead | 28 | M4 | M17 | 7-8 |
| 8 | Dissemination | Market Readiness & Exploitation | Partnerships; procurement packages; investment readiness | Founder 1 | 16 | M6 | M18 | 8 |

**Total Person-Months:** 206 PM over 18 months

#### Investment Component Work Packages (TRL 9)

| WP # | Type | Title | Objectives | Lead | Start | End | Target TRL |
|------|------|-------|------------|------|-------|-----|------------|
| 9 | Scale | Production Infrastructure Scaling | Multi-region deployment; performance optimization; 100k+ user capacity | CTO | M19 | M24 | 9 |
| 10 | Scale | Municipal Rollout Program | Framework agreements; 25+ municipalities; 10,000+ users | BD Lead | M19 | M30 | 9 |
| 11 | Market | Market Expansion & Partnerships | Care providers; health payers; telco partnerships; Nordic expansion | CEO | M19 | M36 | 9 |
| 12 | Product | Advanced Features & Domains | 20+ task domains; advanced memory features; family coordination | Product | M19 | M30 | 9 |

### 3. Detailed Work Package Descriptions

#### Work Package 1: Project Management, Risk and Ethics

**Title:** Project Management, Risk and Ethics

**Duration:** M1-M18 | **Person-Months:** 18 PM | **Lead:** Founder 1

**Objectives:**
- Deliver project on time and within €2.5M budget
- Manage technical, resource, and regulatory risks proactively
- Ensure ethical treatment of vulnerable user groups
- Protect and manage intellectual property
- Maintain excellent communication with EIC

**Description of Work:**

**Task 1.1: Project Coordination (M1-M18, 8 PM)**
- Monthly milestone tracking against Gantt chart
- Bi-weekly team standups and monthly all-hands
- Quarterly reviews with advisory board
- EIC reporting (mid-term M9, final M18)
- Budget monitoring with 90-day reforecasts
- Stage-gate decision points at M6, M12, M15

**Task 1.2: Risk Management (M1-M18, 4 PM)**
- Maintain comprehensive risk register (technical, resource, regulatory, market)
- Monthly risk reviews with mitigation actions
- €300k contingency reserve managed through formal release process
- Scenario planning for critical dependencies (BankID approval, certification timing)
- Disaster recovery procedures for key person dependencies

**Task 1.3: Ethics Oversight (M1-M18, 3 PM)**
- Ethics application to Swedish Ethical Review Authority (M1-M2)
- Establish Pilot Safety Monitoring Committee (PSMC) with independent experts
- Informed consent protocols for vulnerable users (capacity assessment, plain language, ongoing consent)
- Safety monitoring dashboards for pilot distress signals
- Incident response procedures aligned with Swedish/Norwegian safeguarding requirements

**Task 1.4: IP Management (M1-M18, 3 PM)**
- Patent landscape monitoring
- Document novel UI patterns (Conversation Atlas architecture, conversation branching, AI Apps workflows)
- Provisional patent applications for key innovations (M6, M12)
- Freedom-to-operate analysis
- Open-source component compliance

**Resources:**
- Founder 1: 50% allocation
- PMO tooling: €10k
- Advisory board: €15k
- Legal (IP): €20k

**Deliverables:**
- D1.1 Project plan, risk register, ethics framework (M1)
- D1.2 Mid-term review package (M9)
- D1.3 Final report and exploitation plan (M18)

---

#### Work Package 2: Architecture, Security & Privacy-by-Design

**Title:** Architecture, Security-by-Design and Privacy-by-Design

**Duration:** M1-M12 | **Person-Months:** 24 PM | **Lead:** Founder 2

**Objectives:**
- Define and implement zero-trust, capability-scoped architecture suitable for vulnerable users handling sensitive tasks (banking, healthcare, government)
- Design for GDPR and BankID security requirements from day one
- Establish security baseline meeting Swedish KLASSA and ISO 27001 requirements

**Description of Work:**

**Task 2.1: Security Architecture (M1-M3, 8 PM)**
- Threat modeling using LINDDUN (privacy) and STRIDE (security)
- Zero-trust architecture design: no implicit trust, continuous verification
- Capability-scoped tokens for agent execution (least privilege principle)
- Data classification schema (public, internal, confidential, sensitive personal data)
- Key management and secrets rotation strategy
- Multi-factor authentication flows
- Session binding and device attestation alternatives
- Break-glass procedures for emergency access

**Task 2.2: BankID Security Architecture (M2-M4, 6 PM)**
- BankID integration architecture aligned with official specifications
- Sandbox setup and test environment
- Secure session binding preventing man-in-the-middle attacks
- Ephemeral token handling (never store personal numbers)
- Transaction verification flows with clear user confirmations
- Fallback authentication strategies (Freja eID compatibility)

**Task 2.3: Privacy Engineering (M2-M5, 6 PM)**
- Data minimization strategy: collect only what's necessary
- Purpose limitation enforcement in data schemas
- Privacy budgets for AI processing
- Configurable data retention policies
- User control interfaces (data export, deletion, consent withdrawal)
- Records of Processing Activities (Article 30 GDPR)
- Data Processing Agreement templates
- Sub-processor management

**Task 2.4: DPIA and Privacy Documentation (M2-M3, 4 PM)**
- Data Protection Impact Assessment (DPIA) for high-risk processing
- Identify residual risks requiring mitigations
- Transfer Impact Assessment (TIA) for any cross-border processing
- Privacy notices for elderly users (plain language, large fonts)
- Consent management specifications

**Resources:**
- Founder 2: 60% allocation M1-M6, 30% M7-M12
- DevSecOps Engineer: 0.5 FTE M3-M12
- Security consultant (threat modeling): €15k
- DPIA legal consultant: €15k

**Deliverables:**
- D2.1 Architecture & security design freeze + DPIA v1 (M3)
- D2.2 BankID sandbox integration spec and test plan (M4)
- D2.3 Privacy engineering spec and data schemas (M5)

**Milestone:**
- MS1 Security/architecture design freeze (M3)

---

#### Work Package 3: Core Platform, Conversation Engine and MLOps

**Title:** Core Platform, Conversation Engine and MLOps

**Duration:** M1-M18 | **Person-Months:** 48 PM | **Lead:** Tech Lead

**Objectives:**
- Deliver production-ready conversation system with non-destructive branching (DAG structure)
- Implement Conversation Atlas multi-resolution interface with card rendering
- Build robust voice stack (STT/TTS) optimized for elderly Swedish/Norwegian speakers
- Establish MLOps infrastructure ensuring safety, observability, and continuous improvement
- Achieve TRL 8 performance: <1.2s P95 latency for UI actions, <300ms STT partials

**Description of Work:**

**Task 3.1: Conversation Engine (M1-M18, 16 PM)**
- DAG persistence for conversation branches: rewind, branch, merge operations
- Beat detection algorithms for natural conversation segmentation
- Progressive summarization (5 compression levels)
- Context management and token optimization
- Conversation category system (Regular/Function/Meta) with color coding
- Grounding and safety guardrails
- Prompt routing policies
- Confidence gating on AI outputs
- Human-in-the-loop escalation triggers

**Task 3.2: Card-Based UI Engine (M1-M18, 12 PM)**
- Conversation Atlas multi-resolution architecture:
  - Timeline View: Conversation summaries with temporal organization
  - Key Points View: Essential decisions and facts extraction
  - Full Detail View: Complete conversation with context-aware filtering
- Card rendering system (headline + 2 lines + action buttons)
- Conversation branching visualization
- Large touch targets (minimum 44x44px)
- High contrast themes (WCAG 2.2 AA minimum)
- Keyboard navigation support
- Screen reader optimization
- Cross-platform rendering (tablet/desktop)

**Task 3.3: Voice Stack (M2-M15, 10 PM)**
- Speech-to-Text (STT):
  - Swedish/Norwegian ASR tuned for elderly speakers
  - On-device/off-device fallback strategy
  - Wake-word detection
  - Barge-in capability
  - Noise robustness
  - Target: <300ms partials
- Text-to-Speech (TTS):
  - Prosody controls for cognitive accessibility
  - Natural pacing (adjustable speed)
  - High-quality voices
  - Offline capability for core functions
- Voice UX optimization through elderly user testing

**Task 3.4: AI Apps & Workflow Skeletons (M3-M15, 8 PM)**
- Visual workflow system showing:
  - Completed steps (past)
  - Current state and progress
  - Available next actions
- Template workflows for:
  - Bank transfers
  - Healthcare portal navigation
  - Government form completion
  - Calendar bookings
  - Image generation
- Structured task execution with verification steps
- Error recovery and resumption

**Task 3.5: MLOps and Observability (M2-M18, 12 PM)**
- Model registry and version control
- Prompt versioning and A/B testing framework
- Evaluation harness with elderly-specific test suites
- Red-team datasets (safety, bias, age-appropriateness)
- Synthetic and curated corpora across 14+ domains
- Bias and safety evaluation protocols
- CI/CD pipeline with automated testing
- Rollback procedures
- SLO monitoring:
  - Latency <1.2s P95 for UI actions
  - ASR <300ms partials
  - Availability 99.5% during pilot phase
- Error tracking and alerting
- Performance dashboards

**Resources:**
- Senior AI/ML Engineers: 2 FTE M1-M18
- Full-stack Platform Engineers: 2 FTE M3-M18
- Voice/ASR specialist: 0.3 FTE M2-M15
- Cloud infrastructure: €120k over 18 months
- LLM API costs: €80k over 18 months (test + pilot usage)
- Voice services (STT/TTS): €25k

**Deliverables:**
- D3.1 E2E alpha (voice+cards, 4 domains), MLOps v1 (M6)
- D3.2 Feature-complete beta (8-10 domains), SLOs defined, test automation suite v1 (M9)
- D3.3 Production v1.0 (M12)
- D3.4 Production v1.1 hardening with pilot feedback (M18)

**Milestones:**
- MS2 Alpha release (M6)
- MS3 Beta release (M9)
- MS4 Production v1.0 (M12)

---

#### Work Package 4: Accessibility UX and Human-Centered Design

**Title:** Accessibility UX and Human-Centered Design

**Duration:** M1-M18 | **Person-Months:** 30 PM | **Lead:** UX Lead

**Objectives:**
- Achieve EN 301 549 conformance (European accessibility standard)
- Validate UX for elderly users (65+) and people with cognitive challenges
- Establish cognitive load metrics and optimize accordingly
- Conduct iterative usability testing with target user groups

**Description of Work:**

**Task 4.1: Accessibility Framework (M1-M3, 4 PM)**
- Map UX to EN 301 549 functional performance statements
- Define WCAG 2.2 AA/AAA compliance targets
- Establish cognitive accessibility guidelines:
  - Large, readable text (14-15px body, prioritizing clear overview)
  - High contrast (WCAG AA minimum)
  - Simplified language (B1 reading level)
  - Consistent visual patterns
  - Reduced cognitive load (progressive disclosure)
- Create accessibility design system
- Define keyboard navigation patterns
- Screen reader optimization requirements

**Task 4.2: Elderly-Optimized Design (M1-M18, 10 PM)**
- Visual hierarchy optimized for aging vision:
  - Clear information organization
  - Balance between readability and information density
  - Color-coded categories for instant recognition
- Touch target sizing (minimum 44x44px)
- Simplified interaction patterns
- Error prevention and easy recovery
- Progressive onboarding flows
- Plain language content guidelines
- Visual progress indicators
- Forgiving interface design (easy undo, clear feedback)

**Task 4.3: Cognitive Accessibility (M2-M15, 8 PM)**
- Memory support through visual structure
- Attention management through Conversation Atlas organization
- Sequential task guidance (workflow skeletons)
- Non-linear navigation supporting diverse thought patterns
- Reduced overwhelm through progressive disclosure
- Consistent patterns reducing learning burden
- Context preservation (conversation branching without loss)

**Task 4.4: Usability Testing (M3-M17, 8 PM)**
- Recruit 60-80 elderly participants across Sweden/Norway
- Testing waves:
  - Wave 1 (M3-M4): Alpha with 20 users
  - Wave 2 (M7-M8): Beta with 30 users
  - Wave 3 (M13-M14): Pre-certification with 20 users
- Include users with:
  - Age range 65-85+
  - Varying digital literacy (low to moderate)
  - Cognitive challenges (MCI, ADHD, learning disabilities)
  - Vision/hearing limitations
- Metrics:
  - Task completion rates
  - Time on task
  - Error rates
  - Cognitive load (NASA-TLX)
  - System Usability Scale (SUS) target >70
  - Net Promoter Score (NPS) target >30
  - Self-efficacy (eHEALS scale)
- Methods:
  - Think-aloud protocols
  - Observation with minimal assistance
  - Post-task interviews
  - Remote and in-person sessions
  - Home environment testing (select cases)

**Resources:**
- UX/Accessibility Designer: 1 FTE M1-M18
- Accessibility specialist consultant: 0.3 FTE M1-M15
- User research: €40k (recruitment, incentives, venues)
- Accessibility testing tools: €10k

**Deliverables:**
- D4.1 Accessibility framework and design system (M3)
- D4.2 Alpha usability test report (M5)
- D4.3 Beta usability test report (M9)
- D4.4 Pre-certification usability validation (M15)

**Milestone:**
- MS6 Accessibility pre-audit pass (M10)

---

#### Work Package 5: BankID Integration & Agent Security

**Title:** BankID Integration & Agent Security

**Duration:** M2-M15 | **Person-Months:** 20 PM | **Lead:** Security Engineer

**Objectives:**
- Implement secure BankID authentication and signing flows
- Enable safe task execution by AI agents for vulnerable users
- Build scam protection and fraud prevention systems
- Achieve BankID production approval

**Description of Work:**

**Task 5.1: BankID Sandbox Integration (M2-M6, 6 PM)**
- SDK integration (certified libraries)
- Test harness for authentication flows
- Test harness for signing flows
- Error handling and fallback scenarios
- User experience flows (clear confirmations, step-by-step guidance)
- Session management and timeout handling
- Multi-device support
- Freja eID compatibility testing

**Task 5.2: Agent Execution Framework (M3-M12, 8 PM)**
- Capability-scoped agent policies (what agents can/cannot do)
- Transaction verification flows:
  - AI describes intended action
  - User reviews and confirms
  - Clear visual confirmation cards
  - Mandatory pause before execution
- Transaction caps and cooling-off periods
- Audit logging of all agent actions
- Rollback capabilities
- Human-in-the-loop triggers for high-risk actions

**Task 5.3: Scam Protection System (M4-M12, 4 PM)**
- Real-time scam detection:
  - First-time payee warnings
  - Unusual amount alerts
  - Suspicious recipient name detection
  - Urgency/pressure language detection
  - Gift card/crypto red flags
- Integration with banking APIs for additional verification
- SMS/email/call analysis (optional feature)
- User education cards ("Common scams to watch for")
- Secure communication channels (never ask for codes via unsecured methods)

**Task 5.4: BankID Production Approval (M8-M12, 2 PM)**
- Compliance checklist completion
- Security documentation
- UX alignment with BankID guidelines
- Pre-submission review with BankID team
- Production environment setup
- Go-live approval process

**Resources:**
- DevSecOps Engineer: 0.7 FTE M2-M15
- Security Engineer: 0.3 FTE M8-M12
- BankID vendor support: €25k
- Security review: €20k
- Test infrastructure: €15k

**Deliverables:**
- D5.1 BankID sandbox integration complete (M6)
- D5.2 Agent execution framework and scam protection (M9)
- D5.3 BankID production readiness documentation (M12)

**Milestone:**
- MS7 BankID production approval (M12)

---

#### Work Package 6: Regulatory Compliance & Certification

**Title:** Regulatory Compliance & Certification

**Duration:** M2-M18 | **Person-Months:** 22 PM | **Lead:** Compliance Manager

**Objectives:**
- Validate GDPR compliance for vulnerable user data
- Achieve EN 301 549 accessibility certification
- Obtain ISO/IEC 42001 AI management system certification (optional, planned)
- Avoid medical device classification
- Ensure Swedish/Norwegian regulatory compliance

**Description of Work:**

**Task 6.1: GDPR Compliance (M2-M18, 8 PM)**
- Data Protection Officer (DPO) retainer
- DPIA finalization and DPA consultation (if needed)
- Records of Processing Activities maintenance
- Data Processing Agreements with municipalities/partners
- Sub-processor due diligence
- EU data residency enforcement (avoid US Cloud Act issues)
- Consent management system validation
- Data subject rights implementation (access, rectification, erasure, portability)
- Breach notification procedures (72-hour readiness)
- Privacy notices in plain language
- Regular privacy audits

**Task 6.2: Accessibility Certification (M6-M15, 6 PM)**
- Gap analysis against EN 301 549 (M6-M7)
- Remediation sprints (M8-M13)
- Pre-audit with accessibility lab (M10)
- Fix critical blockers (M11-M13)
- Final certification audit (M14-M15)
- Accessibility statement publication
- Ongoing monitoring and maintenance procedures

**Task 6.3: ISO/IEC 42001 AI Management System (M8-M18, 6 PM)**
- AI risk assessment framework
- AI governance policies
- Bias and fairness testing protocols
- Transparency and explainability measures
- Human oversight procedures
- Continuous monitoring systems
- Documentation and evidence collection
- Implementation support from consultant
- Certification body selection
- Stage 1+2 audit (planned for M17-M18, may extend to M20)

**Task 6.4: Medical Device Risk Mitigation (M2-M6, 2 PM)**
- MDR regulatory counsel review
- Ensure no diagnostic/therapeutic claims
- "Information and support" positioning
- Disclaimers and escalation to healthcare providers
- Content review for borderline classification triggers
- Document non-medical device rationale

**Resources:**
- Compliance Manager/DPO: 0.5 FTE M2-M18 (can be external retainer)
- Privacy legal consultant: €30k
- Accessibility certification: €50k (audit + retest)
- ISO/IEC 42001 implementation: €40k
- ISO/IEC 42001 certification audit: €30k (initial, may occur M18-M20)
- MDR regulatory counsel: €20k

**Deliverables:**
- D6.1 GDPR compliance package (M6)
- D6.2 Accessibility gap analysis and remediation plan (M8)
- D6.3 EN 301 549 certification (M15)
- D6.4 ISO/IEC 42001 implementation complete (M18, audit M18-M20)

**Milestone:**
- MS9 EN 301 549 and GDPR certifications complete (M15)

---

#### Work Package 7: Pilot Testing & User Validation

**Title:** Pilot Testing & User Validation

**Duration:** M4-M17 | **Person-Months:** 28 PM | **Lead:** BD/Pilots Lead

**Objectives:**
- Execute 10-15 real-world pilots with elderly users in operational environments
- Validate all core functionalities with 250-450 total users
- Collect quantitative and qualitative data to demonstrate TRL 8
- Refine product based on real-world feedback
- Build municipal partnerships for post-grant scaling

**Description of Work:**

**Task 7.1: Pilot Program Design (M4-M6, 4 PM)**
- Pilot protocols and standard operating procedures
- Ethics approval and informed consent processes
- Safety monitoring procedures (PSMC oversight)
- Inclusion/exclusion criteria
- Pilot site playbook
- Metrics and evaluation framework:
  - Quantitative: task completion, time savings, weekly active rate
  - Qualitative: self-efficacy (eHEALS), SUS, NPS, caregiver feedback
- Data collection tools and dashboards
- Incident reporting procedures

**Task 7.2: Pilot Recruitment (M5-M10, 6 PM)**
- Target: 20+ municipalities/sites (to secure 10-15 active pilots)
- Outreach strategy:
  - Swedish municipalities (digital inclusion, welfare tech teams): 6-8 pilots
  - Norwegian municipalities (velferdsteknologi): 2-3 pilots
  - Private care providers (Attendo, Vardaga, Humana): 4-5 pilots
  - Partnerships with PRO, SPF Seniorerna, senior centers
- Letters of Intent (LOIs)
- Site agreements (pilots typically €300-600/participant, 8-12 weeks, 20-40 users)
- Coordination with municipal IT/legal/privacy teams
- DPA negotiations

**Task 7.3: Pilot Execution (M7-M16, 12 PM)**
- Onboarding and training:
  - Site coordinators training
  - Participant onboarding (multiple formats: in-person, video, phone)
  - Plain language user guides
  - Helpdesk support
- Device provisioning (tablets with MDM/kiosk mode if needed)
- Weekly check-ins with site coordinators
- Bi-weekly participant support (phone/video/in-person as needed)
- Safety monitoring:
  - Real-time distress signals
  - Financial transaction review
  - Incident tracking
  - PSMC monthly reviews
- Iterative improvements based on early feedback
- Gradual rollout of features (starting with 4 domains, expanding to 10+)

**Task 7.4: Data Analysis & Reporting (M9-M17, 6 PM)**
- Quantitative analysis:
  - Task completion rates by domain (target: >80%)
  - Time savings vs. traditional methods (target: 50-80% reduction)
  - Weekly active usage rates (target: >60%)
  - Error rates and recovery success
- Qualitative analysis:
  - Self-efficacy improvements (eHEALS scale)
  - System usability (SUS target: >70)
  - Net Promoter Score (NPS target: >30)
  - Thematic analysis of interviews
  - Caregiver feedback
- Pilot completion reports per site
- Aggregate impact report
- Case studies and testimonials
- Recommendations for product improvements

**Resources:**
- BD/Partnerships Manager: 1 FTE M5-M17
- Customer Success/Pilot Coordinator: 0.5 FTE M7-M17
- Founder (partnership lead): 0.5 FTE M5-M12
- Data analyst: 0.3 FTE M9-M17
- Site/participant incentives: €160k
- Travel and field operations: €40k
- Support infrastructure (helpdesk tools): €10k

**Deliverables:**
- D7.1 Pilot program design and ethics approval (M6)
- D7.2 First 5 pilots launched (M9)
- D7.3 10 pilots active (M12)
- D7.4 Pilot completion report (M17)

**Milestones:**
- MS10 10 pilots live (M12)
- MS11 Pilots completed with impact data (M16)

---

#### Work Package 8: Market Readiness & Exploitation

**Title:** Market Readiness & Exploitation

**Duration:** M6-M18 | **Person-Months:** 16 PM | **Lead:** Founder 1

**Objectives:**
- Develop go-to-market strategy for B2C and B2B2C channels
- Build partnership pipeline (municipalities, care providers, health payers, telcos)
- Create procurement-ready packages for public sector
- Prepare investment-ready materials for Series A
- Disseminate results to stakeholders

**Description of Work:**

**Task 8.1: Go-to-Market Strategy (M6-M9, 4 PM)**
- Market segmentation and targeting
- Pricing strategy:
  - B2C: €8-12/month subscription
  - B2B2C municipal: €6-9/user/month
  - B2B2C care: €6-8/user/month
- Channel strategy:
  - Direct B2C (digital marketing, partnerships)
  - Municipal procurement (framework agreements)
  - Care provider partnerships
  - Health payer value-add programs
  - Telco bundles (CSR/digital inclusion)
- Customer acquisition cost (CAC) optimization (target: €70-150 blended)
- Churn reduction strategies (target: <25% annually)

**Task 8.2: Partnership Development (M6-M18, 8 PM)**
- Municipal engagement:
  - Pre-tender dialogues
  - Framework agreement positioning (LOU direct procurement)
  - Pilot-to-procurement bridges
  - Procurement advisory support
- Care provider partnerships:
  - Attendo, Vardaga, Humana, Team Olivia (Sweden)
  - Attendo Norge, Stendi, Norlandia (Norway)
  - Value proposition tailored to care efficiency
- Health payer discussions:
  - Folksam, Länsförsäkringar (Sweden)
  - Gjensidige, Storebrand (Norway)
  - Preventive care value cases
- Telco partnerships:
  - Telia, Tele2 (Sweden)
  - Telenor (Norway/Sweden)
  - Digital inclusion bundle positioning

**Task 8.3: Procurement Packages (M9-M15, 2 PM)**
- GDPR compliance documentation (DPAs, DPIA, records of processing)
- Information security (KLASSA-aligned, ISO 27001 roadmap)
- Accessibility statements (EN 301 549 certification)
- Service level agreements (SLAs)
- Implementation playbooks
- Training materials for staff
- Support procedures
- Pricing and contract templates

**Task 8.4: Investment Readiness (M12-M18, 2 PM)**
- Business model validation through pilots
- Financial projections update with actuals
- Unit economics demonstration
- Pitch deck and data room
- Series A target: €10-20M for Nordic scaling
- Investor outreach preparation
- Advisory board expansion

**Resources:**
- Founder 1 (CEO): 30% allocation M6-M18
- BD/Partnerships Manager: 0.5 FTE M12-M18
- Procurement advisor: €20k
- Marketing/brand: €30k
- Sales collateral and demo environment: €15k

**Deliverables:**
- D8.1 Go-to-market strategy document (M9)
- D8.2 Procurement package suite (M15)
- D8.3 Partnership pipeline report (M18)
- D8.4 Investment-ready materials (M18)

**Milestone:**
- MS5 Final review and investment readiness (M18)

---

### 4. Deliverables (Grant Work Packages)

| # | Name | Description | WP | Lead | Type | Level | Date |
|---|------|-------------|-----|------|------|-------|------|
| D1.1 | Project Plan & Risk Register | Comprehensive project plan, risk register, ethics framework, IP strategy | WP1 | Founder 1 | Document | Internal | M1 |
| D1.2 | Mid-Term Review Package | Progress report, updated risk register, financial status, preliminary pilot results | WP1 | Founder 1 | Report | EIC | M9 |
| D1.3 | Final Report & Exploitation Plan | Complete project report, IP documentation, market exploitation plan, lessons learned | WP1 | Founder 1 | Report | EIC | M18 |
| D2.1 | Security Architecture Freeze | Zero-trust architecture, threat models, DPIA v1, security policies | WP2 | Founder 2 | Document | Internal | M3 |
| D2.2 | BankID Sandbox Integration Spec | BankID integration architecture, test plan, security analysis | WP2 | Founder 2 | Document | Internal | M4 |
| D2.3 | Privacy Engineering Spec | Data schemas, privacy controls, GDPR compliance framework, consent management | WP2 | Founder 2 | Document | Internal | M5 |
| D3.1 | Alpha Platform | End-to-end alpha: voice+cards, 4 domains, MLOps v1, conversation branching | WP3 | Tech Lead | Software | Internal | M6 |
| D3.2 | Beta Platform | Feature-complete beta: 8-10 domains, SLOs defined, test automation suite | WP3 | Tech Lead | Software | Internal | M9 |
| D3.3 | Production v1.0 | Production-ready platform with full feature set, performance validated | WP3 | Tech Lead | Software | Public | M12 |
| D3.4 | Production v1.1 | Hardened production release incorporating pilot feedback and optimizations | WP3 | Tech Lead | Software | Public | M18 |
| D4.1 | Accessibility Framework | Design system, EN 301 549 mapping, cognitive accessibility guidelines | WP4 | UX Lead | Document | Internal | M3 |
| D4.2 | Alpha Usability Report | Usability test results (n=20), recommendations, validated with elderly users | WP4 | UX Lead | Report | Internal | M5 |
| D4.3 | Beta Usability Report | Beta usability test results (n=30), SUS/NPS/eHEALS metrics | WP4 | UX Lead | Report | Internal | M9 |
| D4.4 | Pre-Certification Validation | Final usability validation (n=20) before EN 301 549 certification | WP4 | UX Lead | Report | Internal | M15 |
| D5.1 | BankID Sandbox Integration | Working BankID sandbox integration, test harness, documentation | WP5 | Security Eng | Software | Internal | M6 |
| D5.2 | Agent Framework & Scam Protection | Agent execution framework, scam detection system, audit logging | WP5 | Security Eng | Software | Internal | M9 |
| D5.3 | BankID Production Readiness | Production environment, security documentation, approval readiness | WP5 | Security Eng | Document | Internal | M12 |
| D6.1 | GDPR Compliance Package | DPAs, DPIA final, Records of Processing, consent system, privacy notices | WP6 | Compliance | Document | Public | M6 |
| D6.2 | Accessibility Gap Analysis | EN 301 549 gap analysis, remediation plan, pre-audit preparation | WP6 | Compliance | Document | Internal | M8 |
| D6.3 | EN 301 549 Certification | Official accessibility certification, conformance report, accessibility statement | WP6 | Compliance | Certification | Public | M15 |
| D6.4 | ISO/IEC 42001 Implementation | AI management system implemented, documentation complete (audit M18-M20) | WP6 | Compliance | Document | Internal | M18 |
| D7.1 | Pilot Program Design | Pilot protocols, ethics approval, safety procedures, evaluation framework | WP7 | BD Lead | Document | Internal | M6 |
| D7.2 | First Pilots Launched | 5 pilot sites active with users, initial safety and usage data | WP7 | BD Lead | Milestone | Internal | M9 |
| D7.3 | 10 Pilots Active | 10 pilot sites operational, 200+ users engaged, mid-pilot analysis | WP7 | BD Lead | Milestone | Internal | M12 |
| D7.4 | Pilot Completion Report | Comprehensive impact report, case studies, quantitative/qualitative analysis | WP7 | BD Lead | Report | Public | M17 |
| D8.1 | Go-to-Market Strategy | Market segmentation, pricing, channels, partnership strategy | WP8 | Founder 1 | Document | Internal | M9 |
| D8.2 | Procurement Package Suite | GDPR/security docs, SLAs, implementation playbooks, contract templates | WP8 | Founder 1 | Document | Public | M15 |
| D8.3 | Partnership Pipeline Report | Partnership status, LOIs, framework agreements, expansion opportunities | WP8 | Founder 1 | Report | Internal | M18 |
| D8.4 | Investment-Ready Materials | Business model validation, financial projections, pitch deck, data room | WP8 | Founder 1 | Document | Private | M18 |

---

### 5. Milestones

| # | Name | Related WPs | Estimated Date | Verification |
|---|------|-------------|----------------|-------------|
| MS0 | Project Kickoff | WP1 | M1 | Kickoff meeting held, team assembled, project plan approved |
| MS1 | Security Architecture Freeze | WP2 | M3 | Architecture design document finalized, threat models complete, DPIA v1 approved, technical review passed |
| MS2 | Alpha Release | WP3 | M6 | Working end-to-end system, 4 domains functional, voice+cards operational, internal testing successful |
| MS3 | Beta Release | WP3, WP4 | M9 | Feature-complete platform, 8-10 domains, usability testing (n=30) passed, SLOs defined and measured |
| MS4 | Production v1.0 | WP3, WP5 | M12 | Production-ready release, performance targets met (<1.2s P95 latency), BankID production integration complete |
| MS6 | Accessibility Pre-Audit Pass | WP4, WP6 | M10 | EN 301 549 gap analysis complete, critical blockers remediated, pre-audit from certification lab passed |
| MS7 | BankID Production Approval | WP5 | M12 | Official BankID production approval received, security review passed, ready for real transactions |
| MS8 | Security Penetration Test Pass | WP2, WP3 | M9 | External penetration test completed, critical/high vulnerabilities remediated, retest passed |
| MS9 | Certifications Complete | WP6 | M15 | EN 301 549 certification obtained, GDPR compliance validated, ISO/IEC 42001 implementation complete |
| MS10 | 10 Pilots Live | WP7 | M12 | 10 operational pilot sites, 200+ active users, safety monitoring functional, preliminary positive feedback |
| MS11 | Pilots Completed | WP7 | M16 | All pilots concluded, comprehensive impact data collected, TRL 8 demonstrated in operational environments |
| MS5 | Final Review & Investment Readiness | WP1, WP8 | M18 | All deliverables complete, EIC final report submitted, Series A materials ready, exploitation plan active |

---

## Budget Summary

**Total Grant:** €2,500,000 over 18 months

**Direct Costs:** €2,000,000 (80%)
- Personnel: €1,200,000 (48% of total)
- External Services/Subcontracting: €330,000 (13%)
- Pilot Costs: €160,000 (6%)
- Equipment: €120,000 (5%)
- Cloud/LLM APIs: €120,000 (5%)
- Travel/Dissemination/Other: €70,000 (3%)

**Indirect Costs:** €500,000 (20% of total, flat 25% of direct costs)

---

## Risk Management Summary

**Total Risk Mitigation Budget:** €790k (part of external services and contingency)

**Key Risk Categories:**

1. **Technical Risks (€240k mitigation budget)**
   - AI reliability with vulnerable users
   - BankID integration complexity
   - Voice/accessibility challenges
   - Security vulnerabilities

2. **Resource Risks (€105k mitigation budget)**
   - Talent acquisition in competitive market
   - Key person dependency
   - Budget overruns
   - Pilot recruitment failures

3. **Regulatory/Compliance Risks (€175k mitigation budget)**
   - GDPR violations
   - Accessibility certification failures
   - Medical device classification risk
   - BankID approval delays

4. **Market/Partnership Risks (€70k mitigation budget)**
   - Municipal procurement delays
   - Pilot site failures
   - Low adoption/high churn
   - Competitive responses

**Contingency Reserve:** €300k (released against approved contingency actions only)

**Risk Monitoring:** Monthly risk reviews, quarterly stage-gates, independent PSMC oversight

---

## Team Composition (as of application)

**Current Team:**
- **2 Founders** (technical + business backgrounds)
  - Founder 1 (CEO): Project management, partnerships, investment
  - Founder 2 (CTO): Architecture, security, technical leadership

**Planned Hires (M1-M6):**
- Senior AI/ML Engineer x2 (M1-M3)
- Platform Engineer x2 (M2-M4)
- UX/Accessibility Designer (M1-M2)
- DevSecOps Engineer (M3)
- BD/Partnerships Manager (M2-M3)

**Planned Hires (M6-M12):**
- Customer Success/Pilot Coordinator (M6)
- Data Analyst (M9)

**External/Fractional Roles:**
- DPO (Data Protection Officer): 0.3 FTE retainer
- Security consultants (pentesting, architecture review)
- Accessibility consultants
- Privacy legal counsel
- ISO/IEC 42001 implementation consultant

**Advisory Board (to be established M1-M3):**
- Gerontology/geriatrics expert
- Cybersecurity/financial crime expert
- Clinical ethicist
- Digital inclusion/accessibility expert
- Municipal welfare tech specialist

**Total Team Size:** 8-10 FTEs by M6, 9-11 FTEs by M12

---

## Success Criteria

**TRL 8 Validation:**
- ✅ System complete and qualified through operational testing
- ✅ 10-15 pilots in real municipal/care environments
- ✅ 250-450 elderly users successfully using platform
- ✅ Security and accessibility certifications obtained
- ✅ BankID production approval secured
- ✅ Demonstrated task completion rates >80%
- ✅ User satisfaction (SUS) >70, NPS >30
- ✅ Safety record: zero sentinel events, <2% major incidents

**Market Readiness:**
- ✅ Procurement-ready packages prepared
- ✅ Partnership pipeline established (20+ potential customers)
- ✅ Pilot-to-customer conversion path validated
- ✅ Unit economics demonstrated (COGS €0.18-0.36/user/month)
- ✅ Investment-ready (Series A materials complete)

**Impact:**
- ✅ Demonstrated improvement in digital self-efficacy for elderly users
- ✅ Proven time savings (50-80%) for common tasks
- ✅ Validated scam protection effectiveness
- ✅ Reduced caregiver burden (qualitative feedback)
- ✅ Path to European scaling established

---

**Document Status:** DRAFT - Based on available information as of November 24, 2025
**Next Steps:** Review with team, validate budget details, refine task breakdowns, add specific KPIs per task
**Contact:** [Insert contact information]

---

*This Implementation Plan Annex supports the EIC Accelerator Full Application (Part B) for Senior AI.*
