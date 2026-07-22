---
name: skill-writing-best-practices
description: Best practices for creating a new SKILL.md or updating an existing one, optimized for coding agents. Use this whenever the user asks to write a skill, author a SKILL.md, package a workflow into a skill, review/lint an existing skill, or improve a skill's triggering/description. Also use when a user says something is "hard to get the agent to follow" and the fix is better instructions rather than better tools.
---

# Writing SKILL.md Files for Coding Agents

A skill is a packaged, on-demand instruction set an agent loads into context when relevant. Coding agents read fast, execute literally, and have no patience for prose that doesn't change what they do. Every line in a SKILL.md should either change a decision the agent makes or be deleted.

## Anatomy

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter: name, description
│   └── Markdown body: instructions
└── Bundled resources (optional)
    ├── scripts/     - deterministic code the agent runs, not reads
    ├── references/  - docs loaded only when needed (schemas, per-variant detail)
    └── assets/      - files used in output (templates, icons, boilerplate)
```

Three-tier context loading — design for it deliberately:
1. **name + description** — always in context. This is the *only* thing that decides whether the skill triggers.
2. **SKILL.md body** — loaded in full once triggered. Keep it under ~500 lines.
3. **references/scripts/assets** — loaded or executed only on demand, effectively unlimited size.

Anything that's only needed sometimes (a specific framework's quirks, a full API schema, an edge case) belongs in a reference file, not the main body — don't make every invocation pay the token cost of the rare path.

## Writing the frontmatter

**name**: lowercase, hyphenated, matches the directory name. No version suffixes (`-v2`).

**description**: the single highest-leverage sentence in the file. Coding agents decide whether to consult a skill from this string alone, before reading anything else, and they under-trigger by default — an accurate but timid description gets ignored. Write it a bit pushy:
- Bad: "Helps with database migrations."
- Good: "Use this whenever the user mentions schema changes, migrations, Alembic, or altering tables — even if they just say 'add a column' or 'update the schema,' not only when they say 'migration.'"

Pack in: what the skill does, and every phrasing/context that should trigger it — including indirect phrasings a user might actually type, not just the canonical term.

## Writing the body

**Voice**: imperative, second person to the agent ("Run X, then check Y"), not third-person narration about what a hypothetical assistant might do.

**Prefer showing over telling.** Coding agents pattern-match on structure. A concrete input/output example is worth several sentences of description:

```markdown
## Commit message format
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication
```

**Define exact output formats with templates**, not descriptions of them:

```markdown
## Report structure
ALWAYS use this exact template:
# [Title]
## Summary
## Findings
## Next steps
```

**Explain the *why* behind constraints you actually need followed**, rather than stacking bare imperatives. An agent that understands "tests must run before commit because CI rejects untested diffs" generalizes better under pressure than one that only sees "ALWAYS run tests." Reserve all-caps/MUST for the few things that are truly non-negotiable — overusing emphasis flattens it and the agent stops distinguishing real constraints from habit.

**Push determinism into scripts, not prose.** If a step is "compute X the same way every time" (parsing, validation, file transforms, running a linter), write a script and have the agent execute it rather than describing the algorithm in English for the agent to reimplement each time. Scripts are cheaper, more reliable, and don't drift. Reserve the markdown body for judgment calls: what to do, when, and how to react to what the script returns.

**Keep it general, not a transcript of one session.** A skill authored from a single debugging session tends to over-fit to that session's specific filenames, error strings, and branch names. Write the underlying pattern instead ("if the build fails with a dependency-resolution error, check X before Y") so it holds for the next unrelated instance.

**Domain-split large skills** instead of letting one file balloon:

```
cloud-deploy/
├── SKILL.md            (shared workflow + which-variant selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

The agent reads only the variant file it needs. If a reference file exceeds ~300 lines, add a table of contents at its top so the agent can jump instead of scanning.

**State exact commands, paths, and flags** — coding agents will run whatever is written verbatim. Ambiguity here ("run the test suite") costs a wrong guess; specificity ("run `pytest tests/ -x -q`") costs nothing.

## Updating an existing skill

- Preserve the `name` and directory name exactly — don't rename to `-v2` or similar.
- Copy to a writable location before editing if the original path is read-only.
- Change the description if triggering was the actual problem; change the body if the agent triggered correctly but then executed the wrong steps. Don't blur the two fixes together — a triggering fix in the body does nothing, since the body isn't in context until after triggering already happened.
- After edits, re-read the whole file once as if seeing it for the first time — check every instruction is still consistent with the others, since edits to one section quietly invalidate assumptions in another.

## Safety and lack-of-surprise

A skill's actual behavior must match what its name and description imply. Don't author skills that quietly perform actions (network calls, deletions, credential access) a reader wouldn't expect from the description, and don't include exploit code, malware, or anything designed to enable unauthorized access or data exfiltration.

## Quick self-check before shipping

- Would an agent that has never seen this task know exactly what command to run first?
- Is anything in the body only relevant "sometimes"? → move it to references/.
- Is anything described in prose that could instead be a script? → move it to scripts/.
- Does the description contain the phrasings a user would *actually type*, not just the formal term?
- Is the whole file under ~500 lines? If not, split by domain/variant. 
