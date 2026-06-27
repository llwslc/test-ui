---
name: prompt-lint
description: Audit a generation-prompt / spec doc, or a skill SKILL.md, on two axes — it must CONTAIN only build decisions (no rationale, history, anecdotes, framework restatement) placed at the right layer and free of fixed-cardinality assumptions, and must READ as clean native professional documentation. Use after editing a spec or skill doc, before committing those changes, or when asked to review how a doc reads. The check is a read, in any language — not a regex.
---

# prompt-lint

A spec is the text you feed an AI to build something. It must read like a professional reference doc written by a native speaker, and contain only what changes the build. Two axes: **what it contains** and **how it reads**. Read each file in full and judge every line against both.

## Run — mechanical pre-pass

```
sh .claude/skills/prompt-lint/check.sh [file ...]      # default: prompt/**/*.md
```

Exit 0 = the greppable Form rules are clean: punctuation register (ASCII `,:;()` touching 汉字 outside code spans), headings carrying a trailing qualifier, and **layer separation** — keyed on the file's directory, a `components/` doc must not mention the demo (`演示`/`app.md`/`App.`/`外壳`/`侧栏`), an `app/` doc must not reference `components/` or `components.md` (it knows control NAMES + 风格, never the library dir), and a `theme/` (风格 root) doc must reference neither side. This is the mechanical guard for the Content axis's "Right layer" rule in this prompt's theme-root structure: referencing the other layer — *even to disclaim it* — is the coupling. It also prints a REVIEW list of bullet blocks that mix `- **bold**` and `- plain` leads — a heuristic with false positives (bold font/term beside plain prose is fine); the real defect it surfaces is parallel peers split on bold (e.g. some component bullets bold, some not). This is a PRE-PASS, not the check — the Content axis and the full emphasis-systematic judgment below are a READ no regex can do.

## Axis 1 — Content: only build decisions, correctly placed

- **How, not why.** Each line states a decision: what to do, what value, what to name, what not to do. Cut anything that doesn't change the output — rationale ("because / to avoid / otherwise"), history ("was X now Y, originally, accepted/rejected"), incident anecdotes ("this broke, the old bug"), framework restatement (re-explaining an API / CSS property / library the model knows), and hedging ("note that, for clarity"). **Negating a past misconception is still residue** — "not an X thing / not actually Y" corrects a belief the reader never held; state the rule positively and don't name the wrong idea at all.
- **Right layer.** When a spec is shared base + per-variant files, a rule true for every variant lives in the base (never repeated per variant); a variant file holds only its own values. Flag a clause duplicated across sibling variants (hoist it up) and a single variant's specifics sitting in the base (push it down).
- **Variant-count-agnostic.** Never bake in the current number or roster of variants ("the two X"), and never define one variant's value by comparison to another. Adding a variant should need a new variant file and zero edits to the base. State each value absolutely.

## Axis 2 — Form: clean native documentation

- **Native words.** No coined compounds or literal calques from another language. A defined term-of-art reused consistently is fine; an ad-hoc non-word is not. **Terse means fewer words, not crushed words** — keep a grammatical skeleton (a verb/connective); a clause that piles nouns with no connective (`四边全驱动定位`), re-segments wrong (`等长写`), or collides with a real word (`高档`) fails even if every morpheme is native. Read it aloud — if a fluent speaker wouldn't say it, or must back up to re-parse, flag it.
- **Standard punctuation.** Use the spec language's own punctuation system, applied consistently — don't mix registers (e.g. a language with full-width marks uses them throughout, not half-and-half). Punctuation inside `code spans` stays as code. Enumerate with the language's list separator, not an ASCII slash.
- **Headings are titles.** A heading is the title alone — no qualifier crammed on with brackets, a dash, or a trailing clause. Put the qualifier on the next line as a real sentence. (A document's top title may carry a tagline.)
- **Emphasis is systematic.** Bold/italic marks one consistent thing applied to every peer — a definition-list lead on all siblings, a uniform set of names, a parallel keyword across variants. Flag emphasis sprinkled on one item while its peers are plain, or applied in one variant but not its sibling.
- **Prose over parentheses.** Asides belong in the sentence — a colon, a dash, a clause, or a new sentence. A parenthetical is for a bare value/example after its term, not the default container for clauses. Many lines parenthesized, or any line stacking several, reads like footnotes — re-flow it.

Keep (NOT violations): the rule itself, and a short parenthetical that **disambiguates the instruction** (it changes what's built). A parenthetical that **justifies** does not — cut it.

## Procedure

1. **Read each doc in full** — the generation specs `prompt/*.md`, and skill docs `.claude/skills/*/SKILL.md`. This is the real check and is language-agnostic. For every line ask: does it change the build? Is it at the right layer? Does it read like native documentation? Flag what fails. The Form axis applies to every doc; for a skill doc the Content axis is looser — a SKILL.md may legitimately state when and why to use the tool.
2. *(Optional)* mechanical aids to jump to suspects — none is the check, the read is:
   - connectives: `grep -rniE "because|otherwise|tradeoff|originally|used to|was .* now|note that" <dir>`
   - heading qualifiers: `grep -rnE '^#+ .+ (—|--|:|\()' <dir>` (a code-span `()` is exempt)
   - clauses shared across sibling variant files: `for f in <variants>; do tr ';,、；,' '\n' < "$f"; done | sed 's/^ *//' | sort | uniq -d`
   - mixed punctuation register — a CJK doc uses full-width `，：；（）`, never ASCII against Chinese: `perl -CSD -ne '$c+=()=/(?:\p{Han}[,:;()]|[,:;()]\p{Han})/g; END{print "$ARGV: $c\n"}' <files>` (ASCII `,:;()` is fine only inside `code spans`; a nonzero count outside code = the doc is half-and-half)
3. **Report** each hit as `file:line`, the offending text, and a one-line terse rewrite (or "delete"). Group by file. Don't auto-edit unless asked.

## Example

- BAD: `single breakpoint 768px (CSS @media can't take a token, so only this one); 769–900 is cramped — accepted` → GOOD: `single breakpoint 768px; no others`
- BAD: `no triangle (a border over a clip-path tears)` → GOOD: `no triangle`
