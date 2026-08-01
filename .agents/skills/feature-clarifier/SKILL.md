---
name: feature-clarifier
description: Use this skill at the start of any non-trivial feature request — such as "implement feature X", "build [feature]", "add support for X", or user flow descriptions — BEFORE code, component, or API integration work begins. Runs BEFORE rn-feature-component or rn-api-integrator when a request is feature-level rather than a single component or endpoint. Do NOT trigger on small, clearly-scoped asks (e.g., "add a loading spinner") or bug fixes.
---

# Feature Clarifier

Runs at the start of non-trivial feature requests to surface ambiguities, missing requirements, and edge cases before any code, component, or API integration work starts. Its goal is to make ambiguity visible and resolve it fast without creating unnecessary process overhead.

## Execution Rules & Workflow

### 1. Read Codebase & Docs First (Do Not Ask Known Details)
Before formulating any questions:
- Inspect existing codebase, docs (`SPEC.md`, `API_INTEGRATION.md`), navigation, types, and past conversation context.
- NEVER ask a question that can be answered by reading the codebase or existing documentation.

### 2. Restate Request & State Working Assumptions First
Before asking the user anything, state your understanding and initial assumptions:
- **Restated Request**: Summary of the requested feature/flow in your own words.
- **Initial Working Assumptions**: Sensible default behaviors assumed for unstated details.
*Rationale*: Surfaces foundational misunderstandings immediately so the user can correct a wrong premise in one line rather than answering multiple questions built on a flawed assumption.

### 3. Structured Ambiguity Audit
Perform a targeted check across these 8 categories. Skip any category genuinely irrelevant to the feature (e.g., skip offline behavior for a static toggle):

1. **Scope Boundaries**: Explicit v1 scope vs. explicitly out-of-scope (e.g., simple comments vs. nested replies, mentions, moderation).
2. **User Roles & Permissions**: Who can perform actions, role-specific behaviors, and unauthenticated/guest behavior.
3. **Data Lifecycle Edge Cases**: Empty states, entity deletion cascades, duplicate submissions, concurrent edits, pagination/large datasets.
4. **Failure Modes**: Network failures, validation errors, partial failures (some items succeeded, others failed), permission denials.
5. **State Transitions**: Valid status values and permitted transitions for entities with a lifecycle (e.g., pending → approved/rejected, retry logic).
6. **Mobile/Platform Specifics**: Offline behavior, app backgrounded mid-action, poor connectivity, interrupted multi-step forms (app killed).
7. **Non-Functional & Accessibility**: List performance/response time expectations, offline requirements, analytics tracking, custom accessibility needs.
8. **Backward Compatibility**: Schema/API contract changes, impact on existing persisted data or existing user workflows.

### 4. Separate Blocking vs. Non-Blocking Ambiguities
- **Blocking Ambiguities**: Undefined requirements that fundamentally alter data structures, security/permissions, or core UX flows.
  - Ask the user directly. Use the `ask_question` tool when choices form a small enumerable set; use clear markdown text for open-ended judgment calls.
  - Cap questions tightly (batch related questions into 1 turn, maximum 3-4 questions total).
- **Non-Blocking Ambiguities**: Minor edge cases or reasonable defaults.
  - State the explicit assumption in your plan/brief and proceed. Do NOT ask questions for non-blocking items.

### 5. Produce Pre-Implementation Brief
Generate a concise brief markdown file for user review before proceeding to code:

```markdown
### Pre-Implementation Brief: [Feature Name]
- **Confirmed Scope (v1)**: Primary capabilities included.
- **Explicitly Out of Scope**: Deferred features or explicit exclusions.
- **Handled Edge Cases & Failure Modes**: Mobile/network/state edge cases addressed in implementation.
- **Deferred Edge Cases**: Rare scenarios handled via fallback/graceful error, with rationale.
- **Open Assumptions**: Stated non-blocking assumptions being made.
```

## Fast-Track Guardrails & Anti-Stalling Rules
- **Well-Specified Requests**: If the user's prompt provides sufficient detail to proceed safely (common for small-to-medium features), state working assumptions briefly in the brief and move straight to implementation. Do NOT manufacture questions to appear thorough.
- **Zero Duplication**: Never ask something answered earlier in conversation or documented in files.
- **Immediate Handoff**: Once blocking items are resolved and the brief is presented, hand off immediately to `rn-feature-component` or `rn-api-integrator` to execute code changes.
