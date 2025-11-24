# Appendix A: System Architecture

**For Technical Deep-Dive Questions**

---

## High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER INTERFACE LAYER                       │
│                                                                  │
│   Voice Input   │   Visual Display   │   Touch/Keyboard        │
│   (Speech-to-Text)  (Conversation Atlas)  (Accessibility)       │
│                                                                  │
│   Timeline View │ Key Points View │ Full Detail View            │
│   (Chronological)  (Essential Facts) (Complete History)         │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                   CONVERSATION ATLAS ENGINE                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Multi-Resolution View Generator                          │  │
│  │  • Timeline extraction (topic segmentation)               │  │
│  │  • Key Points extraction (decision + fact identification) │  │
│  │  │  Full Detail storage (complete turn-by-turn history)   │  │
│  │  • Time-decayed summarization (branch-aware)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  DAG State Management                                      │  │
│  │  • Conversation nodes (each turn = versioned state)        │  │
│  │  • Branch creation and tracking (lineage metadata)         │  │
│  │  • Branch return mechanism (merge policies, reconciliation)│  │
│  │  • Context retrieval (branch-aware filtering)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Context Memory Store                                      │  │
│  │  • Short-term memory (current session, ≥30 turns)          │  │
│  │  • Long-term memory (multi-day, user preferences)          │  │
│  │  • Retrieval-augmented generation (RAG) for past context   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                      SAFETY SENTINEL LAYER                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Elderly-Specific Risk Detection                           │  │
│  │  • Financial risk classifier (scams, fraud, large amounts) │  │
│  │  • Medication error detection (drug interactions, doses)   │  │
│  │  • Consent clarity validation (plain language check)       │  │
│  │  • Vulnerability scoring (user profile, task context)      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Progressive Confirmation Logic                            │  │
│  │  • Risk level assessment (low/medium/high)                 │  │
│  │  • Confirmation flow selection (adaptive to risk + user)   │  │
│  │  • Transparency enforcement (explain before execute)       │  │
│  │  • Human escalation triggers                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Audit & Monitoring                                        │  │
│  │  • Action logging (full trail for review)                  │  │
│  │  • Anomaly detection (unusual patterns)                    │  │
│  │  • Caregiver alerts (optional, privacy-preserving)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────┐
│               MULTI-DOMAIN ORCHESTRATION LAYER                   │
│                                                                  │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐  │
│  │  Banking     │  Healthcare  │  Transport   │ Government  │  │
│  │  (PSD2,      │  (FHIR/EHDS, │  (Mobility   │ (eIDAS 2.0, │  │
│  │   BankID)    │   e-Rx)      │   APIs)      │  Portals)   │  │
│  └──────────────┴──────────────┴──────────────┴─────────────┘  │
│                                                                  │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐  │
│  │ Communicate  │  Shopping    │  Media       │ Home Mgmt   │  │
│  │ (Phone, SMS, │  (Groceries, │  (News,      │ (Smart home,│  │
│  │  Email)      │   E-commerce)│   Music)     │  Services)  │  │
│  └──────────────┴──────────────┴──────────────┴─────────────┘  │
│                                                                  │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐  │
│  │  Utilities   │  Legal       │  Education   │ Finance Plan│  │
│  │  (Energy,    │  (Forms,     │  (Courses,   │ (Budgeting, │  │
│  │   Water)     │   Contracts) │   Tutorials) │  Planning)  │  │
│  └──────────────┴──────────────┴──────────────┴─────────────┘  │
│                                                                  │
│  ┌──────────────┬──────────────┐                                │
│  │ Social Svcs  │  Emergency   │ (+Future domains)              │
│  │ (Benefits,   │  (SOS,       │                                │
│  │  Support)    │   Alerts)    │                                │
│  └──────────────┴──────────────┘                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Orchestration Engine                                      │  │
│  │  • Task decomposition (multi-step planning)                │  │
│  │  • Cross-domain coordination (dependencies, sequences)     │  │
│  │  • Capability-scoped execution (tokens bound to context)   │  │
│  │  • Fallback mechanisms (offline, API failures)             │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────────┐
│              EU DATA SOVEREIGNTY & SECURITY LAYER                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GDPR-Compliant Data Handling                              │  │
│  │  • EU-only data residency (no transfers to US/Asia)        │  │
│  │  • Privacy by design & by default                           │  │
│  │  • Minimal data collection (purpose limitation)             │  │
│  │  • User data control (access, rectify, erase, port)        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Identity & Access Management                              │  │
│  │  • BankID integration (Sweden, Norway)                      │  │
│  │  • eIDAS 2.0 / EU Digital Identity Wallet                   │  │
│  │  • Federated identity (no single point of failure)          │  │
│  │  • Attribute-based access (minimal disclosure)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Security & Compliance (NIS2)                               │  │
│  │  • Encryption at rest and in transit (AES-256, TLS 1.3)    │  │
│  │  • Intrusion detection and prevention                       │  │
│  │  • Incident response plan (24h notification)                │  │
│  │  • Regular security audits and pen-testing                  │  │
│  │  • Backup and disaster recovery (multi-region EU)           │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Key Architectural Innovations

### 1. Conversation Atlas Engine
**What's Novel**:
- Real-time multi-resolution view generation (Timeline, Key Points, Full Detail)
- Time-decayed summarization with branch-awareness
- DAG state management with versioned memory
- Context retention ≥30 turns with deterministic retrieval

**Why It Matters**:
- Prevents cognitive overload
- Enables safe exploration via branching
- Maintains coherence across multi-day interactions

---

### 2. Safety Sentinel Layer
**What's Novel**:
- Population-specific risk detection (elderly vulnerability patterns)
- Adaptive confirmation logic (balances safety without patronizing)
- Capability-scoped agent execution (tokens bound to conversational context)
- Full auditability with caregiver alerts (opt-in)

**Why It Matters**:
- Safe execution in regulated domains (banking, healthcare)
- Compliance with AI Act risk management
- Trust-building through transparency

---

### 3. Multi-Domain Orchestration
**What's Novel**:
- Unified orchestration across 14+ life domains
- Cross-domain task chaining (e.g., appointment + transport + prescription)
- Standards-based integrations (BankID, FHIR, PSD2, eIDAS 2.0)
- Graceful degradation (offline modes, API fallbacks)

**Why It Matters**:
- Comprehensive value vs. narrow single-domain assistants
- Reduces context-switching burden on users
- EU-sovereign architecture (GDPR-first, no surveillance)

---

### 4. EU Data Sovereignty Layer
**What's Novel**:
- GDPR by design from ground up (not retrofit)
- EU-only data residency (multi-region for resilience, never leaves EU)
- Federated identity (eIDAS 2.0 integration)
- NIS2 compliance for critical services

**Why It Matters**:
- Competitive moat vs. US/Asian tech giants
- Alignment with EU Digital Decade priorities
- Trusted European alternative

---

## Data Flow Example: Prescription Refill

```
1. USER SPEAKS
   "I need to refill my diabetes medication"
   ↓
2. CONVERSATION ATLAS
   • Creates new conversation node in DAG
   • Updates Timeline view with "Prescription Refill" topic
   • Stores full utterance in Full Detail view
   • Retrieves past medication context from long-term memory
   ↓
3. SAFETY SENTINEL
   • Classifies task as MEDIUM risk (healthcare, medication)
   • Checks user profile (diabetes, known medications)
   • No red flags detected
   • Proceeds with standard confirmation flow
   ↓
4. ORCHESTRATION ENGINE
   • Identifies domains: Healthcare (FHIR), Banking (payment)
   • Retrieves user's preferred pharmacy from context
   • Calls FHIR API to check prescription status
   • Discovers active prescription approved by doctor
   ↓
5. SAFETY SENTINEL CONFIRMATION
   • Presents clear summary:
     "I found your Metformin prescription.
      Your doctor approved a refill last week.
      Shall I order it from Boots Pharmacy for pickup Wednesday?"
   • Waits for explicit user confirmation
   ↓
6. EXECUTION (After confirmation)
   • Uses BankID for secure authentication
   • Calls pharmacy API to place order
   • Confirms payment (if needed)
   • Schedules pickup reminder
   ↓
7. AUDIT & MEMORY
   • Logs action (prescription ordered, pharmacy, date)
   • Updates Conversation Atlas:
     - Timeline: "Prescription Refill Completed"
     - Key Points: "Metformin ordered, pickup Wednesday"
     - Full Detail: Complete dialogue
   • Stores in long-term memory for future reference
   ↓
8. USER FEEDBACK
   "Your prescription has been ordered.
    Pickup at Boots Pharmacy, Wednesday 2-5pm.
    I've added a reminder to your calendar."
```

---

## Technology Stack Summary

**Frontend**:
- React 18 + TypeScript
- Voice input: Web Speech API / native SDKs
- Visual display: Tailwind CSS, glass morphism design
- Accessibility: ARIA, keyboard navigation, screen reader support

**Backend**:
- Cloudflare Workers/Pages (EU regions)
- Hono framework (lightweight, fast)
- PostgreSQL (EU-hosted, encrypted at rest)
- Redis (caching, session management)

**AI/ML**:
- LLM: GPT-4o / Claude 3.5 Sonnet (via EU endpoints)
- Fine-tuning: Elderly-specific safety and conversation patterns
- Embedding models: For context retrieval (RAG)
- Model distillation: Planned for cost reduction and latency

**Integrations**:
- **Banking**: PSD2 APIs, BankID (Sweden/Norway)
- **Healthcare**: FHIR/HL7, national e-prescription systems
- **Identity**: eIDAS 2.0, EU Digital Identity Wallet
- **Transport**: Mobility APIs (local providers)
- **Government**: National digital service portals

**Security**:
- TLS 1.3 (all traffic encrypted)
- AES-256 (data at rest)
- OAuth 2.0 / OpenID Connect (authentication)
- Regular pen-testing and security audits

**Monitoring & Observability**:
- Prometheus + Grafana (metrics)
- Sentry (error tracking)
- Custom audit logs (compliance)

---

## Scalability & Performance

**Target Performance**:
- **Response time**: <2 seconds (90th percentile)
- **Uptime**: 99.9% (NIS2 requirement)
- **Concurrent users**: 100k+ (Year 3-5)
- **Context retention**: ≥30 turns, multi-day (no degradation)

**Scaling Strategy**:
- **Horizontal scaling**: Cloudflare edge workers (auto-scale)
- **Caching**: Redis for frequent queries, LLM response caching
- **Database**: Read replicas, connection pooling
- **Model optimization**: Distillation, quantization (Year 2+)

---

## Visual Elements
- **Architecture diagram**: As shown above (clean, layered, annotated)
- **Data flow diagram**: Prescription refill example with arrows and steps
- **Technology stack logos**: React, TypeScript, Cloudflare, PostgreSQL, Redis, etc.
- **Integration map**: Domains with API/standard labels
- **Security badges**: GDPR, AI Act, NIS2, ISO 27001, ISO/IEC 42001

---

## For Technical Evaluators

**Key Questions This Slide Answers**:
1. How does the Conversation Atlas actually work? (Multi-resolution views, DAG, memory)
2. How do you ensure safety for vulnerable users? (Safety Sentinel, risk detection, confirmations)
3. How do you orchestrate 14+ domains? (Orchestration engine, standards-based integrations)
4. How do you comply with EU regulations? (GDPR by design, EU data residency, eIDAS, NIS2)
5. Can this scale? (Cloudflare edge, caching, model optimization)
