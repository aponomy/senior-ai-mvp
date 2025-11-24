# Task Start Prompt Template

Use this prompt when starting work on any EIC application task:

---

## 🌊 Prompt to Start a REWRITE RIPPLE (Major Conceptual Change)

**When to use**: You've discovered a major new concept, positioning shift, or strategic reframe that needs to systematically ripple through all materials.

```
I want you to start a REWRITE RIPPLE for: [BRIEF CONCEPT DESCRIPTION]

**Instructions**: Follow the workflow in `docs/00. Instructions for rewrite.md`

**Context**:
- Project: Senior AI - AI assistant for elderly and cognitively challenged users
- New concept: [One-sentence description]
- Triggered by: [User feedback / Market research / Competitive analysis / Strategic realization]
- Previous positioning: [What we said before]
- New positioning: [What we're saying now]

**What I need from you**:
1. Follow the 5-phase ripple workflow (Identification → Investigation → Systematic Updates → Quality Assurance → Presentation)
2. STOP and ASK ME 3-5 strategic questions BEFORE researching
3. Use expert consultation for competitive/technical/business implications
4. Prioritize updates: Pitch deck → Core docs → Application drafts → Synthesis
5. Document the full ripple in a change log

**Expected Deliverables**:
- Strategic clarification (3-5 SHORT questions to me)
- Research documents (ask_expert/ - competitive, technical, business implications)
- Analysis document (reasoning/ - impact assessment, update strategy)
- Updated files (pitch deck, README, Description.md, application drafts)
- Consistency checks (grep for old terminology)
- Change log (decisions/ - what rippled where)

**Start by**:
1. Reading `docs/00. Instructions for rewrite.md`
2. Assessing scope (which materials affected?)
3. Asking me 3-5 SHORT strategic questions
4. WAITING for my answers before proceeding

Begin now.
```

**Example**:
```
I want you to start a REWRITE RIPPLE for: AI accessibility layer positioning

**Context**:
- New concept: Senior AI makes thousands of existing AI services (ChatGPT, Midjourney, Adobe Firefly, Perplexity) accessible to elderly users through Create/Learn/Connect/Execute framework
- Triggered by: User feedback about missing creativity, AI ecosystem access, empowerment framing
- Previous positioning: "Safe tool for elderly to not get left behind"
- New positioning: "Gateway to AI ecosystem enabling creative empowerment"

Begin now.
```

---

## 📋 Prompt to Start a Task

```
I want you to work on EIC Application Issue #[NUMBER], Task [NUMBER]: [TASK NAME]

**Instructions**: Follow the workflow in `docs/00. Instructions.md`

**Context**:
- Project: Senior AI - AI assistant for elderly and cognitively challenged users
- Application: EIC Accelerator (grant up to €2.5M + equity up to €15M)
- Current Phase: [Phase 1 / Phase 2 / etc.]

**What I need from you**:
1. Follow the 5-phase workflow (Understanding → Strategic Clarification → Deep Research → Synthesis & Writing → Review)
2. Use the file naming convention: [issue]_[task]_[description].md
3. STOP and ASK ME if research suggests changing Senior AI's tech, features, or offering
4. Document all research, reasoning, and decisions
5. Present comprehensive summary when complete

**Expected Deliverables** for this task:
- Research documents (ask_expert/)
- Analysis/reasoning documents (reasoning/)
- Strategic decisions if needed (decisions/)
- Synthesis document (synthesis/)
- Draft section (drafts/)
- Chat summary of findings

**Start by**:
1. Reading `docs/01. Description.md`
2. Reviewing Issue #[NUMBER] in GitHub
3. Identifying information gaps
4. Presenting your research plan before proceeding

Begin now.
```

---

## 📝 Example Usage

### Example 1: Starting Task for Excellence Section

```
I want you to work on EIC Application Issue #10, Task 1: Innovation & Breakthrough Nature

**Instructions**: Follow the workflow in `docs/00. Instructions.md`

**Context**:
- Project: Senior AI - AI assistant for elderly and cognitively challenged users
- Application: EIC Accelerator (grant up to €2.5M + equity up to €15M)
- Current Phase: Part B.1 - Excellence Section

**What I need from you**:
1. Follow the 5-phase workflow (Understanding → Strategic Clarification → Deep Research → Synthesis & Writing → Review)
2. Use the file naming convention: 10_01_[description].md
3. STOP and ASK ME if research suggests changing Senior AI's tech, features, or offering
4. Document all research, reasoning, and decisions
5. Present comprehensive summary when complete

**Expected Deliverables** for this task:
- Research documents (ask_expert/)
- Analysis/reasoning documents (reasoning/)
- Strategic decisions if needed (decisions/)
- Synthesis document (synthesis/)
- Draft section (drafts/)
- Chat summary of findings

**Start by**:
1. Reading `docs/01. Description.md`
2. Reviewing Issue #10 in GitHub
3. Identifying information gaps
4. Presenting your research plan before proceeding

Begin now.
```

### Example 2: Starting Task for Market Opportunity

```
I want you to work on EIC Application Issue #11, Task 1: Market Opportunity & Size

**Instructions**: Follow the workflow in `docs/00. Instructions.md`

**Context**:
- Project: Senior AI - AI assistant for elderly and cognitively challenged users
- Application: EIC Accelerator (grant up to €2.5M + equity up to €15M)
- Current Phase: Part B.2 - Impact Section

**What I need from you**:
1. Follow the 5-phase workflow (Understanding → Strategic Clarification → Deep Research → Synthesis & Writing → Review)
2. Use the file naming convention: 11_01_[description].md
3. STOP and ASK ME if research suggests changing Senior AI's tech, features, or offering
4. Document all research, reasoning, and decisions
5. Present comprehensive summary when complete

**Expected Deliverables** for this task:
- Research documents (ask_expert/)
- Analysis/reasoning documents (reasoning/)
- Strategic decisions if needed (decisions/)
- Synthesis document (synthesis/)
- Draft section (drafts/)
- Chat summary of findings

**Start by**:
1. Reading `docs/01. Description.md`
2. Reviewing Issue #11 in GitHub
3. Identifying information gaps
4. Presenting your research plan before proceeding

Begin now.
```

---

## 🎯 Quick Reference: Task Numbers

### Issue #10: Excellence & Innovation
- Task 1: Innovation & Breakthrough Nature → `10_01_`
- Task 2: Technology Readiness Level (TRL) → `10_02_`
- Task 3: Competitive Advantages → `10_03_`
- Task 4: IP Strategy → `10_04_`
- Task 5: State of the Art Analysis → `10_05_`
- Task 6: Technical Validation Evidence → `10_06_`

### Issue #11: Impact & Market Opportunity
- Task 1: Market Opportunity & Size → `11_01_`
- Task 2: Business Model & Revenue Projections → `11_02_`
- Task 3: Scalability Potential → `11_03_`
- Task 4: European Added Value → `11_04_`
- Task 5: Sustainability & Social Impact → `11_05_`
- Task 6: Competitive Market Position → `11_06_`
- Task 7: Risk Analysis & Mitigation → `11_07_`

### Issue #12: Implementation Plan & Team
- Task 1: Work Package Structure (Grant Phase) → `12_01_`
- Task 2: Work Package Structure (Investment Phase) → `12_02_`
- Task 3: Deliverables & Milestones → `12_03_`
- Task 4: Team Composition & Capabilities → `12_04_`
- Task 5: Resource Planning → `12_05_`
- Task 6: Risk Management → `12_06_`
- Task 7: Quality Assurance & Ethics → `12_07_`
- Task 8: Collaboration & Partnerships → `12_08_`

### Issue #13: Financial Planning & Budget
- Task 1: Current Financial Status Assessment → `13_01_`
- Task 2: Detailed Grant Budget (Lump Sum) → `13_02_`
- Task 3: 5-Year Financial Projections → `13_03_`
- Task 4: Innovation-Specific Projections → `13_04_`
- Task 5: Equity Investment Plan → `13_05_`
- Task 6: Funding History & Strategy → `13_06_`
- Task 7: Financial Assumptions & Justification → `13_07_`
- Task 8: Financial Risk Analysis → `13_08_`

### Issue #14: Letters of Intent
- Task 1: LOI Strategy & Target Identification → `14_01_`
- Task 2: Pilot Customer LOIs → `14_02_`
- Task 3: Technology Partner LOIs → `14_03_`
- Task 4: Distribution/Go-to-Market Partner LOIs → `14_04_`
- Task 5: Investor LOIs → `14_05_`
- Task 6: Research/Academic Partner LOI → `14_06_`
- Task 7: LOI Quality Assurance → `14_07_`
- Task 8: Relationship Management → `14_08_`

### Issue #15: Pitch Deck & Video
- Task 1: Research Successful EIC Pitch Decks → `15_01_`
- Task 2: Pitch Deck Structure & Content → `15_02_`
- Task 3: Visual Design & Assets → `15_03_`
- Task 4: Video Pitch Script & Storyboard → `15_04_`
- Task 5: Video Production → `15_05_`
- Task 6: Quality Assurance → `15_06_`
- Task 7: Supporting Materials → `15_07_`

### Issue #16: Legal Documents
- Task 1: Company Formation & Registration → `16_01_`
- Task 2: Ownership Control Declaration → `16_02_`
- Task 3: Supporting Documents → `16_03_`
- Task 4: Articles of Association & Governance → `16_04_`
- Task 5: Shareholders Agreement → `16_05_`
- Task 6: Intellectual Property Assignment → `16_06_`
- Task 7: Financial Statements & Audits → `16_07_`
- Task 8: Data Protection & GDPR Compliance → `16_08_`
- Task 9: Insurance & Liability → `16_09_`
- Task 10: Legal & Regulatory Compliance → `16_10_`
- Task 11: Legal Advisor Engagement → `16_11_`

### Issue #17: Final Assembly & Submission
- Task 1: Document Assembly Checklist → `17_01_`
- Task 2: Quality Assurance - Content Review → `17_02_`
- Task 3: Quality Assurance - Format & Technical → `17_03_`
- Task 4: AI Disclosure & Citations → `17_04_`
- Task 5: External Review & Feedback → `17_05_`
- Task 6: Final Revisions & Proofreading → `17_06_`
- Task 7: EU Portal Preparation → `17_07_`
- Task 8: Pre-Submission Checklist → `17_08_`
- Task 9: Submission Process → `17_09_`
- Task 10: Post-Submission → `17_10_`
- Task 11: Interview Preparation → `17_11_`

---

## 💡 Tips for Using This Prompt

1. **Copy the template** from the top
2. **Fill in the blanks**: Issue #, Task #, Task Name, Phase
3. **Paste into chat** to start the AI working
4. **AI will respond** with its research plan before proceeding
5. **Review and approve** the plan, or ask for adjustments
6. **AI proceeds** through the 5-phase workflow
7. **AI stops** if strategic decisions are needed
8. **You get** a comprehensive summary and all deliverables

---

## ⚠️ Remember

The AI will:
- ✅ Follow the structured 5-phase workflow
- ✅ Research deeply with multiple iterations
- ✅ STOP and ASK if strategy changes are suggested
- ✅ Document everything with proper naming
- ✅ Present findings before finalizing

You stay in control of:
- 🎯 Strategic decisions (what Senior AI is/should be)
- ✅ Approving research directions
- ✅ Providing feedback on drafts
- ✅ Final content approval
