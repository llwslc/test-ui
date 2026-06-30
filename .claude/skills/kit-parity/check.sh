#!/bin/sh
# kit-parity — cross-kit FUNCTIONAL coverage diff.
#
# kit-lint (token hygiene), kit-distinct (anti-reskin) and kit-states (rendered
# states) all pass a kit that is simply MISSING a small functional/a11y rule its
# siblings have — e.g. `:empty` to collapse an empty dropdown block, ellipsis on
# a long value, or a styled scrollbar. Those gaps only surface when someone USES
# the kit. This gate flags them: a functional concern present in 2+ kits but
# absent from another is a likely parity gap.
#
# Scope is deliberately KIT-WIDE, not per-component-per-token. A state can be
# styled per-component OR via a shared theme recipe (nova/abyss inline it on each
# component; brass/bauhaus hoist `.<kit>-list-item[data-highlighted]` into
# theme/effects.css) — both valid, so a per-component token grep just flags the
# architecture, not a bug. Rendered interaction states (:hover/:focus-visible/
# [data-highlighted]/[data-selected]/:disabled/open) are therefore NOT checked
# here: kit-states and kit-interact RENDER and assert them. App-level resets
# (box-sizing, prefers-reduced-motion, scroll-behavior) live in src/shell and are
# shared by every kit, so they aren't per-kit concerns either.
#
# Usage: sh .claude/skills/kit-parity/check.sh            (audit every kit)
#        sh .claude/skills/kit-parity/check.sh <kit-id>   (only report that kit's gaps)
#
# Kits are discovered from src/kits/*/components (never hardcoded). Output is
# advisory — review each GAP; a kit may legitimately not need a rule, in which
# case it's a documented exception, not a fix. Exit 1 if any GAP is printed.

ONLY="$1"
KITS=$(for d in src/kits/*/components; do k=${d%/components}; echo "${k#src/kits/}"; done)
[ -z "$KITS" ] && { echo "no kits found under src/kits/*/components"; exit 2; }

FAIL=0

# ── kit-wide functional coverage ─────────────────────────────────────────────
# Functional/edge-case rules the dynamic gates don't exercise: collapse an empty
# block, ellipsis a long value, style the placeholder, style the scrollbar.
FUNCTIONAL_TOKENS=":empty text-overflow ::placeholder scrollbar-width"
echo "## kit-wide functional coverage"
for tok in $FUNCTIONAL_TOKENS; do
  haves=""; for k in $KITS; do grep -rqlF "$tok" "src/kits/$k/components" "src/kits/$k/theme" 2>/dev/null && haves="$haves $k"; done
  n=$(echo $haves | wc -w | tr -d ' ')
  [ "$n" -lt 2 ] && continue                       # not an established convention
  for k in $KITS; do
    case " $haves " in *" $k "*) ;; *)
      [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
      echo "GAP  $k missing '$tok' (present in:$haves)"; FAIL=1;;
    esac
  done
done
[ "$FAIL" = 0 ] && echo "-> clean"

# ── per-component responsive parity ──────────────────────────────────────────
# A component that adapts on mobile (@media max-width — OTP cells, Toast viewport,
# NavMenu scroll…) in 2+ kits but not another is a likely gap. This IS per
# component because mobile-adapt is a structural decision, not a shared recipe.
echo
echo "## per-component responsive parity"
RFAIL=0
COMPS=$(ls "src/kits/$(echo $KITS | awk '{print $1}')/components" 2>/dev/null)
for comp in $COMPS; do
  [ -d "src/kits/$(echo $KITS | awk '{print $1}')/components/$comp" ] || continue
  inall=1; for k in $KITS; do [ -d "src/kits/$k/components/$comp" ] || inall=0; done
  [ "$inall" = 1 ] || continue
  rhaves=""; for k in $KITS; do grep -rqlE "@media[^{]*max-width" "src/kits/$k/components/$comp" 2>/dev/null && rhaves="$rhaves $k"; done
  rn=$(echo $rhaves | wc -w | tr -d ' ')
  [ "$rn" -ge 2 ] || continue
  for k in $KITS; do
    case " $rhaves " in *" $k "*) ;; *)
      [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
      echo "GAP  $comp — $k missing responsive @media(max-width) (present in:$rhaves)"; RFAIL=1; FAIL=1;;
    esac
  done
done
[ "$RFAIL" = 0 ] && echo "-> clean"

echo
if [ "$FAIL" = 0 ]; then echo "RESULT: PASS (functional coverage at parity)"; exit 0
else echo "RESULT: GAPS FOUND — review each (fix, or document as an intentional exception)"; exit 1; fi
