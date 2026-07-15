#!/bin/sh
# prompt-lint parallel — dump the theme docs section-by-section with all kits adjacent,
# so a CROSS-KIT OUTLIER (a clause one kit explains that its siblings omit) jumps out.
# Pure reading aid: no pass/fail. The siblings are the control group — a bullet present
# in one kit and absent from the rest is a candidate for cruft (redundant restatement,
# shell-owned rule, a note the others prove unnecessary), UNLESS it's a real kit-unique
# motif. See SKILL.md "cross-kit outlier". Run after touching any prompt/theme/<kit>.md
# or prompt/components/theme/<kit>.md — the appendix reads skin-doc §2 per control.
#   sh .claude/skills/prompt-lint/parallel.sh
set -u
ROOT=$(cd "$(dirname "$0")/../../.." && pwd) || exit 2
cd "$ROOT" || exit 2

DOCS=$(find prompt/theme -maxdepth 1 -name '*.md' ! -name 'README.md' | sort)
[ -n "$DOCS" ] || { echo "no theme docs under prompt/theme/"; exit 0; }

SECS=$(grep -hoE '^## [0-9]+\.' $DOCS | grep -oE '[0-9]+' | sort -un)

for n in $SECS; do
  title=""
  for d in $DOCS; do
    title=$(grep -E "^## $n\. " "$d" | head -1)
    [ -n "$title" ] && break
  done
  printf '\n════════ %s ════════\n' "$title"
  for d in $DOCS; do
    printf -- '── %s ──\n' "$(basename "$d" .md)"
    awk -v n="$n" '
      $0 ~ "^## "n"\\." { inx=1; next }
      /^## [0-9]+\./ { inx=0 }
      inx && /^- / { print }
    ' "$d"
  done
done

echo
echo "READ each section across the kits: a bullet/clause one kit has and the others"
echo "omit is a cross-kit OUTLIER — cut it unless it's a genuine kit-unique motif."

printf '\n\n════════════ 控件皮 §2 · 跨 kit 逐控件对读（components/theme/*.md）════════════\n'
python3 - <<'PYEOF'
import pathlib, re
comp = pathlib.Path("prompt/components/components.md").read_text()
sec = comp.split("## 6. 组件")[1].split("## 6.1")[0]
canon, seen = [], set()
for m in re.finditer(r"[A-Z][A-Za-z/]+", sec):
    n = m.group(0)
    if n not in seen and n not in ("Base", "UI"):
        seen.add(n); canon.append(n)
docs = sorted(pathlib.Path("prompt/components/theme").glob("*.md"))
bodies = {}
for p in docs:
    parts = p.read_text().split("## 2. 组件皮肤决定", 1)
    bodies[p.stem] = parts[1] if len(parts) > 1 else ""
for ctrl in canon:
    names = [ctrl] + ([ctrl.split("/")[0]] if "/" in ctrl else [])
    print(f"\n──── {ctrl} ────")
    for kit, body in bodies.items():
        line = None
        for n in names:
            m = re.search(rf"^- {re.escape(n)}\b.*$", body, re.M)
            if m: line = m.group(0)[2:]; break
        print(f"  [{kit}] " + (line if line else "(无此行)"))
PYEOF
