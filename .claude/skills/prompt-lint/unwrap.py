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
ORDERED = re.compile(r"\d+[.)]\s")
LINKDEF = re.compile(r"\[[^\]]+\]:")


def opens_block(s):
    """True if s starts a NEW markdown block — i.e. it cannot be a paragraph continuation.

    A lone backtick opens an inline code span, not a fence (fences are matched separately),
    and `*` only opens a bullet when a space follows — **bold** leads a line all the time.
    Treating either as a block leaves the paragraph split and the gate falsely green.
    """
    if s[0] in "#|><=":                                     # heading · table · quote · html · setext
        return True
    if s[:3] in ("---", "***", "___"):                      # thematic break
        return True
    if s[0] in "-*+" and len(s) > 1 and s[1] in " \t":      # bullet
        return True
    return bool(ORDERED.match(s) or LINKDEF.match(s))


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
        if fence or not s:
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
    p.write_text(dst, encoding="utf-8")
    print(f"  unwrapped  {arg}")
    changed += 1
print(f"{changed} file(s) rewritten" if changed else "nothing to unwrap")
