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
- **Fixed-cardinality wording** — baking the current count/roster of variants into prose: "the two kits", "两 kit / 两套", naming the sibling to define a value ("比 NOVA 慢半拍"). A spec must read the same when an Nth variant is added. Say "each kit / 各 kit / across kits"; give each variant its values absolutely, never by comparison to another. Adding a variant should need a new `themes/<kit>.md` and zero edits to shared files.
- **Parenthesis overload** — prose where most lines carry a `(...)` aside reads like footnotes, not documentation. A parenthetical is fine for a bare value/example right after its term; it is NOT fine as the default container for clauses. Rough smell: more than ~1 in 3 lines parenthesized, or any line with ≥3. Re-flow asides into colons, em-dashes 「——」, comma clauses, or separate sentences.
  - **Full-width punctuation in CJK prose** (hard fail for a mixed system). Chinese prose uses 「，。、；：」 — never half-width `,;:` mixed in with full-width `。、`. Enumerations use 顿号 「、」, not a spaced ASCII slash ` / `. Punctuation INSIDE `backtick code spans` stays ASCII (it's code: `position:fixed; top/left/right:0`, `{ id, label }`, `clamp(28px, 4.4vw)`). `.` is left alone everywhere (decimals). Check: outside backticks, `grep -nP '[\x{4e00}-\x{9fff}][,;:]'` and ` / ` between Chinese words should be empty. Convert prose-only with a backtick-aware pass, never a blind sed.
  - **Section headings are bare titles** (hard fail). A `##`/`###` heading line carries the title only — no qualifier crammed on with `(...)`, `——`, `:`, or a comma clause. `grep -nE '^##+ .*(\(|——|:|,)' <spec>` must be empty (a `()` that is literal code in a backtick span is exempt). The qualifier goes on the next line as a real description sentence ending in 「。」, e.g. `## 8. 文案` then `用于填充 app.md 的文案槽位。` — NOT `## 8. 文案 —— 填 app.md 的槽位` (an em-dash fragment is not 人话). The H1 document title (`# `) may keep a `—— tagline`.

Keep (NOT violations): the rule itself, and a short parenthetical that **disambiguates the instruction** (e.g. "use `left/right:0`, not `100vw`") — that changes what's built. A parenthetical that **justifies** it does not — cut it.

## Placement (layered specs)
When the spec is split into shared/base files plus per-variant files (here: `core.md` + `app.md` shared, `themes/<kit>.md` per theme), each statement must live at the right layer:

- A rule that applies to **every variant** lives in a shared file — never repeated per variant.
- A variant file holds **only** that variant's values and skin decisions (filling slots the shared files leave open).
- **Flag**: a clause appearing (verbatim or near-verbatim) in two or more sibling variant files → move it up to the shared file.
- **Flag**: one variant's values (its palette, class names, copy) sitting in a shared file → move it down.
- Before adding a line to a variant file, ask: *would the sibling file need the same line?* If yes, it goes up.
- Mechanical assist — surface clauses shared by sibling files:
  `for f in <variant files>; do sed 's/[;,;、]/\n/g' "$f"; done | sed 's/^ *//' | sort | uniq -d`

## Procedure
1. **Read each spec file in full** (in this repo: `prompt/*.md`). This is the real check and it is **language-agnostic** — the model reads the prose in whatever language it's written. For every line ask: *does this change what the AI builds?* If no → flag it. *Is it at the right layer?* If not → flag it.
2. *(Optional first pass)* grep the loud English connectives to jump to suspects:
   `grep -rniE "otherwise|because|rejected|tradeoff|originally|used to|was .* now|note that" <spec-dir>`
   On a non-English spec this misses most — step 1's read is what catches them.
3. **Report** each hit as `file:line` — the offending text — and a one-line terse rewrite (or "delete"). Group by file. Don't auto-edit unless asked.

## Example
- BAD: `single breakpoint 768px (CSS @media can't take a token, so the kit uses only this one and must not add others); 769–900 is a bit cramped — accepted`
- GOOD: `single breakpoint 768px; no others`
- BAD: `no triangle (a semi-transparent border over a clip-path tears and misaligns)` → GOOD: `no triangle`
