# CLAUDE.md

Guidance for Claude Code when working in this repository. Keep this file
short and factual — delete any section that doesn't apply, fill in the rest.

## What this project is

<!-- One or two sentences: what it does, who it's for. -->

## Stack

<!-- e.g. Symfony 7 + Docker (FrankenPHP) + Postgres + Redis, or Next.js 15 + Prisma + Postgres -->

## Common commands

<!-- Keep this in sync with the Makefile / package.json scripts, don't duplicate logic here. -->

| Task | Command |
|---|---|
| Start the stack | `make start` |
| Run tests | `make test` |
| Lint / format | `make lint` |
| Release a new version | `npm run release` |

## Conventions

- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `build(recipe):`, …) — `.release-it.ts` + `auto-changelog` turn these into `CHANGELOG.md` entries automatically.
- Branch `main` is what `release-it` requires and pushes tags to; day-to-day work happens on `dev` (or feature branches), merged in via PR.
- <!-- coding style notes, folder layout rules, anything a generic linter can't catch -->

## Guardrails

- Never edit `.env*` files with real secrets in place — only `.env.example`.
- Don't run destructive DB commands (`doctrine:database:drop`, `prisma migrate reset`, etc.) against anything but the local/test environment.
- Ask before force-pushing, rewriting history, or touching CI/CD config.

# graphify
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.


### Attribution

**For PR descriptions**, include full attribution:

```
---
Generated with [Claude Code](https://claude.ai/code)
Co-Authored-By: Claude <model-name> <noreply@anthropic.com>
<XX>% AI / <YY>% Human
Claude: <what AI did>
Human: <what human did>
```

- Use the actual model name (e.g., `Claude Opus 4.5`, `Claude Sonnet 4`)
- The percentage split should honestly reflect the contribution balance for that specific work
- This provides a trackable record of AI-assisted development over time

**For issues and comments**, use simplified attribution:

```
---
Written by Claude <model-name> via [Claude Code](https://claude.ai/code)
```

**For commits**, include a Co-Authored-By trailer:

```
Co-Authored-By: Claude <claude@anthropic.com>
```

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
