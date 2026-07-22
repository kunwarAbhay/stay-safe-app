---
name: skill-updater
description: Update and refine an existing skill file (such as rn-component-builder or gluestack-ui-v5) based on conversation history, user feedback, manual code edits, or bug fixes. Use this whenever the user asks to "update the skill based on recent mistakes", "refine the skill from conversation history", "audit skill against bugs", "learn from component building mistakes", "add guardrails/checklist to skill based on user edits", or "improve skill instructions from feedback".
---

# Skill Refiner & Updater

Refines and updates an existing `SKILL.md` file by extracting lessons, fixes, and anti-patterns from past conversation history, user corrections, and manual code edits.

## Workflow

### Step 1: Scan Conversation & Git Context
Scan the conversation history, user feedback, manual edits, and re-do requests to identify every instance where:
- A generated component/code had a bug, gap, or bad pattern pointed out by the user.
- The user manually edited generated code to fix an issue.
- The user asked to redo or correct part of an implementation after initial delivery.

For each instance, note:
1. **What was wrong**: The exact issue or oversight.
2. **Root cause gap**: Why the existing skill steps/checklist failed to catch or prevent it.
3. **The actual fix**: The correct implementation or rule that solves it.

---

### Step 2: Classify Each Distinct Issue
Deduplicate similar issues, then determine where each fix belongs within the target `SKILL.md`:
- **Checklist Item (Step 6 / Review Checklist)**: For concrete, pass/fail verifiable items (e.g. "loading state reserves layout space").
- **Guardrail**: For anti-patterns, prohibition rules ("don't do X"), or architectural constraints.
- **Existing Step Addition (Steps 1–5)**:
  - Prop API mistakes → Step 1 (API design)
  - Missing interactive states / styling issues / performance → Step 2 (Implementation)
  - Accessibility gaps → Step 3 (Accessibility)
  - Edge-case states (empty/loading/error) → Step 4 (States)
  - Testing/preview coverage → Step 5 (Testing & Previews)
- **New Step**: Only if the fix introduces a whole new phase in the lifecycle that doesn't fit existing steps.

---

### Step 3: Generalize & Formulate Rules
Transform specific bug descriptions into broad, generalizable engineering principles:
- **Bad (Too Specific)**: *"Card component didn't reserve space for the loading spinner and caused layout shift."*
- **Good (Generalized Principle)**: *"Loading states must reserve the same layout space as populated content to prevent layout shifts during state transitions."*

**Formatting Rules**:
- Match the tone and terseness of the existing `SKILL.md`.
- Keep checklist items to 1 concise line.
- Keep guardrails to 1 short paragraph maximum.

---

### Step 4: Filter Non-Generalizable Edge Cases
If an issue is a true one-off (e.g. a specific third-party library API quirk that won't recur), **exclude it** from the skill file to prevent instruction bloat. Document excluded items and reasons in the final report.

---

### Step 5: Edit Target Skill File
- Use `replace_file_content` or `multi_replace_file_content` to make surgical edits to the target `SKILL.md`.
- Do **NOT** rewrite or regenerate the file from scratch.
- Insert each addition in the exact logical section determined in Step 2.

---

### Step 6: Summary & Review
Present a clear summary report containing:
1. **Identified Issues**: Table or list of issues found, root cause gaps, and fixes.
2. **Skill Modifications**: List of added items, their target section, and rationale.
3. **Excluded Issues**: Any non-generalizable items excluded and why.
4. **Diff**: The explicit code/text diff of the updated `SKILL.md`.
