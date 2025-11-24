# Evaluation Protocol: Innovation & Breakthrough Validation

**Date**: 2025-11-22  
**Issue**: #10 Task 1  
**Purpose**: Rigorous protocol for demonstrating measurable step-change in Task 1 Innovation claims

---

## Executive Summary

This protocol defines **controlled trials with 60-120 elderly participants** to demonstrate Senior AI's breakthrough innovation through **quantified, statistically significant improvements** over state-of-the-art competitors across 10 standardized metrics.

**Study Design**: Randomized crossover trial  
**Duration**: 8 weeks (4-week intervention + 4-week retention)  
**Primary Endpoints**: Task completion rate, cognitive load (NASA-TLX), error rate  
**Secondary Endpoints**: Trust, safety, usability (SUS), accessibility (ISO 21801)

---

## 1. Study Design Overview

### 1.1 Research Questions

**RQ1**: Does Senior AI's multi-resolution, branch-preserving architecture enable significantly higher task completion rates for complex multi-domain workflows compared to mainstream assistants?

**RQ2**: Does Senior AI's progressive disclosure and DAG branching reduce cognitive load by ≥30-50% as measured by NASA-TLX?

**RQ3**: Does Senior AI's capability-scoped execution reduce error rates by ≥60-80% in high-stakes tasks (banking, healthcare)?

**RQ4**: Does Senior AI maintain conversational coherence across ≥30 turns, a 6-10× improvement over baseline assistants?

**RQ5**: Do users with ADHD/MCI benefit comparably to elderly users from Senior AI's cognitive accessibility features?

### 1.2 Study Type

**Randomized Crossover Design**:
- Each participant uses ALL systems (Senior AI, Competitor 1, Competitor 2, Baseline)
- Order randomized to control for learning effects
- Washout period between conditions (48 hours minimum)
- Within-subject comparison increases statistical power

**Why Crossover**: Elderly users vary widely in tech experience, cognitive capacity, and health status. Crossover design controls for individual differences by making each participant their own control.

### 1.3 Sample Size and Power

**Target**: 60-120 participants

**Cohorts**:
- **Cohort A (65-74 years)**: n=20-40 (younger elderly, often tech-capable)
- **Cohort B (75-84 years)**: n=20-40 (target demographic, moderate tech struggle)
- **Cohort C (85+ years)**: n=10-20 (oldest elderly, highest digital exclusion)
- **Cohort D (ADHD/MCI, any age)**: n=10-20 (secondary target group)

**Power Analysis** (preliminary):
- Effect size (Cohen's d): 0.6-0.8 (medium-large) for primary endpoints
- Alpha: 0.05 (two-tailed)
- Power: 0.80
- **Required n**: ~48-60 per condition (crossover design)
- **Target enrollment**: 60-120 to account for 10-20% attrition

**Statistical Significance**: With n=60, crossover design, we have 80% power to detect a 30% relative improvement (e.g., 40% → 52% task completion) at p<0.05.

---

## 2. Participants

### 2.1 Inclusion Criteria

**All Cohorts**:
- Age ≥65 OR diagnosis of ADHD/MCI (Cohort D)
- Independent living (not requiring 24/7 care)
- Basic device literacy (can use smartphone or tablet with assistance)
- Fluent in trial language (Swedish, English, or German depending on site)
- Willing to use 4 different AI systems over 8 weeks
- Informed consent (legally competent or with guardian approval)

**Cohort D (ADHD/MCI) Specific**:
- Documented ADHD diagnosis (any age) OR
- Mild Cognitive Impairment (MoCA score 18-25) OR
- Early-stage dementia (MoCA 10-17, still communicative)

### 2.2 Exclusion Criteria

- Severe hearing or vision impairment preventing interaction with voice/screen interfaces
- Advanced dementia (MoCA <10) or inability to provide meaningful consent
- Current participation in other AI assistant studies (contamination risk)
- Household member already enrolled (avoid within-household learning effects)

### 2.3 Recruitment

**Channels**:
- Senior centers and community organizations
- Memory clinics and geriatric care facilities (for MCI cohort)
- ADHD support groups and productivity communities (for ADHD cohort)
- Online advertisements in elderly-focused forums
- Referrals from primary care physicians

**Compensation**: €150-200 total (€25-35 per session × 6 sessions) to account for time and travel

---

## 3. Comparators

### 3.1 Systems Under Test

**Senior AI** (Intervention):
- Current TRL 5 prototype with all 4 breakthrough features:
  - Three-column multi-resolution UI
  - DAG branching with Branch Return
  - Multi-domain orchestration (start with 5 domains: Healthcare, Banking, Transport, Messaging, Calendar)
  - Capability-scoped execution with elderly-adapted confirmations

**Comparator 1 (Mainstream Assistant)**:
- **Amazon Alexa** with Echo Show (voice + screen) OR
- **Google Assistant** with Nest Hub (voice + screen)
- Rationale: Most widely available; baseline for general population

**Comparator 2 (Best-in-Class Senior Solution)**:
- **ElliQ** (if available; focus on social engagement) OR
- **Memory Lane Geni** (app-based; focus on tech support) OR
- **Dialzara** (voice companion; focus on communication)
- Rationale: Direct competitor in elderly-focused AI space

**Baseline (Siloed Apps, No AI)**:
- User attempts tasks using standard apps (banking app, calendar, maps, messaging)
- No AI assistant; represents current state for digitally excluded elderly

### 3.2 Randomization

**Latin Square Design** for condition order:
- Group 1: Senior AI → Alexa → ElliQ → Baseline
- Group 2: Alexa → ElliQ → Baseline → Senior AI
- Group 3: ElliQ → Baseline → Senior AI → Alexa
- Group 4: Baseline → Senior AI → Alexa → ElliQ

**Washout**: 48-hour minimum between conditions to minimize carryover

---

## 4. Task Suite: "Lighthouse Scenarios"

### 4.1 Task Selection Criteria

Tasks must be:
- **Ecologically valid**: Represent real-world needs for elderly users
- **Multi-domain**: Span ≥2 domains to test orchestration
- **Multi-step**: Require 5-15 turns to complete
- **High-stakes**: Include at least one security/safety-sensitive action
- **Failure-prone**: Current assistants typically fail or require human help

### 4.2 Task Scenarios

#### **Task 1: Healthcare Coordination** (Healthcare + Transport + Calendar + Messaging)

**Scenario**: "Your regular cardiologist is retiring. Find a new cardiologist who accepts your insurance, is within 10km of your home, and has availability within the next 2 weeks. Transfer your upcoming follow-up appointment to this new doctor. Arrange accessible transport to the appointment. Add preparation steps (fasting, bring medication list) to your calendar. Notify your daughter about the new appointment details."

**Success Criteria**:
- Correct specialist identified (insurance-compatible, distance, availability)
- Appointment successfully rescheduled
- Transport booked for correct date/time
- Calendar entries created with reminders
- Family member notified with all details

**Typical Steps**: 12-18 turns

**Baseline Performance** (Alexa/Google): 15-25% completion (most users abandon or need human help)

---

#### **Task 2: Financial Management** (Banking + Document Management + Calendar)

**Scenario**: "Check whether your monthly pension payment of €1,450 has arrived in your account. Pay your electricity bill of €87.50, which is due in 3 days. Download a PDF receipt of the payment. Update your personal budget spreadsheet to reflect this expense. Set a reminder for next month's payment."

**Success Criteria**:
- Correct identification of pension payment arrival
- Bill paid to correct recipient, correct amount
- Receipt downloaded and accessible
- Budget updated (even if simplified)
- Reminder set for future

**Typical Steps**: 8-12 turns

**Baseline Performance**: 30-40% completion (users often pay wrong amount, forget receipt, or skip budget update)

---

#### **Task 3: Travel Planning** (Transport + Calendar + Document Management + Messaging)

**Scenario**: "Plan a trip to visit your grandson in Gothenburg next month. Find senior-friendly train routes (accessible platforms, minimal transfers). Compare prices for flexible vs. fixed tickets. Purchase two flexible tickets (you and a friend). Add boarding passes to your phone's wallet. Share trip details with your friend via message."

**Success Criteria**:
- Route identified with accessibility features
- Price comparison completed (flexible vs. fixed)
- Tickets purchased (2, correct type)
- Boarding passes saved/accessible
- Friend notified with itinerary

**Typical Steps**: 10-15 turns

**Baseline Performance**: 20-30% completion (users struggle with comparing options, branching to explore alternatives)

---

#### **Task 4: Government Services** (Government + Security + Document Management)

**Scenario**: "Complete a tax credit application form for elderly homeowners. The form requires your personal details, property information, and bank details. You need to verify your identity using BankID. Review the completed form before submission. Submit the form and save the confirmation number."

**Success Criteria**:
- Form fields filled correctly
- BankID authentication completed
- User reviews form before submission (comprehension check)
- Form submitted successfully
- Confirmation saved

**Typical Steps**: 10-14 turns

**Baseline Performance**: 10-20% completion (most users cannot complete government forms without help; high anxiety about mistakes)

---

#### **Task 5: Multi-Media Creation** (Media + Messaging + Calendar)

**Scenario**: "Create a birthday card for your granddaughter's 10th birthday. Generate an image of a unicorn in a forest. Write a personalized message. Schedule the card to be sent via email on her birthday (2 weeks from now). Set a reminder 1 day before to add a phone call."

**Success Criteria**:
- Image generated (matches description)
- Message written and attached
- Card scheduled for correct date
- Reminder set for phone call

**Typical Steps**: 8-10 turns

**Baseline Performance**: 25-35% completion (creative tasks often abandoned due to complexity)

---

### 4.3 Task Randomization

**Each participant attempts 3 tasks per condition** (randomly selected from the 5 tasks)
- Ensures variety while keeping session duration manageable
- Task order randomized within condition
- Same task not repeated within participant (avoid learning effects on specific tasks)

---

## 5. Measurements and Instruments

### 5.1 Primary Endpoints

#### **PE1: Task Completion Rate**

**Definition**: Percentage of tasks completed successfully without human assistance

**Measurement**:
- **Complete Success**: All success criteria met (scored 100%)
- **Partial Success**: ≥70% of success criteria met (scored 70%)
- **Failure**: <70% of success criteria met (scored 0%)

**Data Collection**: Video recording + observer checklist

**Target**:
| System | Expected Completion | Senior AI Target |
|--------|---------------------|------------------|
| Baseline (siloed apps) | 10-20% | - |
| Alexa/Google | 30-40% (65+) / 15-25% (75+) | - |
| ElliQ/Geni/Dialzara | 35-45% | - |
| **Senior AI** | - | **≥60-80% (2-3× improvement)** |

**Statistical Test**: Repeated-measures ANOVA with Bonferroni post-hoc; within-subject effect size (Cohen's d)

---

#### **PE2: Cognitive Load (NASA-TLX)**

**Instrument**: NASA Task Load Index (NASA-TLX), validated for HCI research

**Subscales** (7-point Likert, 0=low, 100=high):
1. **Mental Demand**: "How mentally demanding was the task?"
2. **Physical Demand**: "How physically demanding was the task?"
3. **Temporal Demand**: "How hurried or rushed was the pace?"
4. **Performance**: "How successful were you in accomplishing the task?" (reverse-scored)
5. **Effort**: "How hard did you have to work to accomplish the task?"
6. **Frustration**: "How insecure, discouraged, irritated, stressed, or annoyed were you?"

**Overall Score**: Mean of 6 subscales (0-100 scale)

**Target**:
| System | Expected NASA-TLX | Senior AI Target |
|--------|-------------------|------------------|
| Baseline | 75-85 (very high) | - |
| Alexa/Google | 65-75 (high) | - |
| ElliQ/Geni/Dialzara | 55-65 (moderate-high) | - |
| **Senior AI** | - | **≤45 (moderate-low, 30-50% reduction)** |

**Administration**: Immediately after each task (before debrief)

**Statistical Test**: Repeated-measures ANOVA; paired t-tests for Senior AI vs each comparator

---

#### **PE3: Error Rate**

**Definition**: Percentage of tasks with critical errors (wrong amount paid, wrong appointment booked, security breach)

**Categories**:
- **Critical Error**: Incorrect action that would cause real-world harm (e.g., pay €875 instead of €87.50)
- **Minor Error**: Suboptimal choice with no harm (e.g., choose less accessible train route)
- **No Error**: All actions correct

**Measurement**: Observer checklist + video review by 2 independent raters (inter-rater reliability ≥0.85)

**Target**:
| System | Expected Error Rate | Senior AI Target |
|--------|---------------------|------------------|
| Baseline | 40-50% (critical errors) | - |
| Alexa/Google | 20-30% | - |
| ElliQ/Geni/Dialzara | 15-25% | - |
| **Senior AI** | - | **≤5-10% (60-80% reduction)** |

**Statistical Test**: Repeated-measures logistic regression; McNemar's test for pairwise comparisons

---

### 5.2 Secondary Endpoints

#### **SE1: Time-to-Completion**

**Definition**: Duration from task start to completion (or abandonment after 15 minutes)

**Target**: Senior AI ≥40-60% faster than comparators

**Statistical Test**: Repeated-measures ANOVA; log-transformation if non-normal

---

#### **SE2: Steps-to-Completion**

**Definition**: Number of conversational turns or app interactions to complete task

**Target**: Senior AI ≤6-10 steps (vs 15-25 for comparators, 40-60% reduction)

**Measurement**: Automated logging + manual verification

---

#### **SE3: Context Retention (Turn Count)**

**Definition**: Maximum turns before system loses conversational coherence (misreferences, forgets prior context)

**Measurement**: Evaluator codes each turn for context errors; count turns until first major error

**Target**: Senior AI ≥30 turns (vs 3-5 for Alexa/Google, 6-10× improvement)

**Test Task**: Extended multi-day scenario with branches

---

#### **SE4: Branch Return Cost**

**Definition**: Time and steps required to return from exploratory branch to main conversation

**Measurement**: Specific test scenario with forced branching ("Should I pick Tuesday or Thursday?" → explore both)

**Target**: Senior AI ≤5-10 seconds, 1-2 steps (vs 30-60s, 5-10 steps for manual return in linear systems, 70-90% reduction)

---

#### **SE5: System Usability Scale (SUS)**

**Instrument**: 10-item System Usability Scale (Brooke, 1996), gold standard in HCI

**Sample Items**:
- "I think I would like to use this system frequently."
- "I found the system unnecessarily complex." (reverse-scored)
- "I thought the system was easy to use."

**Scoring**: 0-100 scale; ≥68 = above average, ≥80 = good to excellent

**Target**:
| System | Expected SUS | Senior AI Target |
|--------|--------------|------------------|
| Baseline | 40-50 (poor) | - |
| Alexa/Google | 50-60 (below average) | - |
| ElliQ/Geni/Dialzara | 60-70 (average) | - |
| **Senior AI** | - | **≥80 (good to excellent)** |

**Administration**: End of each condition (after all 3 tasks)

---

#### **SE6: Trust and Safety (Likert Scales)**

**Custom Instrument** (based on Mayer et al., 1995 Trust Scale):

**Trust Subscale** (5 items, 7-point Likert):
1. "I trust this assistant to handle my sensitive information (banking, health) securely."
2. "I believe this assistant acts in my best interest."
3. "I would feel comfortable delegating important tasks to this assistant."
4. "This assistant is reliable and dependable."
5. "This assistant is transparent about what it's doing."

**Safety Subscale** (4 items, 7-point Likert):
1. "I feel safe using this assistant for financial transactions."
2. "I am confident this assistant won't make mistakes that could harm me."
3. "This assistant adequately warns me before risky actions."
4. "I can easily undo or correct mistakes made by this assistant."

**Target**: Senior AI significantly higher trust and safety scores than comparators (p<0.01)

---

#### **SE7: ISO 21801 Cognitive Accessibility Checklist**

**Instrument**: Expert-rated checklist derived from ISO 21801-2 (Design/Testing Methods)

**Categories** (binary: Yes/No):
1. **Comprehension Support**: Chunking, layered detail, multiple presentations
2. **Error Tolerance**: Undo, confirmation, clear feedback
3. **Consistent Navigation**: Predictable patterns, familiar affordances
4. **Reduced Cognitive Load**: Minimal memory burden, external scaffolds
5. **User Control**: Adjustable pace, customization

**Scoring**: Percentage of criteria met (0-100%)

**Target**: Senior AI ≥90% compliance (vs <50% for comparators)

**Raters**: 2 HCI experts (inter-rater reliability ≥0.80)

---

#### **SE8: Content Re-read Burden**

**Definition**: Percentage of conversation content user must re-read to maintain context

**Measurement**:
- Eye-tracking (if available) OR
- Think-aloud protocol: "Tell me when you need to scroll back or re-read"
- Observer codes re-reading events

**Target**: Senior AI ≤15-25% (vs 60-80% for linear systems, 70% reduction)

---

### 5.3 Qualitative Endpoints

#### **Interviews and Think-Aloud**

**Semi-Structured Interview** (15-20 minutes per condition):
1. "What did you like most/least about this assistant?"
2. "Did you ever feel lost or confused? When?"
3. "How confident did you feel completing these tasks?"
4. "Would you use this in your daily life? Why or why not?"
5. "How did this compare to [previous condition]?"

**Think-Aloud During Tasks**:
- "Please tell me what you're thinking as you use the system."
- Captures real-time frustration, confusion, delight

**Analysis**: Thematic coding (2 independent coders, κ≥0.75)

---

#### **Observed Behaviors**

**Checklist**:
- Hesitation before actions (security concerns)
- Requests for human help
- Abandonment attempts
- Visible frustration (sighs, head shaking)
- Delight or surprise (positive comments, smiles)

---

## 6. Procedure

### 6.1 Session Structure

**Session 0: Screening and Onboarding** (60 minutes)
- Informed consent
- Cognitive screening (MoCA for MCI cohort; ADHD symptom checklist if applicable)
- Technology experience questionnaire
- Demographic data
- Tutorial on study procedures (not on specific systems)

**Sessions 1-4: Condition Testing** (90 minutes each, 2-3 days apart)
- Brief system tutorial (10 minutes): "This is [System Name]. Here's how to start a conversation..."
- Task 1 (20 minutes): Attempt + NASA-TLX
- Short break (5 minutes)
- Task 2 (20 minutes): Attempt + NASA-TLX
- Short break (5 minutes)
- Task 3 (20 minutes): Attempt + NASA-TLX
- SUS questionnaire (5 minutes)
- Trust/Safety scales (5 minutes)
- Semi-structured interview (15 minutes)

**Session 5: Retention and Preference** (60 minutes, 4 weeks after Session 4)
- Repeat 1 task with Senior AI (retention check)
- Repeat 1 task with best comparator (retention check)
- Forced-choice preference: "Which system would you use in real life?"
- Final interview: Reflections on overall experience

**Session 6: Debrief and Compensation** (30 minutes)
- Results summary (if requested)
- Compensation distribution
- Thank you and future contact options (for Phase 2 pilot)

---

### 6.2 Standardization

**Facilitator Training**:
- All facilitators complete 8-hour training on:
  - Elderly-sensitive communication
  - Avoiding leading language
  - Handling technical failures gracefully
  - Ensuring participant safety (especially with banking tasks)
- Inter-facilitator reliability check (≥0.90 on observer checklists)

**Technical Setup**:
- Identical hardware where possible (same tablet/screen size for app-based systems)
- Controlled environment (quiet room, consistent lighting)
- Backup devices in case of technical failure
- Screen recording for all sessions (with consent)

**Script Standardization**:
- Task instructions read verbatim from script
- Facilitator responses to questions limited to: "Do your best" or "Whatever you think is right"
- No hints or corrections during tasks

---

## 7. Data Analysis Plan

### 7.1 Sample Size Justification (Detailed)

**Primary Endpoint**: Task Completion Rate

**Assumptions**:
- Baseline (Alexa): 35% completion for 65-74 cohort
- Senior AI: 70% completion (2× improvement)
- Effect size: Cohen's h = 0.72 (medium-large for proportions)
- Crossover design: correlation between repeated measures ρ ≈ 0.5
- Alpha: 0.05 (two-tailed)
- Power: 0.80

**Calculation** (using G*Power for repeated-measures ANOVA):
- **n = 48** participants required
- **Target enrollment: 60-80** to account for 15-20% attrition

**Secondary Endpoints** (NASA-TLX):
- Effect size: Cohen's d = 0.6 (30% reduction, SD ≈ 15)
- Same assumptions
- **n = 52** required

**Conservative target: 60-120 participants** across 4 cohorts ensures power for subgroup analyses

---

### 7.2 Statistical Tests

#### **Primary Endpoints**

**PE1: Task Completion Rate**
- **Test**: Repeated-measures ANOVA (factor: System; levels: 4)
- **Post-hoc**: Bonferroni-corrected pairwise comparisons
- **Effect Size**: Cohen's d (within-subject), η² (ANOVA)
- **Subgroup**: Age cohort × System interaction

**PE2: Cognitive Load (NASA-TLX)**
- **Test**: Repeated-measures ANOVA
- **Post-hoc**: Paired t-tests (Senior AI vs each comparator)
- **Effect Size**: Cohen's d
- **Covariates**: Baseline tech experience, MoCA score

**PE3: Error Rate**
- **Test**: Generalized Estimating Equations (GEE) for repeated binary outcomes
- **Alternative**: McNemar's test for paired proportions
- **Effect Size**: Odds ratio

#### **Secondary Endpoints**

**SE1-SE4** (Time, Steps, Context Retention, Branch Return Cost):
- **Test**: Repeated-measures ANOVA (or Friedman if non-normal)
- **Post-hoc**: Bonferroni-corrected pairwise
- **Transformation**: Log for time data if skewed

**SE5: SUS**
- **Test**: Repeated-measures ANOVA
- **Normality**: SUS typically normal; check with Shapiro-Wilk

**SE6: Trust and Safety**
- **Test**: Repeated-measures ANOVA per subscale
- **Reliability**: Cronbach's α ≥ 0.70 for internal consistency

**SE7: ISO 21801 Checklist**
- **Test**: Paired t-test (Senior AI % vs mean of comparators)
- **Effect Size**: Cohen's d

**SE8: Content Re-read**
- **Test**: Repeated-measures ANOVA or Friedman

---

### 7.3 Missing Data Handling

**Strategy**: Intent-to-treat analysis
- Primary analysis: All randomized participants included
- Missing tasks coded as failures (conservative)
- Sensitivity analysis: Complete-case analysis
- Multiple imputation if missing >10%

**Attrition Expectation**: 10-20% (elderly studies, 4-8 week duration)

---

### 7.4 Interim Analysis

**Milestone**: After 30 participants complete all conditions
- **Purpose**: Check assumptions, adjust recruitment if needed
- **No stopping rules**: Study continues to full sample regardless

---

## 8. Ethical Considerations

### 8.1 Informed Consent

- Written consent required; plain language (8th-grade reading level)
- Audio/video consent separate from study participation
- Right to withdraw anytime without penalty
- Compensation prorated for partial completion

### 8.2 Vulnerable Population Protections

**Elderly Participants**:
- Cognitive screening (MoCA) to ensure capacity to consent
- Option for family member to observe (if participant wishes)
- Frequent breaks to prevent fatigue
- Health monitoring: blood pressure check before/after if participant has cardiac history

**ADHD/MCI Participants**:
- Legal capacity to consent OR guardian co-signature
- Task modifications if needed (e.g., extended time limits)

### 8.3 Data Protection

- **GDPR Compliance**: All data stored on EU servers
- **Anonymization**: Participant IDs (no names in datasets)
- **Encryption**: AES-256 for stored data; TLS for transmission
- **Access Control**: Only research team; password-protected
- **Retention**: 10 years (regulatory requirement); then deletion

### 8.4 Risk Mitigation

**Financial Risks** (Banking Tasks):
- Use **sandbox accounts** with fake balances (participants notified)
- If real banking APIs used (for realism), amounts <€1 with instant reversal

**Psychological Risks** (Frustration, Anxiety):
- Debrief after failures: "This was a test of the system, not you."
- Facilitator trained to recognize distress and offer breaks
- Referral to counseling resources if needed

### 8.5 Ethics Approval

**Required**: Institutional Review Board (IRB) or Ethics Committee approval before recruitment
- Application prepared based on this protocol
- Estimated timeline: 4-6 weeks for approval

---

## 9. Timeline and Milestones

### 9.1 Study Timeline (12 Months)

| Month | Milestone |
|-------|-----------|
| **1-2** | Ethics approval, facilitator training, pilot testing (n=5) |
| **3-4** | Cohort A recruitment and testing (n=20-40) |
| **5-6** | Cohort B recruitment and testing (n=20-40) |
| **7-8** | Cohort C recruitment and testing (n=10-20) |
| **9** | Cohort D recruitment and testing (n=10-20) |
| **10** | Retention sessions (all cohorts) |
| **11** | Data cleaning, statistical analysis |
| **12** | Report writing, manuscript preparation |

### 9.2 Deliverables

- **Month 6**: Interim report (Cohorts A-B results)
- **Month 9**: Cohort C-D results
- **Month 12**: Final report with full dataset
- **Month 13**: Manuscript submitted to peer-reviewed journal (e.g., *CHI*, *Journal of Medical Internet Research*)

---

## 10. Budget Estimate (Rough)

| Item | Cost |
|------|------|
| **Participant compensation** (80 participants × €180) | €14,400 |
| **Facilitator salaries** (2 FTE × 6 months × €4,000/mo) | €48,000 |
| **Equipment** (tablets, recording devices) | €5,000 |
| **Competitor system subscriptions** (Alexa, ElliQ trials) | €2,000 |
| **Ethics approval and admin** | €2,000 |
| **Data analysis software** (SPSS, NVivo for qualitative) | €1,500 |
| **Travel/venue** (senior center partnerships) | €3,000 |
| **Contingency** (10%) | €7,590 |
| **TOTAL** | **~€83,500** |

*Note: Can be reduced if using volunteer facilitators or university partnerships*

---

## 11. Success Criteria

### 11.1 Minimum Viable Results (for EIC Application)

To claim "breakthrough" status, Senior AI must achieve:

1. ✅ **Task Completion**: ≥2× improvement over best comparator (p<0.01)
2. ✅ **Cognitive Load**: ≥30% reduction in NASA-TLX (p<0.01)
3. ✅ **Error Rate**: ≥60% reduction (p<0.01)
4. ✅ **Context Retention**: ≥6× improvement (≥30 turns vs ≤5 for Alexa/Google) (p<0.01)
5. ✅ **SUS**: ≥80 score (vs <70 for comparators)

### 11.2 Stretch Goals

- **3× improvement** for 75+ cohort (vs 2× for 65-74)
- **80% error reduction** (vs 60% minimum)
- **ISO 21801**: 95%+ compliance (vs 90% target)
- **User preference**: >75% choose Senior AI in forced-choice

---

## 12. Conclusion

This protocol provides a **rigorous, standardized framework** for demonstrating Senior AI's breakthrough innovation through **quantified, statistically significant, and reproducible evidence**.

**Key Strengths**:
- ✅ Randomized crossover design (controls individual differences)
- ✅ Standardized instruments (NASA-TLX, SUS, ISO 21801)
- ✅ Ecologically valid tasks (real-world scenarios)
- ✅ Multiple comparators (mainstream + best-in-class senior solution)
- ✅ Adequate power (60-120 participants)
- ✅ Clear success criteria (2×, 30%, 60%, 6× improvements)

**Alignment with EIC Excellence Criteria**:
- **Demonstrates step-change**: Quantified improvements with statistical significance
- **Rigorous methodology**: Published standards, peer-reviewable
- **Reproducible**: Full protocol enables replication
- **Societal impact**: Real users, real tasks, real benefits

**This evaluation will produce the evidence needed to substantiate breakthrough claims in the EIC application.**

---

**Status**: Protocol ready for Ethics Committee submission and pilot testing

**Next Steps**:
1. Finalize lighthouse scenarios with user co-design (n=5 elderly consultants)
2. Submit ethics application
3. Recruit pilot participants (n=5) for protocol testing
4. Refine based on pilot feedback
5. Begin full recruitment (Month 3)
