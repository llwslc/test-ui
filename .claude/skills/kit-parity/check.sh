#!/bin/sh
# kit-parity — cross-kit FUNCTIONAL coverage diff: a functional/a11y concern
# present in 2+ kits but absent from another is a likely gap. Scope is KIT-WIDE
# (a concern may live per-component or in a theme recipe — both valid); rendered
# interaction states belong to kit-states/kit-interact, shell resets to src/shell.
# See SKILL.md.
#   sh .claude/skills/kit-parity/check.sh [kit-id]   (kits derive from src/kits/*)
# Review each GAP — a kit may legitimately not need a rule. Exit 1 on any GAP.

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
      grep -q "^$comp:$k$" "$(dirname "$0")/responsive-exempt.txt" 2>/dev/null && continue
      echo "GAP  $comp — $k missing responsive @media(max-width) (present in:$rhaves)"; RFAIL=1; FAIL=1;;
    esac
  done
done
[ "$RFAIL" = 0 ] && echo "-> clean"

# ── derived per-part structural-reset parity (advisory) ──────────────────────
# The two sections above check a HAND-CURATED rule list — they only catch what a
# human already got burned by. This derives the rules: per shared PART selector,
# a structural reset all-but-one sibling declares but one omits (combobox/number-
# field `padding:0`). Advisory only (never flips exit) — each hit needs triage:
# live bug, latent inconsistency, or legit divergence (riot navmenu wraps where
# siblings scroll). See derive.cjs. Skipped if node is unavailable.
echo
echo "## derived per-part structural-reset parity (advisory)"
if command -v node >/dev/null 2>&1; then
  node "$(dirname "$0")/derive.cjs" "$ONLY"
else
  echo "-> skipped (node not found)"
fi

# ── Base UI live-region Empty must not be hidden (a11y) ───────────────────────
# Combobox/Autocomplete .Empty is an aria-live status region — Base UI's
# ComboboxEmpty docs say it MUST stay mounted+rendered; hiding the childless
# element with display:none/visibility:hidden breaks the "no results" screen-
# reader announcement. Collapse the dead band with `:empty { padding: 0 }`
# instead. (All 5 kits shipped display:none here until a user caught it.)
echo
echo "## Base UI aria-live Empty not hidden"
AH=0
for f in $(grep -rlE '(combobox|autocomplete)__empty:empty' src/kits/*/components/*/*.css 2>/dev/null); do
  [ -n "$ONLY" ] && [ "$ONLY" != "$(printf '%s' "$f" | sed -E 's#src/kits/([^/]+)/.*#\1#')" ] && continue
  if grep -A2 -E '(combobox|autocomplete)__empty:empty' "$f" | grep -qE 'display:[[:space:]]*none|visibility:[[:space:]]*hidden'; then
    echo "ANTIPATTERN ${f#src/kits/} hides the aria-live Empty (use padding:0, not display:none)"; AH=1; FAIL=1
  fi
done
[ "$AH" = 0 ] && echo "-> clean"

# ── NavigationMenu morph vars wired ──────────────────────────────────────────
# The dropdown morphs between triggers by consuming Base UI's size vars; a kit
# that doesn't wire them gets a collapse-and-reflow flash on every switch (brass
# AND riot both shipped this). Static presence check: positioner reads
# --positioner-*, popup reads --popup-*, viewport clips. The flash itself is a
# mid-transition artifact the dynamic gates can't reliably catch.
echo
echo "## NavigationMenu morph vars wired"
NM=0
for k in $KITS; do
  [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
  f="src/kits/$k/components/NavigationMenu/NavigationMenu.css"
  [ -f "$f" ] || continue
  grep -q 'navmenu__positioner' "$f" || continue
  miss=""
  awk '/navmenu__positioner[[:space:]]*\{/{f=1} f{print} f&&/}/{f=0}' "$f" | grep -q 'var(--positioner-' || miss="$miss positioner<-var(--positioner-*)"
  awk '/navmenu__popup[[:space:]]*\{/{f=1} f{print} f&&/}/{f=0}' "$f" | grep -q 'var(--popup-' || miss="$miss popup<-var(--popup-*)"
  awk '/navmenu__viewport[[:space:]]*\{/{f=1} f{print} f&&/}/{f=0}' "$f" | grep -qE 'overflow:[[:space:]]*hidden' || miss="$miss viewport-overflow:hidden"
  [ -n "$miss" ] && { echo "GAP $k navmenu not consuming morph:$miss"; NM=1; FAIL=1; }
done
[ "$NM" = 0 ] && echo "-> clean"

echo
if [ "$FAIL" = 0 ]; then echo "RESULT: PASS (functional coverage at parity; review any advisory gaps above)"; exit 0
else echo "RESULT: GAPS FOUND — review each (fix, or document as an intentional exception)"; exit 1; fi
