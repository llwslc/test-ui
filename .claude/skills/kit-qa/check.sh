#!/bin/sh
# kit-qa — run the whole kit gate suite in one pass, so the dynamic gates can't
# be skipped after a CSS change. Discovers every .claude/skills/kit-*/ gate with
# a runnable check (+ theme-doc-sync); does NOT hardcode the gate or kit list.
#   sh .claude/skills/kit-qa/check.sh [port]      (port default 5273)
# The dynamic gates (kit-visual/-interact/-anim-sync/…) drive the real page, so
# the dev server must be up on :port first. The port reaches every gate via
# GATE_PORT (positional args are gate-specific: several take [kit], not [port]).
PORT="${1:-5273}"
SKILLS=.claude/skills
export GATE_PORT="$PORT"

curl -s -o /dev/null "http://127.0.0.1:${PORT}/" 2>/dev/null \
  || { echo "kit-qa: dev server not reachable on :${PORT} — start it (npm run dev) first"; exit 2; }

KITS=$(ls -d src/kits/*/ 2>/dev/null | sed 's#src/kits/##; s#/##')   # derive, never hardcode
PER_KIT="kit-lint kit-distinct"    # gates that require a <kit-id> arg → loop kits
SKIP="kit-qa kit-states"           # kit-qa = this runner (never recurse); kit-states = manual capture

fail=0
run() {
  label="$1"; shift
  out=$("$@" 2>&1); code=$?
  res=$(printf '%s\n' "$out" | grep -hE "^RESULT:|GAPS|usage:" | tail -1)
  if [ "$code" -eq 0 ]; then
    printf '  PASS  %-22s %s\n' "$label" "$res"
  else
    printf '  FAIL  %-22s %s\n' "$label" "$res"
    printf '%s\n' "$out" | grep -hiE "FAIL|HIGH |GAP |finding|stray|overlap|dead |missing|off-panel|RESKIN" | head -8 | sed 's/^/          /'
    fail=1
  fi
}

echo "kit-qa @ :${PORT} — kits: $(echo $KITS | tr '\n' ' ')"
for d in "$SKILLS"/kit-*/; do
  g=$(basename "$d")
  case " $SKIP " in *" $g "*) continue ;; esac
  if [ -f "${d}check.cjs" ]; then bin="node ${d}check.cjs"
  elif [ -f "${d}check.sh" ]; then bin="sh ${d}check.sh"
  else continue
  fi
  case " $PER_KIT " in
    *" $g "*) for k in $KITS; do run "${g}:${k}" $bin "$k"; done ;;
    *) run "$g" $bin ;;
  esac
done
run theme-doc-sync node "${SKILLS}/theme-doc-sync/check.cjs"
run fingerprint node "${SKILLS}/kit-qa/fingerprint.cjs"

echo
if [ "$fail" -eq 0 ]; then
  echo "kit-qa: ALL PASS"
else
  echo "kit-qa: FAILURES above — fix or document each; render drift that is INTENDED gets a manual fingerprint.cjs --update after dynamic-gate signoff"
fi
exit $fail
