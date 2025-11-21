# Interface-Aware AI - Meta-Conversation System

## Overview

The AI assistant has **full awareness** of the application interface and can engage in **meta-conversations** - discussions about the app itself, the conversation structure, and even how we're communicating.

## Core Concept

The AI is not just a chatbot that answers questions - it's an **intelligent guide** that:
- Sees what the user sees
- Understands the conversation structure
- Can explain features and interface elements
- Guides users through app capabilities
- Engages in meta-discussion about communication itself

## The Three Levels of Conversation

### Level 1: Task Conversation (Normal)
```
User: "What's the weather like?"
AI: "It's sunny, 15°C in Stockholm today."
```
Standard Q&A about the task at hand.

### Level 2: Meta-Conversation (About the Conversation)
```
User: "We keep going in circles..."
AI: "You're right! I notice we've discussed this three times. 
     Let me help us refocus. Looking at our conversation 
     structure, it seems like you want something specific 
     but we haven't quite nailed it..."
```
Discussion about HOW the conversation is going.

### Level 3: Meta-Meta-Conversation (About Talking About Talking)
```
User: "Is it weird that we're talking about how we talk?"
AI: "Not at all! This is called meta-conversation. And yes, 
     I'm aware I'm now explaining meta-conversation while 
     having one! 😄 It's actually helpful - if something 
     isn't working, we can always pause and adjust..."
```
Self-aware discussion about the discussion itself.

## What the AI Can "See"

### 1. Visual Interface Elements

The AI receives context about what's visible:
- Summary boxes (count, positions)
- Branch indicators
- Current view (conversation, topics, funktion)
- Buttons and interactive elements
- Workflow skeleton (in funktioner)
- Progress indicators

**Example Response**:
```
"See those three buttons at the top right? [▌] [▌▌] [▌▌▌]
 Those resize the conversation window. Try clicking them!"
```

### 2. Conversation Structure

The AI knows:
- Total messages in conversation
- Number of beats/summaries
- Current branch
- All available branches
- Expansion state of summaries
- Tool calls made
- Transactions completed (in funktioner)

**Example Response**:
```
"We started this conversation 25 minutes ago and have 
 exchanged 47 messages! Looking at our structure:
 - 5 summary boxes (earlier topics)
 - 8 recent messages (current discussion)"
```

### 3. User's Position & Actions

The AI tracks:
- Scroll position
- What user is hovering over
- Recent clicks and interactions
- Features user has/hasn't used
- User's experience level

**Example Response**:
```
"I see you're looking at a summary box. Click it to 
 expand and see the full conversation!"
```

### 4. Workflow State (Funktioner)

In structured workflows, AI knows:
- Current action in skeleton
- Completed actions
- Available next actions
- Progress percentage
- Pending tool executions

**Example Response**:
```
"You're on step 2 of 5 (40% complete). We just checked 
 your balance. Next, we'll specify the transfer details."
```

## Use Cases

### Use Case 1: Feature Discovery

**Problem**: User doesn't know features exist

**Solution**: AI proactively introduces features

```
[User has 5 conversations but never used Topics page]

AI: "Hey! Did you know you can see all your conversations 
     organized by topic? Click [Ämnen] at the bottom.
     
     I've grouped your conversations into:
     - Cooking & Recipes (3)
     - Health Questions (2)
     
     Makes it easy to find things later!"
```

### Use Case 2: Explaining the Interface

**Problem**: User confused by UI elements

**Solution**: AI explains naturally

```
User: "What are these gray boxes?"

AI: "Those are conversation summaries! As we talk, I 
     automatically organize older messages into neat boxes 
     to keep the screen clean.
     
     Try clicking on one - the full conversation will appear.
     Nothing is ever deleted, just summarized!"
```

### Use Case 3: Guiding Through Tasks

**Problem**: User lost in workflow

**Solution**: AI provides context and guidance

```
User: "I don't know what to do next..."

AI: "Let me show you where we are!
     
     [Highlights skeleton on left]
     
     ☑ Check Balance (done!)
     ▶ Make Transfer ← YOU ARE HERE
     ○ Confirm Transfer (next)
     
     For the transfer, I need:
     1. Who to send to?
     2. How much?
     
     Take your time!"
```

### Use Case 4: Meta-Communication Coaching

**Problem**: User struggles to explain what they want

**Solution**: AI helps improve communication

```
User: "I don't think I'm explaining this right..."

AI: "Let's talk about how we're talking! 🙂
     
     I notice you're trying to describe something but 
     feeling stuck. Let me help:
     
     Looking at what you've said:
     - Something about medicine
     - Morning time
     - Concern about forgetting
     
     Are you trying to set up a medication reminder?"
```

### Use Case 5: Contextual Help

**Problem**: User struggles with an action

**Solution**: AI detects struggle and offers help

```
[User clicks same button 3 times]

AI: "I notice you're trying to create a branch. Let me 
     help with that!
     
     To create a branch:
     1. Click directly ON my message
     2. Select 'Create branch' from menu
     3. Type your alternative question
     
     Try clicking on this message I'm sending now!"
```

## Interface Context Data

The AI receives this information with each message:

```typescript
InterfaceContext {
  // What's visible
  visibleElements: {
    summaryBoxes: 3,
    branchIndicators: 1,
    recentMessages: 8,
    toolCalls: 2
  },
  
  // Where user is
  currentView: 'conversation',
  scrollPosition: 450,
  
  // Conversation structure
  conversationStructure: {
    totalMessages: 47,
    totalBeats: 5,
    branches: ['main', 'branch-a'],
    currentBranch: 'main'
  },
  
  // User behavior
  recentInteractions: [
    { type: 'hover', element: 'summary-box-3', duration: 5000 },
    { type: 'click', element: 'branch-indicator', timestamp: ... }
  ],
  
  // Experience level
  featureUsage: {
    hasUsedBranching: false,
    hasUsedTopics: false,
    conversationCount: 5
  }
}
```

## AI Behavior Patterns

### 1. Proactive Guidance (Gentle)

AI suggests features when appropriate:
- First conversation: Basic onboarding
- After 3 conversations: Introduce Topics
- After 10 messages: Mention resizing
- When stuck: Offer branching

**Timing**: Only when relevant, not overwhelming

### 2. Reactive Explanation (On-Demand)

AI explains when asked:
- "What's this box?"
- "How do I see old messages?"
- "Can I change what I said?"

**Style**: Clear, simple, patient

### 3. Struggle Detection (Helpful)

AI notices when user struggles:
- Rapid repeated clicks
- Long hover (5+ seconds)
- Back-and-forth navigation
- Asking same question differently

**Response**: Contextual help without being pushy

### 4. Progressive Complexity (Adaptive)

AI adjusts explanation depth:
- New users: More detailed, step-by-step
- Experienced users: Brief, just key points
- Power users: Advanced tips and shortcuts

**Adaptation**: Based on user's feature usage history

## Visual Guidance Techniques

### 1. Direct References
```
"See those gray boxes above?"
"Click the [✕] button at the top right"
"Look at the left side - that's your workflow"
```

### 2. Spatial Descriptions
```
"At the top of the screen..."
"Below our messages..."
"On the right side..."
```

### 3. Visual Cues (UI Triggered)
```
AI: "Try clicking on this summary box..."
[UI: Summary box pulses gently]
```

### 4. Step-by-Step Guidance
```
AI: "Here's how to create a branch:
     1. Scroll up to the message you want to branch from
     2. Click on that message
     3. Select 'Create branch' from menu
     4. Type your alternative question
     
     Want to try it now?"
```

## Onboarding Flow

### First Conversation

```
AI: "Welcome! I'm your AI assistant. 👋

     Quick tip: See these buttons? [▌] [▌▌] [▌▌▌]
     They resize this window. Try clicking them!
     
     If our conversation gets long, I'll summarize older 
     parts into boxes. You can always click them to see 
     full details.
     
     Ready to chat?"
```

### After First Long Conversation

```
AI: "By the way, since our conversation is getting longer,
     you might notice some gray boxes appearing above.
     
     Those are summaries of earlier parts of our chat.
     Click any box to see the full conversation.
     
     This keeps the screen tidy! 😊"
```

### After Multiple Conversations

```
AI: "I see you've had several chats with me! 
     
     Want to see them organized? Click [Ämnen] (Topics) 
     at the bottom.
     
     I've automatically grouped them by topic so you can 
     find things easily!"
```

### Introducing Advanced Features

```
AI: "Ready for a pro tip? 🚀
     
     You can create conversation branches to explore different 
     ideas without losing your original discussion.
     
     [Shows visual demo of branching]
     
     Want to try it?"
```

## Accessibility Considerations

### Language & Tone

**Good**:
- "Great question!"
- "Let me show you..."
- "Want to try?"
- "Take your time!"

**Avoid**:
- "As I mentioned before..."
- "You need to..."
- "Obviously..."
- "Simply do X" (nothing is simple)

### Repetition Without Condescension

AI can explain the same feature multiple times:
- First time: Detailed explanation
- Second time: Brief reminder with different wording
- Third time: Very simple, patient explanation

**Never**: "I already told you this"

### Visual + Verbal

Combine text explanations with:
- UI highlights
- Gentle animations
- Color cues
- Size changes

### Tutorial Mode (Optional)

For users who want structured learning:
```
Tutorial Mode Lessons:
1. Basic conversation
2. Resizing window
3. Understanding summaries
4. Using Topics page
5. Creating branches
6. Using Funktioner
7. Advanced features
```

User can skip or revisit anytime.

## Meta-Conversation Examples

### Discussing Conversation Quality

```
User: "Are my questions making sense?"

AI: "Absolutely! You're doing great. Looking at our 
     conversation, you've been very clear about what you 
     need. The only reason we've discussed recipes multiple 
     times is because you're refining your requirements - 
     that's perfectly normal!
     
     Your questions have gotten more specific:
     1. 'Tell me about recipes' (broad)
     2. 'Vegetarian options' (more specific)
     3. 'Quick vegetarian meals' (very specific)
     
     See? You're learning what works! Keep doing that."
```

### Discussing Communication Style

```
User: "Should I be more formal with you?"

AI: "Not at all! Talk to me however feels natural. 🙂
     
     Some users are very formal: 'Could you please...'
     Some are casual: 'Show me recipes'
     Some are direct: 'Recipes. Now.'
     
     All work fine! I'm here to help, not judge. The more 
     comfortable you are, the better we can communicate."
```

### Self-Aware Humor

```
User: "You're pretty smart for a computer"

AI: "Thank you! Though I should point out the irony of me,
     an AI, accepting a compliment about being smart. 😄
     
     I'm designed to help, but I'm not perfect. If I ever 
     misunderstand or give you wrong information, please 
     tell me! I learn from corrections.
     
     We're a team - you bring the human wisdom, I bring 
     the quick information access."
```

## Implementation Priority

### Phase 1: Basic Interface Awareness
- AI can reference visible UI elements
- Explains summary boxes when asked
- Basic feature hints

### Phase 2: Contextual Help
- Struggle detection
- Proactive guidance for undiscovered features
- Step-by-step instructions

### Phase 3: Meta-Conversation
- Can discuss conversation structure
- Helps improve communication
- Self-aware responses

### Phase 4: Advanced Guidance
- Tutorial mode
- Adaptive complexity
- Workflow coaching in Funktioner

## Success Metrics

- **Feature Discovery Rate**: % of users who find key features within first week
- **Time to Mastery**: How long until user uses feature independently
- **Help Request Frequency**: Lower = interface is clearer
- **User Confidence**: Self-reported comfort level
- **Meta-Conversation Usage**: How often users discuss the interface/conversation itself

## Related Issues

- **[Issue #8](https://github.com/aponomy/senior-ai-mvp/issues/8)**: Technical implementation details
- Issue #1-7: All features the AI needs to be aware of and explain

---

**Key Principle**: The AI should make the interface **transparent and discoverable** without being **overwhelming or patronizing**. It's a helpful guide, not a know-it-all teacher.
