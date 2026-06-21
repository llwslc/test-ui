#!/bin/sh
# prompt-lint — the MECHANICAL subset of the Form axis (SKILL.md is the full read).
# Run in place. Catches what a regex can; the content axis (rationale/layer/cryptic)
# and the full emphasis-systematic judgment stay a READ — see SKILL.md.
#   sh .claude/skills/prompt-lint/check.sh [file ...]      default: prompt/**/*.md
# Exit 0 = mechanical checks clean. The REVIEW block never fails (heuristic).
set -u
ROOT=$(cd "$(dirname "$0")/../../.." && pwd) || exit 2
cd "$ROOT" || exit 2
FILES="$*"
[ -n "$FILES" ] || FILES=$(find prompt -name '*.md' | sort)
fail=0

echo "## mixed punctuation register — ASCII ,:;() touching 汉字 outside code spans"
seen=0
for f in $FILES; do
  hits=$(perl -CSD -ne 's/`[^`]*`//g; print "  '"$f"':$.: $_" if /(?:\p{Han}[,:;()]|[,:;()]\p{Han})/' "$f")
  if [ -n "$hits" ]; then printf '%s\n' "$hits"; seen=1; fail=1; fi
done
[ "$seen" = 0 ] && echo "  -> clean"

echo
echo "## heading carrying a trailing qualifier (the title should stand alone)"
hits=$(grep -nE '^#{2,6} .+ (—|--|：|:|（|\()' $FILES 2>/dev/null || true)
if [ -n "$hits" ]; then printf '%s\n' "$hits" | sed 's/^/  /'; fail=1; else echo "  -> clean"; fi

echo
echo "## REVIEW — emphasis mix in a bullet block (heuristic, never fails; eyeball each)"
echo "   bold must mark ONE consistent thing per peer set; a block with both '- **' and"
echo "   '- plain' leads is a CANDIDATE — most are fine (bold font/term vs plain prose);"
echo "   the real bug is parallel peers split on bold (e.g. component bullets)."
for f in $FILES; do
  awk -v F="$f" '
    function flush(){ if(n>=2 && b>0 && p>0) printf "  %s:%d  %d bullets — %d bold-lead / %d plain-lead\n",F,start,n,b,p; n=0;b=0;p=0;start=0 }
    /^- /{ if(n==0) start=NR; n++; if($0 ~ /^- \*\*/) b++; else p++; next }
    !/^- /{ flush() }
    END{ flush() }
  ' "$f"
done

echo
if [ "$fail" = 0 ]; then echo "RESULT: PASS (mechanical clean — still do the SKILL.md read for content + emphasis)"; else echo "RESULT: FINDINGS — fix the mechanical hits above"; fi
exit $fail
