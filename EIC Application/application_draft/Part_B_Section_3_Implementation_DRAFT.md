# Part B Section 3: Implementation - Senior AI

> **For EIC Accelerator Application Part B**
> **Target: 3-5 pages**
> **DRAFT VERSION - Based on current available information**

---

## 3. IMPLEMENTATION

### 3.1 Work Plan Overview

Senior AI will execute an 18-month acceleration program advancing from TRL 5 to TRL 8, transforming our validated lab prototype into a certified, production-ready platform qualified through 10-15 operational pilots with 250-450 elderly users.

**Three-Phase Strategy:**

- **Phase 1 (M1-M6): Foundation → TRL 6** - Freeze security architecture, deliver end-to-end alpha with BankID sandbox, establish compliance framework
- **Phase 2 (M7-M12): Validation → TRL 7** - Feature-complete beta, penetration testing, accessibility pre-audit, BankID production approval, launch multi-site pilots  
- **Phase 3 (M13-M18): Qualification → TRL 8** - Complete certifications (EN 301 549, GDPR validation, ISO/IEC 42001), conclude pilots with impact data, production v1.1

**Work Package Structure:**

We have designed 8 integrated work packages ensuring systematic development:

1. **WP1 - Project Management, Risk & Ethics** (M1-M18): Deliver on time/budget, manage comprehensive risk register (€790k mitigation budget), ensure ethical treatment of vulnerable users, protect IP
2. **WP2 - Architecture, Security & Privacy-by-Design** (M1-M12): Zero-trust architecture, GDPR-by-design, BankID security foundation, DPIA
3. **WP3 - Core Platform & Conversation Engine** (M1-M18): Production-ready conversation system with non-destructive branching, Conversation Atlas interface, voice stack (STT/TTS), MLOps infrastructure
4. **WP4 - Accessibility UX & Human-Centered Design** (M1-M18): EN 301 549 conformance, elderly-optimized UX, cognitive accessibility, iterative testing with 60-80 users
5. **WP5 - BankID Integration & Agent Security** (M2-M15): Secure authentication/signing, agent execution framework, scam protection, production approval
6. **WP6 - Regulatory Compliance & Certification** (M2-M18): GDPR validation, EN 301 549 certification, ISO/IEC 42001 AI management system, avoid MDR classification
7. **WP7 - Pilot Testing & User Validation** (M4-M17): 10-15 pilots across Swedish/Norwegian municipalities and care providers, real-world validation, impact measurement
8. **WP8 - Market Readiness & Exploitation** (M6-M18): Go-to-market strategy, partnership pipeline, procurement packages, Series A preparation

**Critical Dependencies:**
- WP2 security freeze (M3) gates WP3/WP5 development
- WP6 DPIA approval (M3) gates WP7 pilot launch (M7)
- WP5 BankID sandbox (M4) gates production integration (M12)
- WP7 pilot beta (M9) requires WP3 feature-complete platform
- WP6 certifications (M15) require WP3 production v1.0 (M12) + WP4 accessibility validation

### 3.2 Key Milestones & Success Criteria

| Milestone | Date | Success Criteria |
|-----------|------|------------------|
| **MS1: Security Architecture Freeze** | M3 | Zero-trust design, threat models, DPIA v1 approved |
| **MS2: Alpha Release** | M6 | E2E system, 4 domains, voice+cards operational |
| **MS3: Beta Release** | M9 | Feature-complete, 8-10 domains, usability tested (n=30), SLOs met |
| **MS4: Production v1.0** | M12 | BankID production ready, performance validated (<1.2s P95 latency) |
| **MS6: Accessibility Pre-Audit** | M10 | EN 301 549 gaps remediated, pre-audit passed |
| **MS7: BankID Production Approval** | M12 | Official approval, security review passed |
| **MS8: Penetration Test Pass** | M9 | External pentest passed, vulnerabilities remediated |
| **MS9: Certifications Complete** | M15 | EN 301 549 certified, GDPR validated, ISO/IEC 42001 implemented |
| **MS10: 10 Pilots Live** | M12 | 10 sites, 200+ users, safety monitoring functional |
| **MS11: Pilots Completed** | M16 | Impact data collected, TRL 8 demonstrated |
| **MS5: Final Review** | M18 | All deliverables complete, investment-ready |

**TRL 8 Validation Criteria:**
- ✅ System complete and qualified through operational testing in 10-15 real-world environments
- ✅ 250-450 elderly users (age 65-85+) successfully completing tasks across 10+ domains
- ✅ Task completion rates >80%, user satisfaction (SUS) >70, NPS >30
- ✅ Security certifications: penetration test passed, GDPR validated, BankID production approved
- ✅ Accessibility certified: EN 301 549 conformance achieved
- ✅ Safety record: zero sentinel events, <2% major incident rate
- ✅ Performance targets met: <1.2s P95 UI latency, <300ms STT partials, 99.5% availability
- ✅ Municipal/care provider validation: procurement-ready packages accepted

### 3.3 Team Capabilities & Resource Plan

**Current Strengths:**
- 2 Founders with complementary technical and business expertise
- Validated technical prototype demonstrating feasibility
- Deep understanding of target user needs through preliminary research
- Established relationships with potential pilot partners

**Planned Team Growth (Target: 9-11 FTEs by M12):**

*Technical Core (Months 1-4):*
- Senior AI/ML Engineers x2: Conversation engine, safety guardrails, MLOps
- Platform Engineers x2: Card UI, voice stack, infrastructure  
- UX/Accessibility Designer: EN 301 549 compliance, elderly-optimized design
- DevSecOps Engineer: Zero-trust architecture, BankID integration, pentesting

*Business/Operations (Months 2-9):*
- BD/Partnerships Manager: Municipal procurement, care provider partnerships
- Customer Success/Pilot Coordinator: Pilot execution, user support
- Data Analyst: Pilot evaluation, impact measurement

*External/Fractional:*
- DPO (Data Protection Officer): GDPR compliance (0.3 FTE retainer)
- Security consultants: Pentesting, architecture review
- Accessibility consultants: Certification support
- Privacy legal counsel: DPIA, DPA negotiations
- ISO/IEC 42001 consultant: AI management system

**Advisory Board (M1-M3):**
- Gerontology/geriatrics expert
- Cybersecurity/financial crime expert  
- Clinical ethicist
- Digital inclusion specialist
- Municipal welfare technology advisor

**Recruitment Strategy:**
- Dedicated recruiter (Month 1)
- Remote-friendly Nordic/EU hiring to access broader talent pool
- Competitive equity packages
- Clear mission-driven positioning (accessibility, security for vulnerable users)
- Internship pipeline for junior talent

**Key Person Risk Mitigation:**
- Architecture/runbook documentation
- Dual ownership of critical components
- Cross-training protocols
- Code review requirements
- Disaster recovery exercises

### 3.4 Budget Allocation

**Total Grant:** €2,500,000 over 18 months

**Personnel (€1.2M, 48%):**
- Technical team (AI/ML, platform, DevSecOps, UX): €850k
- Business/operations (BD, CS, analysis): €250k
- Founders: €100k

**External Services (€330k, 13%):**
- Security: €90k (pentesting €70k, reviews €20k)
- Accessibility: €60k (certification €50k, consulting €10k)
- GDPR/Privacy: €70k (DPO €30k, legal €40k)
- ISO/IEC 42001: €70k (implementation €40k, audit €30k)
- BankID: €40k (vendor support, certification)

**Pilot Costs (€160k, 6%):**
- Participant/site incentives: €100k
- Travel and field operations: €40k
- Support infrastructure: €20k

**Infrastructure (€240k, 10%):**
- Equipment (testing devices, tablets): €120k
- Cloud/compute: €80k
- LLM APIs: €40k

**Other (€70k, 3%):**
- Travel/meetings: €40k
- Dissemination/branding: €30k

**Indirect Costs (€500k, 20%):** Flat 25% of direct costs

**Risk Contingency:** €300k dedicated reserve (part of external services budget, released only for approved contingency actions)

### 3.5 Risk Management Approach

We maintain a comprehensive risk register across four categories with €790k total mitigation budget:

**Technical Risks (€240k mitigation):**
- *AI reliability with vulnerable users:* Confidence gating, guardrails, deterministic fallbacks, red-team testing (€50k)
- *BankID complexity:* Early sandbox integration (M2), certified SDKs, vendor support, security reviews (€70k)
- *Voice/accessibility challenges:* ASR/TTS tuning for elderly Swedish/Norwegian speakers, usability labs (€50k)
- *Security vulnerabilities:* DevSecOps pipeline, OWASP ASVS L2, external pentests, threat modeling (€70k)

**Resource Risks (€105k mitigation):**
- *Talent acquisition:* Dedicated recruiter, remote-friendly policies, competitive equity, contractor bench (€40k)
- *Key person dependency:* Documentation, dual ownership, cross-training, runbooks (€15k)
- *Budget overruns:* Monthly burn monitoring, 90-day reforecasts, stage-gates (€15k)
- *Pilot recruitment:* Over-recruit LOIs (20+ for 10-15 sites), partnerships with PRO/SPF, multi-country strategy (€35k)

**Regulatory/Compliance Risks (€175k mitigation):**
- *GDPR violations:* DPO retainer, DPIA/LIA, EU-only residency, Schrems II compliance, audit logs (€60k)
- *Accessibility certification failures:* Early gap analysis, iterative audits, cognitive testing, second lab if needed (€70k)
- *Medical device classification:* MDR counsel, avoid diagnostic claims, "information/support" positioning (€20k)
- *BankID approval delays:* Pre-submission reviews, conformance checklist, fallback to Freja eID (€25k)

**Market/Partnership Risks (€70k mitigation):**
- *Municipal procurement delays:* Pre-tender engagement, framework positioning, procurement advisor (€35k)
- *Pilot site failures:* Clear protocols, safety monitoring (PSMC), support resources (€20k)
- *Low adoption/churn:* Habit-building features, onboarding support, iterative improvements (€15k)

**Risk Governance:**
- Monthly risk reviews with mitigation actions
- Quarterly stage-gate decisions (continue/pause/pivot)
- Independent Pilot Safety Monitoring Committee (PSMC) with authority to pause
- €300k contingency reserve requiring formal approval for release
- Scenario planning for critical dependencies

### 3.6 Pilot Program Strategy

**Target:** 10-15 operational pilots, 250-450 elderly users (age 65-85+), multiple operational environments

**Pilot Mix:**
- Swedish municipalities (digital inclusion, welfare tech): 6-8 pilots
- Norwegian municipalities (velferdsteknologi): 2-3 pilots
- Private care providers (Attendo, Vardaga, Humana): 4-5 pilots

**Pilot Structure:**
- Duration: 8-12 weeks per site
- Participants: 20-40 users per site
- Paid pilot model: €300-600 per participant (signals value, reduces churn)
- Site coordinators trained and supported

**Recruitment Timeline:**
- M5-M10: Outreach and LOI collection (target: 20+ sites for 10-15 active)
- M7-M9: First wave (5 sites launched)
- M10-M12: Second wave (5 additional sites)
- M12-M15: Third wave (final 3-5 sites, if needed)

**Realistic Sales Cycles Accounted For:**
- Swedish municipalities: 4-8 months (direct procurement paths prioritized)
- Norwegian municipalities: 3-6 months (LUP procedures)
- Private care providers: 2-4 months (site manager sponsorship)

**Pilot Evaluation Framework:**

*Quantitative Metrics:*
- Task completion rates by domain (target: >80%)
- Time savings vs. traditional methods (target: 50-80% reduction)
- Weekly active usage rate (target: >60%)
- Error rates and recovery success
- Technical performance (latency, availability)

*Qualitative Metrics:*
- Digital self-efficacy improvement (eHEALS scale)
- System usability (SUS, target: >70)
- Net Promoter Score (NPS, target: >30)
- Caregiver burden reduction (interviews)
- Safety and confidence (thematic analysis)

**Safety Monitoring:**
- Pilot Safety Monitoring Committee (PSMC): independent experts with pause authority
- Real-time distress signal monitoring
- Financial transaction review (scam protection validation)
- Incident tracking and 24-hour reporting
- GDPR breach procedures (72-hour DPA notification)
- Monthly PSMC reviews

**Ethics & Consent:**
- Ethics approval from Swedish Ethical Review Authority (M1-M2)
- Capacity-first consent with teach-back verification
- Plain language (B1 reading level), large fonts, multimodal formats
- Ongoing consent and easy opt-out
- Proxy consent procedures for cognitively impaired (when appropriate)
- Respect for dissent at all times

### 3.7 Regulatory Compliance Strategy

**GDPR (Vulnerable User Data):**
- DPO retainer from M2
- DPIA completed and approved (M3) before pilot launch
- EU-only data residency (avoid US Cloud Act/Schrems II issues)
- Data Processing Agreements with all municipalities/partners
- Data minimization and purpose limitation enforced in schemas
- Consent management, data subject rights (access, erasure, portability)
- Breach notification procedures (72-hour ready)
- Regular privacy audits

**Accessibility (EN 301 549):**
- Gap analysis (M6-M7)
- Iterative remediation sprints (M8-M13)
- Pre-audit with certification lab (M10)
- Fix critical blockers (M11-M13)
- Final certification audit (M14-M15)
- Target: Full conformance, including cognitive accessibility

**AI Management System (ISO/IEC 42001):**
- Implementation M8-M18
- AI risk assessment framework
- Bias and fairness testing protocols
- Transparency and explainability measures
- Human oversight procedures
- Continuous monitoring
- Certification audit M18-M20 (may extend slightly beyond grant)

**Medical Device Risk Mitigation:**
- Regulatory counsel review (M2-M6)
- Avoid diagnostic/therapeutic claims
- "Information and support" positioning only
- Disclaimers and escalation to healthcare providers
- Document non-medical device rationale

**BankID Production Approval:**
- Sandbox integration (M2-M6)
- Security documentation and conformance checklist
- Pre-submission review with BankID team (M8-M10)
- Production approval target: M12
- Fallback: Freja eID if delays occur

### 3.8 Market Readiness & Exploitation

**Go-to-Market Strategy:**

*B2C Direct:*
- Pricing: €8-12/month subscription
- Channels: Digital marketing (targeting adult children/caregivers), partnerships with pensioner organizations (PRO, SPF Seniorerna), pharmacies, libraries
- CAC target: €120-250 digital, blended €70-150 with partnerships

*B2B2C Municipal:*
- Pricing: €6-9/user/month
- Procurement strategy: Direct procurement (under thresholds), framework agreements, pilot-to-production bridges
- Sales cycle: 9-15 months (accounted for in projections)
- Decision criteria: GDPR compliance (DPAs, DPIA), accessibility (EN 301 549), security (KLASSA-aligned), non-medical positioning

*B2B2C Care Providers:*
- Pricing: €6-8/user/month
- Value proposition: Staff time reduction (50-80% target), resident autonomy, differentiation
- Sales cycle: 2-4 months (faster than municipal)

*B2B2C Health Payers & Telcos:*
- Value-add/CSR bundles
- Preventive care positioning (insurers)
- Digital inclusion positioning (telcos)

**Partnership Pipeline Development (M6-M18):**
- Pre-tender dialogues with municipalities
- Partnerships with care providers (Attendo, Vardaga, Humana in Sweden; Attendo Norge, Stendi in Norway)
- Health payer discussions (Folksam, Länsförsäkringar, Gjensidige, Storebrand)
- Telco partnerships (Telia, Tele2, Telenor)
- Procurement advisor engaged (€20k) to navigate Swedish LOU and Norwegian LOA

**Procurement-Ready Packages (M15):**
- GDPR documentation (DPAs, DPIA, Records of Processing)
- Security documentation (ISO 27001 roadmap, KLASSA alignment)
- Accessibility statements (EN 301 549 certification)
- Service Level Agreements
- Implementation playbooks and training materials
- Pricing and contract templates

**Investment Readiness (M18):**
- Business model validated through pilot conversions
- Unit economics demonstrated (COGS €0.18-0.36/user/month, 94-98% gross margin)
- Financial projections updated with actuals
- Series A target: €10-20M for Nordic scaling
- Pitch deck, data room, investor outreach preparation

### 3.9 Post-Grant Scaling Plan (TRL 9, Investment Phase)

**WP9-12 (Months 19-36, Investment Phase):**

- **WP9 - Production Infrastructure Scaling:** Multi-region deployment, 100k+ user capacity, performance optimization
- **WP10 - Municipal Rollout:** Framework agreements, 25+ municipalities, 10,000+ users
- **WP11 - Market Expansion:** Care provider scaling, health payer partnerships, Nordic expansion (Norway, Denmark, Finland)
- **WP12 - Advanced Features:** 20+ task domains, enhanced memory features, family coordination tools

**Funding:** Series A (€10-20M) for go-to-market acceleration, team scaling (25-30 FTEs), certification expansion (additional EU markets)

**Targets (Year 3 post-grant):**
- 50,000+ active users
- 50+ municipalities and care providers
- Break-even or near break-even
- Demonstrated unit economics at scale
- Series B readiness for European expansion

---

## Summary

Senior AI's 18-month implementation plan systematically advances from TRL 5 to TRL 8 through:

✅ **Rigorous technical development** with security-first, accessibility-first design  
✅ **Real-world validation** through 10-15 operational pilots with 250-450 elderly users  
✅ **Comprehensive compliance** achieving EN 301 549, GDPR, ISO/IEC 42001, and BankID certifications  
✅ **Proactive risk management** with €790k mitigation budget and independent safety oversight  
✅ **Strong team capabilities** scaling to 9-11 FTEs with advisory board support  
✅ **Market readiness** with procurement packages, partnership pipeline, and Series A preparation  

Our plan balances technical innovation with the unique requirements of serving vulnerable users, ensuring both breakthrough performance and uncompromising safety. By M18, we will have a certified, investment-ready platform validated in operational environments, positioned for rapid Nordic scaling.

---

**Document Status:** DRAFT - Based on available information as of November 24, 2025  
**Page Count:** ~5 pages (adjust formatting as needed for Part B submission)  
**Next Steps:** Review with team, integrate with Part B Sections 1 (Excellence) and 2 (Impact), final polish

---

*This section supports the EIC Accelerator Full Application (Part B) for Senior AI.*
