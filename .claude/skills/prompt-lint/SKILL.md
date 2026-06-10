---
name: prompt-lint
description: Check that a generation-prompt or spec doc contains only "how to build it" — terse imperatives — with no rationale, history, tradeoffs, incident anecdotes, or framework restatement. Use after editing a spec/prompt, before committing prompt changes, or when asked to review how a spec is written. Works on a spec in any language (the check is a read, not a regex).
---

# prompt-lint — keep a spec to "how", not "why"

A generation prompt / spec is the text you feed an AI to build something. Every line must say what to build. It is NOT a changelog or an essay. This skill audits a spec against that rule.

## The rule
Each line is a terse imperative — the decision only. Allowed: what to do, what value to use, what to name, what NOT to do (stated as a rule). Cut anything that doesn't change what gets built.

## Flag these
- **Rationale** — "otherwise… / because… / to avoid…", or a parenthetical explaining WHY a rule exists.
- **History / tradeoff** — "was X, now Y", "originally / used to", "accepted / rejected", "folded back", version notes.
- **Incident anecdotes** — "this got re-broken", "the original bug", debugging war stories.
- **Framework restatement** — re-explaining the library / framework / language the model already knows (a prop's behavior, an API, what a CSS property does).
- **Hedging / meta** — "note that…", "for clarity…", uncertainty.

Keep (NOT violations): the rule itself, and a short parenthetical that **disambiguates the instruction** (e.g. "use `left/right:0`, not `100vw`") — that changes what's built. A parenthetical that **justifies** it does not — cut it.

## Procedure
1. **Read each spec file in full** (in this repo: `prompt/*.md`). This is the real check and it is **language-agnostic** — the model reads the prose in whatever language it's written. For every line ask: *does this change what the AI builds?* If no → flag it.
2. *(Optional first pass)* grep the loud English connectives to jump to suspects:
   `grep -rniE "otherwise|because|rejected|tradeoff|originally|used to|was .* now|note that" <spec-dir>`
   On a non-English spec this misses most — step 1's read is what catches them.
3. **Report** each hit as `file:line` — the offending text — and a one-line terse rewrite (or "delete"). Group by file. Don't auto-edit unless asked.

## Example
- BAD: `single breakpoint 768px (CSS @media can't take a token, so the kit uses only this one and must not add others); 769–900 is a bit cramped — accepted`
- GOOD: `single breakpoint 768px; no others`
- BAD: `no triangle (a semi-transparent border over a clip-path tears and misaligns)` → GOOD: `no triangle`
