# Appendix B: Validation Protocol & Metrics

**For Evidence-Based Evaluation Questions**

---

## TRL 5 Validation (Completed)

### Study Design
**Type**: Within-subjects comparative study  
**N**: 30 elderly participants  
**Location**: Stockholm, Malmö, Gothenburg (Sweden)  
**Duration**: 4 weeks (Nov 2024 - Oct 2025)  
**Comparison**: Senior AI (TRL 5 prototype) vs. baseline (Alexa/Google Assistant)

---

### Participant Characteristics

| Attribute | Distribution |
|-----------|--------------|
| **Age range** | 68-87 years (mean: 76.4, SD: 5.2) |
| **Gender** | 19 female (63%), 11 male (37%) |
| **Digital literacy** | Low: 40%, Moderate: 50%, High: 10% |
| **Cognitive status** | Normal: 80% (n=24), MCI: 20% (n=6) |
| **Tech experience** | All smartphone users, varying app comfort |
| **Living situation** | Independent: 73%, With family: 20%, Assisted: 7% |
| **Languages** | Swedish native: 100%, English proficiency: 60% |

**Inclusion Criteria**:
- Age 65+
- Smartphone or tablet user (at least 3 months experience)
- Willing to complete both Senior AI and baseline tasks
- Able to provide informed consent

**Exclusion Criteria**:
- Severe dementia (MMSE <15)
- Severe vision/hearing impairment (uncorrected)
- Non-Swedish speaker (for this initial study)

---

### Task Scenarios (Standardized)

Each participant completed **5 task scenarios** with both Senior AI and baseline assistant (order randomized, counterbalanced):

#### 1. Healthcare: Prescription Refill
**Goal**: Refill diabetes medication and book follow-up appointment  
**Steps**: Check prescription status → Select pharmacy → Confirm order → Book appointment  
**Complexity**: Medium (4-5 steps, 2 domains)  
**Baseline completion**: 35%  
**Senior AI completion**: 87%

#### 2. Banking: Bill Payment
**Goal**: Check balance, pay utility bill, confirm transaction  
**Steps**: Authenticate → View balance → Select payee → Enter amount → Confirm  
**Complexity**: Medium (5-6 steps, 1 domain)  
**Baseline completion**: 42%  
**Senior AI completion**: 83%

#### 3. Transport: Appointment Transit
**Goal**: Plan route to hospital, book mobility assistance  
**Steps**: Enter destination → Check transit options → Book paratransit → Confirm pickup time  
**Complexity**: Medium-High (5-7 steps, 1 domain)  
**Baseline completion**: 38%  
**Senior AI completion**: 89%

#### 4. Government: Pension Statement
**Goal**: Access pension statement, update contact information  
**Steps**: Authenticate (BankID) → Navigate portal → Download statement → Update address  
**Complexity**: Medium (4-5 steps, 1 domain)  
**Baseline completion**: 40%  
**Senior AI completion**: 82%

#### 5. Multi-Domain: Coordinated Care
**Goal**: Book appointment + arrange transport + refill prescription (all related to same visit)  
**Steps**: 10-12 steps across 3 domains with dependencies  
**Complexity**: High (cross-domain coordination)  
**Baseline completion**: 20%  
**Senior AI completion**: 78%

---

## Measurement Instruments

### Primary Outcomes

**1. Task Completion Rate**
- **Definition**: Binary success (completed all required steps correctly) or failure
- **Measurement**: Observer-rated, validated against system logs
- **Result**: Senior AI 82-89% vs. Baseline 35-45% (≥2× improvement)

**2. Cognitive Load (NASA-TLX)**
- **Definition**: Subjective workload assessment across 6 dimensions
- **Dimensions**: Mental demand, physical demand, temporal demand, performance, effort, frustration
- **Scale**: 0-10 for each dimension (higher = more load)
- **Measurement**: Post-task questionnaire
- **Result**: Senior AI mean 3.2/10 vs. Baseline mean 6.8/10 (30-50% reduction)

**3. Error Rate**
- **Definition**: Count of errors per task (wrong selections, forgotten steps, lost context, abandonment)
- **Taxonomy**:
  - **Navigation errors**: Wrong menu, lost place
  - **Input errors**: Incorrect data entry
  - **Comprehension errors**: Misunderstood instructions
  - **Abandonment**: Gave up mid-task
- **Measurement**: Observer-coded, inter-rater reliability 0.89
- **Result**: Senior AI 0.8-1.2 errors/task vs. Baseline 4-6 errors/task (60-80% reduction)

**4. Context Retention**
- **Definition**: Number of conversational turns before confusion or context loss
- **Measurement**: Observer-noted point where user had to restate or ask "what were we doing?"
- **Multi-day test**: Resume conversation 2-5 days later, measure success
- **Result**: Senior AI ≥30 turns (often 40-50) vs. Baseline 3-5 turns (6-10× improvement)

---

### Secondary Outcomes

**5. User Satisfaction (System Usability Scale - SUS)**
- **Scale**: 10-item questionnaire, 0-100 score
- **Benchmark**: ≥70 = good, ≥80 = excellent
- **Result**: Senior AI mean 78.3 (excellent) vs. Baseline mean 52.1 (poor)

**6. Confidence Rating**
- **Question**: "How confident are you that you completed the task correctly?"
- **Scale**: 1-7 (not at all → completely confident)
- **Result**: Senior AI mean 5.8 vs. Baseline mean 3.2

**7. Time to Completion**
- **Measurement**: Seconds from task start to completion (successful attempts only)
- **Note**: Senior AI often slower due to confirmations, but users preferred this
- **Result**: Senior AI +15-25% time, but +2× completion rate = net efficiency gain

**8. Help-Seeking Behavior**
- **Measurement**: Count of times user asked observer for help or clarification
- **Result**: Senior AI mean 0.4 requests/task vs. Baseline mean 2.8 requests/task

---

## Qualitative Findings

### User Quotes (Selected)

> "I could see where I'd been and what we decided. With Alexa, I forget what I just asked."  
> — **Karin, 74** (on Conversation Atlas)

> "When I wasn't sure about Thursday, I could try another day without losing everything. That made me feel safe."  
> — **Gustaf, 81** (on branching)

> "It explained what it would do before doing it. I knew I wasn't making a mistake."  
> — **Margareta, 79** (on safety confirmations)

> "I came back three days later and it remembered our whole conversation. That's never happened."  
> — **Per, 85** (on multi-day context)

> "With Alexa, I'm always worried I'll do something wrong. This one makes me feel in control."  
> — **Birgit, 77** (on confidence)

---

### Observed Behaviors

**Exploration Confidence**:
- **Baseline**: Fear of "breaking" things; hesitation to try alternatives; stick with first option even if uncertain
- **Senior AI**: Willing to create branches, explore options, compare alternatives safely

**Anxiety Reduction**:
- **Baseline**: Visible tension, repeated confirmation-seeking ("Did it work? Are you sure?")
- **Senior AI**: Calm demeanor, trust in system's transparency and reversibility

**Self-Correction**:
- **Baseline**: Errors often unnoticed until too late; system doesn't catch or prevent
- **Senior AI**: Users caught own errors before execution; safety confirmations prompted reconsideration

**Multi-Day Engagement**:
- **Baseline**: 23% successfully resumed task after 2+ days (most forgot context, started over)
- **Senior AI**: 87% successfully resumed with full context intact

---

## TRL 6-7 Validation Plan (Months 1-12, Grant Phase)

### Expanded Cohort

**N**: 250-500 users  
**Sites**: 4-6 operational sites (municipalities, care providers)  
**Countries**: Sweden, Norway, Denmark  
**Duration**: 12 months (rolling enrollment)

**Participant Diversity**:
- **Age**: 65-90+ (emphasis on 75+ cohort)
- **Gender**: Target 60% female, 40% male (reflects elderly demographics)
- **Digital literacy**: Full spectrum (low, moderate, high)
- **Cognitive status**: Normal (70%), MCI (20%), early dementia (10%)
- **Living situation**: Independent (60%), with family (25%), assisted (15%)
- **Languages**: Swedish, Norwegian, Danish (localized versions)

---

### Controlled Trial Design (n=100-120)

**Type**: Randomized controlled trial (RCT)  
**Groups**:
- **Intervention**: Senior AI (n=60-70)
- **Control**: Standard care / baseline assistant (n=40-50)

**Randomization**: Stratified by age group (65-74, 75-84, 85+) and digital literacy

**Primary Endpoints** (3-month follow-up):
- Task completion rate (10 standardized tasks)
- Digital independence (ability to complete tasks without human help)
- Quality of life (WHO-5 Well-Being Index)
- Healthcare outcomes (medication adherence, appointment attendance)

**Secondary Endpoints**:
- Cognitive load (NASA-TLX)
- User satisfaction (SUS)
- Caregiver burden (Zarit Burden Interview)
- Safety incidents (serious/minor)

---

### Real-World Validation (n=150-380 non-trial users)

**Type**: Observational cohort study  
**Setting**: 10-15 pilot sites (municipalities, care providers, health insurers)  
**Duration**: 6-12 months per user

**Outcomes**:
- **Usage metrics**: Active users, frequency, domains used, feature adoption
- **Task outcomes**: Completion rates by domain, error types, safety incidents
- **Retention**: Monthly active users (MAU), churn rate, reasons for discontinuation
- **Satisfaction**: Quarterly surveys, NPS (Net Promoter Score)
- **Impact**: Self-reported independence, reduced family assistance, qualitative interviews

---

## TRL 8 Validation (Months 13-18, Grant Phase)

### Certification-Quality Evidence

**Accessibility Conformance (EN 301 549)**:
- **Formal audit**: W3C or equivalent accredited body
- **User testing**: 30+ users with diverse abilities (vision, hearing, motor, cognitive impairments)
- **Assistive tech compatibility**: Screen readers, voice control, switch access, magnification
- **Documentation**: VPAT (Voluntary Product Accessibility Template), conformance report

**AI Act Conformity Assessment**:
- **Notified body review**: High-risk AI system classification
- **Risk management**: Documented risk register, mitigation strategies, monitoring plan
- **Data governance**: Training data provenance, bias testing, quality assurance
- **Transparency**: Explainability testing, user comprehension validation
- **Human oversight**: Escalation pathways, override mechanisms, audit trails

**Safety Validation (Zero Serious Incidents)**:
- **Definition**: Serious incident = financial loss >€500, medication error with harm, data breach
- **Monitoring**: Real-time anomaly detection, user/caregiver reporting, quarterly audits
- **Target**: Zero serious incidents across 250-450 pilot users over 12-18 months

---

## Success Criteria for TRL 8

| Metric | TRL 5 Baseline | TRL 8 Target | Pass/Fail |
|--------|----------------|--------------|-----------|
| **Task completion rate** | 82-89% (lab) | ≥75% (real-world) | Pass required |
| **User satisfaction (SUS)** | 78.3 (lab) | ≥75 (real-world) | Pass required |
| **Cognitive load (NASA-TLX)** | 3.2/10 (lab) | ≤4.5/10 (real-world) | Pass required |
| **Safety incidents** | Zero (n=30, 4 weeks) | Zero serious (n=250-450, 18 months) | Pass required |
| **Accessibility conformance** | Not tested | EN 301 549 certificate | Pass required |
| **AI Act conformity** | N/A | Notified body approval | Pass required |
| **Retention (6-month)** | N/A (lab study) | ≥70% | Target |
| **Caregiver approval** | N/A | ≥80% | Target |

**Investment Readiness**: All "Pass required" criteria met, plus demonstrated product-market fit (15-30k MAU early adopters)

---

## Visual Elements
- **TRL 5 results**: Bar charts for task completion, cognitive load, errors, context retention
- **Participant demographics**: Age, gender, digital literacy, cognitive status distributions
- **Task scenario flowcharts**: Visual representation of 5 standardized tasks
- **TRL 6-7 study design**: Diagram showing RCT + observational cohorts
- **TRL 8 certification roadmap**: Timeline with EN 301 549, AI Act, safety validation
- **Success criteria dashboard**: Pass/fail checklist with current status

---

## For Evaluators

**Key Questions This Slide Answers**:
1. What evidence do you have? (TRL 5: n=30, measured outcomes)
2. How will you validate at TRL 6-7-8? (RCT + observational + certification)
3. What are your success criteria? (Task completion, safety, satisfaction, conformance)
4. How do you ensure rigor? (Standardized instruments, third-party audits, notified body)
5. Can you scale evidence generation? (250-500 users, 10-15 sites, 3 countries)
