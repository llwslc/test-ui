#!/usr/bin/env python3
"""Unwrap hard-wrapped markdown prose — join each paragraph back to ONE line.

Surgical: the only edit is removing a newline inside a paragraph. Prettier would also
escape globs (*.ts -> \\*.ts) and swap emphasis markers, which is exactly the kind of
copy-breaking churn this convention exists to avoid.

    python3 .claude/skills/prompt-lint/unwrap.py <file.md> ...
"""
import pathlib
import re
import sys

FENCES = (chr(96) * 3, "~~~")
# CommonMark, not first-character guesswork: `#` heads a heading only when a space follows —
# a wrapped inline code span can leave a line starting `#101b16`, which is prose, not an h1.
HEADING = re.compile(r"#{1,6}(\s|$)")
BREAK = re.compile(r"(-{3,}|\*{3,}|_{3,}|={3,})\s*$")       # thematic break · setext underline
BULLET = re.compile(r"[-*+]\s")
ORDERED = re.compile(r"\d+[.)]\s")
LINKDEF = re.compile(r"\[[^\]]+\]:")


def stands_alone(s):
    """A structural line: emitted VERBATIM, and it may never seed a paragraph and swallow the
    line below it. A bullet is NOT one (its indented continuation belongs to it); a fence,
    heading, table row, blockquote or break is. Missing this is how a closing fence merged with
    the prose under it and silently un-terminated a code block.
    """
    return bool(
        s.startswith(FENCES) or s[0] in "|>" or HEADING.match(s) or BREAK.match(s)
    )


def opens_block(s):
    """True if s starts a NEW block — it cannot CONTINUE the previous paragraph. Adds the list
    forms to stands_alone: a bullet may follow a paragraph, but never joins it.
    """
    return bool(
        stands_alone(s) or BULLET.match(s) or ORDERED.match(s) or LINKDEF.match(s)
    )


def skeleton(text):
    """Every line that must survive an unwrap byte-for-byte: fences, fenced content, and each
    structural line. Paragraph prose is excluded — that is the only thing unwrap may rewrite.
    Comparing this before/after catches a merge that ate a structural line; a whitespace-only
    diff cannot, because eating a newline IS whitespace-only.
    """
    keep, fence = [], False
    for ln in text.splitlines():
        s = ln.strip()
        if s.startswith(FENCES):
            fence = not fence
            keep.append(ln)
        elif fence or (s and stands_alone(s)):
            keep.append(ln)
    return keep


def unwrap(text):
    lines = text.splitlines()
    end = len(lines)
    out, i = [], 0

    if lines and lines[0].strip() == "---":                 # YAML frontmatter, verbatim
        for j, ln in enumerate(lines[1:], 2):
            if ln.strip() == "---":
                out, i = lines[:j], j
                break

    fence = False
    while i < end:
        ln = lines[i]
        s = ln.strip()
        if s.startswith(FENCES):
            fence = not fence
            out.append(ln)
            i += 1
            continue
        if fence or not s or stands_alone(s):
            out.append(ln)
            i += 1
            continue

        para = [ln]                                          # gather the paragraph's lines
        i += 1
        while i < end:
            nxt = lines[i]
            nx = nxt.strip()
            if not nx or nx.startswith(FENCES) or opens_block(nx):
                break
            if para[-1].endswith(("  ", "\\")):              # explicit <br>, keep the break
                break
            para.append(nxt)
            i += 1
        out.append(" ".join([para[0].rstrip()] + [p.strip() for p in para[1:]]))

    return "\n".join(out) + ("\n" if text.endswith("\n") else "")


changed = 0
for arg in sys.argv[1:]:
    p = pathlib.Path(arg)
    src = p.read_text(encoding="utf-8")
    dst = unwrap(src)
    if dst == src:
        continue
    if re.sub(r"\s+", " ", src) != re.sub(r"\s+", " ", dst):
        sys.exit(f"ABORT {arg}: unwrap altered more than whitespace")
    if skeleton(src) != skeleton(dst):
        sys.exit(f"ABORT {arg}: unwrap altered the markdown skeleton (a fence/heading/table line)")
    p.write_text(dst, encoding="utf-8")
    print(f"  unwrapped  {arg}")
    changed += 1
print(f"{changed} file(s) rewritten" if changed else "nothing to unwrap")
