# Ethics Review Requirements (Sweden & Norway)

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 1/6

---

## Do You Need Formal Approval?

### Sweden
- If pilot constitutes "research" on humans or uses sensitive personal data → **YES**
- Apply to **Swedish Ethical Review Authority** (Etikprövningsmyndigheten)
- Act on Ethical Review of Research Involving Humans applies
- Pilots with vulnerable participants + sensitive data (health, disabilities) → **typically require approval**
- Appoint a Swedish Principal Investigator to submit

### Norway
- If "medical and health research" → **REK approval required**
- Under Health Research Act
- If not health research (usability/service evaluation) → still need **DPIA** and institutional data protection approval
- Coordinate with **Sikt** (Norwegian Agency for Shared Services) and DPO
- **When in doubt**: Seek ethics determination and use formal ethics framework

---

## Consent Procedures for Elderly & Cognitively Impaired

### Capacity-First Consent
- Assess decision-making capacity specifically for pilot participation
- Use structured tool: **MacCAT-CR** or **Aid to Capacity Evaluation (ACE)**
- Do NOT rely solely on MMSE/MoCA scores
- Capacity is **decision-specific**

### Comprehension Verification
- Plain-language consent (**B1 reading level**)
- Large fonts (minimum **14–16 pt**)
- Multimodal formats (spoken video/audio, large-print paper)
- **Teach-back questions** to confirm understanding

### Ongoing Consent
- Re-confirm consent at key stages
- After any significant protocol change
- Easy opt-out at any time without penalty

---

## Proxy Consent and Assent

### Sweden
- For individuals who cannot consent → Ethics Authority may permit inclusion with consent from **LAR (Legally Authorized Representative)**
- Typically: court-appointed "God man" or "Förvaltare"
- Often with involvement of next-of-kin
- **Always seek participant's assent**
- **Respect dissent at any point**

### Norway
- If participant lacks capacity → consent from next-of-kin or legal guardian
- Under Health Research Act for minimal-risk research benefiting subject group
- **Always seek assent**
- **Respect dissent**

---

## Ethics File Checklist

**For Both Countries**:
- [ ] Ethics application and determination letters
- [ ] Protocol and risk assessment
- [ ] Consent templates (standard, proxy, re-consent, withdrawal)
- [ ] Capacity assessment SOP and instruments
- [ ] Participant information sheets (plain language, accessible formats)
- [ ] Data protection plan and DPIA
- [ ] Safety monitoring plan (and PSMC charter)
- [ ] Incident reporting SOPs
- [ ] Compensation policy and support contacts
# Safety Monitoring Protocols

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 2/6

---

## Governance Structure

### Pilot Safety Monitoring Committee (PSMC)
- Independent committee (analogous to DSMB)
- **Composition**:
  - Gerontology/geriatrics expert
  - Clinical ethicist
  - Cybersecurity/financial crime expert
  - Data protection specialist
- **Authority**: Pause/stop authority

### Roles
- **Pilot Safety Lead** (internal)
- **Site Safety Officers** (at each municipality/site)
- **Incident Manager**
- **DPO**

---

## Risk Classification for AI-Assisted Tasks

### Critical Harm
- Financial loss
- Exposure to scams
- Incorrect health-related guidance affecting care decisions
- Identity compromise
- Extreme distress

### Major Harm
- Misleading form completion → lost benefits or fines
- Persistent anxiety
- Credential mishandling

### Minor Harm
- Confusing/frustrating responses
- Low-stakes errors with easy recovery

---

## Real-Time Safety Monitoring

### Financial Protection
- **No autonomous execution** of transactions
- AI only assists; requires user review/confirmation
- Clear, large-font confirmations
- **Transaction caps and cooling-off periods**
- **Automatic scam-risk checks**:
  - Warn on first-time payees
  - Unusual amounts
  - Suspicious IBAN/recipient names
  - Red flags (urgency, secrecy, gift cards)
- **Strong two-factor auth** via BankID
- **Never store codes or PINs**
- **No screen recording** during credential entry

### Emotional Distress Monitoring
- Short post-task check-ins: "Was this stressful?" (Likert scale)
- Passive signals: long pauses, repeated help requests
- **Thresholds trigger human follow-up**: distress > 4/5 for two consecutive tasks

### Content Safety and Reliability
- **Guardrails**:
  - No medical diagnoses
  - No legal determinations
  - Provide references
  - Encourage consultation with official channels/human support
- **Restricted domains**:
  - Healthcare portals: limit to navigation and explanation
  - Link to source pages

---

## Pause/Stop Triggers

### Immediate User-Level Stop
- Any **sentinel event**:
  - Confirmed fraud loss
  - Credential compromise
  - Health-related harmful advice
- Stops feature for that user
- Triggers PSMC immediate review

### Site-Level Pause
- **Two major incidents at single site within 7 days**
- Triggers root cause analysis

### Program-Level Pause
- Aggregate major incident rate exceeding thresholds
- Triggers program-level pause

---

## Incident Reporting Requirements

### Within 24 Hours
- Internal log
- Notify Site Safety Officer
- Notify PSMC

### GDPR Personal Data Breach
- Notify DPA within **72 hours**:
  - **IMY** (Sweden)
  - **Datatilsynet** (Norway)
- Notify affected participants without undue delay

### Financial Crime/Suspected Fraud
- Coordinate with participant's bank fraud team
- Document outcomes

### Vulnerability/Abuse Concerns
- Follow municipal safeguarding pathways
- **Lex Sarah-type obligations** may apply to municipal staff
- Coordinate with social services per local policy

---

## Safety Documentation & SOPs

- [ ] Sentinel event definitions and workflow
- [ ] Incident response plan (DPA contact details, breach templates)
- [ ] Financial safety SOPs (caps, warnings, cooling-off, confirmations)
- [ ] Distress monitoring SOP and escalation to human support
- [ ] Feature kill-switch procedures (per-user and per-site)
- [ ] PSMC charter and meeting cadence
- [ ] Stop/pause criteria
# AI Output Quality Assurance

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 3/6

---

## Pre-Pilot Validation

### Golden-Task Suites
- Each use case: bank transfer, healthcare portal navigation, government form
- Include elderly-specific language
- Cognitive load constraints
- Frequent edge cases

### Error Taxonomy
- **Critical**: Incorrect instruction → financial loss, credential exposure, harmful health/admin actions
- **Major**: Misleading steps → delays, penalties, strong distress (no immediate harm)
- **Minor**: Style issues, verbosity, minor misunderstandings without harm

### Thresholds Before Live Pilots
- **Critical error rate**: ≤ 0.1% of guided steps (≤ 1 per 1,000 steps)
- **Major error rate**: ≤ 1% of guided steps
- **Minor error rate**: ≤ 5%, with mitigation options

### Hallucination and Source Fidelity
- Require source linking to official portals for factual guidance
- **Hallucination rate**: ≤ 1% of factual claims in test corpus

### Bias and Appropriateness
- Red-team for ageism and cognitive-ability bias
- **Zero tolerance** for derogatory content
- **Toxic content rate**: ≤ 0.01%
- Test across subgroups: age bands, MCI, ADHD, hearing/vision limitations

---

## Live Pilot Continuous QA

### Shadow Evaluation
- Randomly sample **10% of sessions** for human review weekly
- Annotate errors with taxonomy

### Drift Monitoring
- Alert if weekly critical error rate **> 0.25%**
- Alert if major error rate **> 2%**
- Trigger investigation or pause features

### Safe Update Practice
- **No silent model updates mid-pilot**
- Use canary cohorts
- Document changes
- Re-run golden tests before rollout

### Model Guardrails
- Retrieval-first for procedural content
- Block unsupported claims
- Refusal policy for actions beyond scope
- Suggest official channels
- Step-by-step confirmations for high-stakes tasks
- Encourage "review aloud" or "read-back" confirmations

---

## QA Documentation

- [ ] Test plans and golden datasets (elderly-specific scenarios)
- [ ] Error taxonomy definitions and acceptance thresholds
- [ ] Weekly QA dashboards and drift alerts
- [ ] Model change logs and canary reports
- [ ] Red-teaming protocols and outcomes (bias, hallucination, safety)

---

## Standards Alignment

- **NIST AI RMF** risk management practices
- **ISO/IEC 23894:2023** AI risk management
- **ISO/IEC 42001** AI management system
- **ISO/IEC 25010** (quality characteristics)
- **ISO/IEC 29119** (software testing)
# Data Protection in Pilots (GDPR)

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 4/6

---

## Determining Roles

### Controller vs Processor
- If Senior AI defines purposes/means → **Controller**
- If municipalities co-determine → **Joint Controller** arrangement (Art. 26)
- If municipalities only host recruitment and you process on their behalf → **Data Processing Agreement** (Art. 28)
- **Appoint DPO**
- Maintain **Records of Processing Activities (RoPA)** (Art. 30)

---

## Legal Basis

### Consent
- Collect **explicit consent** for processing
- Especially for health-related data or disability-related information (Art. 6(1)(a) and Art. 9(2)(a))

### Legitimate Interests
- If using for certain analytics → document LI test
- Provide easy opt-out
- **Avoid LI for sensitive categories**

---

## DPIA (Data Protection Impact Assessment)

**Mandatory** given:
- Vulnerable subjects
- Sensitive data
- Novel tech (Art. 35)

**Include**:
- Risk scenarios (financial harm, distress, data breach)
- Mitigations (caps, guardrails, encryption)
- Residual risk
- **Consult DPA if high residual risk remains**

---

## Data Minimization Strategies

### Do NOT Store
- Credentials
- BankID codes
- Full payment details
- Use tokens or session-specific ephemeral memory instead

### Log Only What's Necessary
- Task type
- Anonymized outcome codes
- Timestamps
- Coarse-grain interaction metrics
- Minimal excerpts for error review
- **Pseudonymize participants** via study IDs

### Security
- Separate PII from logs
- Strict role-based access
- Encryption at rest and in transit
- **EU/EEA data residency**

---

## Retention

### Schedule
- Raw interaction logs: **no more than 6–12 months post-pilot**
- Unless required for safety investigations
- De-identify for research analysis if ethics approved
- Destroy identifiable data sooner if not needed

### Deletion
- Immediate deletion on request
- Document deletion procedures and audit trail

---

## Participant Rights

### Rights Portal or Hotline
- Access
- Correction
- Deletion
- Restriction
- Portability
- **Respond within 30 days**

### Privacy Notice (Plain Language)
- Controllers
- Purposes
- Recipients
- Retention
- Rights
- Complaint routes (IMY/Datatilsynet)

---

## Security Controls

- Strong authentication for staff
- Least-privilege
- Detailed audit logging
- Regular penetration testing
- Vendor due diligence and SCCs if any non-EU processors
- Data localization where feasible
- Business continuity plan
- Tested incident response

---

## Data Protection Documentation

- [ ] DPIA with residual risk and mitigations
- [ ] RoPA entries
- [ ] Joint controller arrangement or DPAs
- [ ] Privacy notices and consent forms
- [ ] DSAR handling SOP
- [ ] Security architecture and vendor list
- [ ] Breach notification templates
# Accessibility Validation Protocols

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 5/6

---

## Conformance Approach

### Standards
- **EN 301 549 v3.2**
- **WCAG 2.2 AA** as baseline
- Develop **Accessibility Conformance Report (ACR)/VPAT** (EU edition)
- Cover:
  - Functional performance statements
  - Closed functionality
  - Documentation
  - Support services

---

## Elderly-Centered Testing

### Recruit Participants Across
- Sensory (vision/hearing)
- Motor
- Cognitive profiles (including MCI)
- Provide assistive tech: screen readers, magnification, voice input

### Test Critical Flows
- Banking transfer review
- Healthcare appointment scheduling
- Government application submission
- eID login

---

## Metrics and Passing Thresholds

### Task Success Rate
- **≥ 95%** for critical tasks without human-assist
- **≥ 99%** with human-assist available
- Repeat success on second attempt **≥ 98%**

### System Usability Scale (SUS)
- Average **≥ 70** acceptable
- **≥ 80** preferred for procurement readiness

### NASA-TLX (Cognitive Workload)
- Average **≤ 35/100** on critical tasks
- Outliers addressed with design changes

### Error Rate
- **≤ 1 substantive usability error** per session on critical tasks
- **Zero blockers**

### Readability and Language
- Plain-language scores equivalent to **B1**
- Avoid jargon
- Progressive disclosure and chunking

### Assistive Technology Compatibility
- Pass screen-reader testing (NVDA/JAWS)
- Keyboard-only operability
- Captions/transcripts for audio
- High-contrast themes
- Adjustable text size and speech rate

---

## Accessibility Documentation

- [ ] WCAG 2.2 AA test reports with issue lists and remediation tracking
- [ ] EN 301 549 ACR/VPAT (EU) for product and support services
- [ ] User research summaries showing elderly performance and improvements
- [ ] Accessibility maintenance plan (ongoing audits, regression tests)
# User Selection, Screening & Phased Pilot Plan

**Date**: 2025-11-23  
**Issue**: #12 - QA & Ethics Part 6/6

---

## User Selection and Screening

### Inclusion Criteria
- Age **65+**
- Diverse digital literacy levels
- Diverse cognitive profiles (including MCI, ADHD, mild dementia)
- Basic ability to use smartphone or computer (with or without assistive technology)
- Ability to communicate in pilot languages
- Availability for training and check-ins

### Exclusion Criteria
- Acute delirium or severe dementia without available LAR and regular caregiver support in-session
- Active psychosis or severe depression/anxiety where participation may exacerbate symptoms
- Inability to provide consent or assent AND no LAR
- Ongoing fraud victimization without protective measures

### Capacity Assessment for Consent
- Use **MacCAT-CR** or **ACE**
- Assess: Understanding, Appreciation, Reasoning, Expressing a choice
- If capacity borderline: Involve caregiver, simplify materials, schedule re-consent check

### When to Require Caregiver Supervision
- Bank transfers > set limit
- Sensitive health forms
- **Require** in-person or remote caregiver co-sign-off if:
  - Capacity borderline
  - Participant has history of errors

### Screening Documentation
- [ ] Screening logs
- [ ] Capacity assessment forms
- [ ] Caregiver involvement plans
- [ ] Risk flags and mitigation measures
- [ ] Inclusion/exclusion decisions with rationale

---

## Phased Pilot Plan and Gates

### Phase 0: Lab/Closed-Beta Verification
- Meet QA thresholds
- Complete DPIA
- Ethics approval
- Accessibility ACR draft
- Safety SOPs finalized

### Phase 1: Low-Risk Tasks Only
- Government informational browsing
- Appointment look-ups
- Monitor errors
- Weekly PSMC review

**Gate 1**: Proceed if critical errors ≤ 0.1% and no sentinel events

### Phase 2: Medium-Risk Tasks
- Form guidance
- Benefits applications with human check
- Small-value transactions with caps and cooling-off

**Gate 2**: Proceed if distress below threshold and major errors ≤ 1%

### Phase 3: High-Risk Tasks
- Banking transfers with caregiver co-sign for flagged users
- Health portal navigation with tight guardrails

---

## WP6 (CERTIFICATION) Documentation Bundle

### Compliance Strategy
- [ ] EU AI Act readiness: risk management file, data governance, transparency, post-market monitoring
- [ ] ISO/IEC 42001 alignment: AI MS manual, risk procedures, monitoring, change control
- [ ] ISO 27001-aligned security controls summary

### Accessibility
- [ ] EN 301 549 ACR/VPAT and WCAG 2.2 AA evidence
- [ ] Assistive tech compatibility reports
- [ ] Elderly usability metrics and remediation log

### Data Protection
- [ ] DPIA, RoPA, privacy notices
- [ ] DPAs/joint controller agreements
- [ ] DSAR SOP, breach templates

### Ethics and Safety
- [ ] Ethics approvals/determinations
- [ ] Consent templates, capacity assessment SOP
- [ ] PSMC charter
- [ ] Incident response plan
- [ ] Safety thresholds and kill-switch SOP

### QA and Reliability
- [ ] Test plans, golden datasets
- [ ] Acceptance thresholds
- [ ] Weekly QA reports
- [ ] Red-teaming outcomes
- [ ] Model change logs

---

## WP7 (PILOTS) Operational Checklists

### Site Readiness
- [ ] Local DPO engagement
- [ ] Ethics approval confirmation
- [ ] Site safety officer designated
- [ ] Caregiver protocols agreed
- [ ] BankID non-retention verified

### Participant Onboarding
- [ ] Capacity assessment completed
- [ ] Consent/proxy/assent documented
- [ ] Training provided
- [ ] Accessibility needs recorded
- [ ] Transaction caps configured
- [ ] Caregiver co-sign settings

### Session Checklist
- [ ] Confirm participant mood and readiness
- [ ] Use high-contrast mode and large fonts
- [ ] Remind of caps and confirm each step verbally
- [ ] Record minimal anonymized logs
- [ ] Post-task stress check-in

### Monitoring
- [ ] Weekly QA sample reviews
- [ ] Incident log review
- [ ] PSMC meeting with stop/pause authority
- [ ] Accessibility regression tests after updates

### Offboarding
- [ ] Final interview and SUS/NASA-TLX
- [ ] Rights reminder
- [ ] Delete personal data per retention plan
- [ ] Provide outcomes summary

---

## Practical Safety-By-Design Controls

### No Autonomous Actions
- AI suggests; user executes with explicit confirmations
- "Four-eyes" rule for flagged users or high-value transactions

### Confirmations
- Large-font review screens summarizing actions
- Verbal read-back option
- Bold warnings for first-time payees and unusual patterns

### Content Guardrails
- Retrieval-based answers for official procedures
- Refusal for medical/legal advice
- Link to sources

### Emotion and Fatigue
- Offer breaks
- Adaptive pacing
- On-demand human assistance
- Automatically slow down if repeated errors occur

### Access Control
- Role-based staff permissions
- Per-site dashboards with de-identified analytics
- Immediate feature disable for individuals if risk flags appear
