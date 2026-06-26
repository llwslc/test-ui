#!/bin/sh
# kit-parity — cross-kit FUNCTIONAL coverage diff.
#
# kit-lint (token hygiene), kit-distinct (anti-reskin) and kit-states (rendered
# states) all pass a kit that is simply MISSING a small functional/a11y rule its
# siblings have — e.g. `:empty` to collapse an empty dropdown block, ellipsis on
# a long value, or a prefers-reduced-motion guard. Those gaps only surface when
# someone USES the kit. This gate flags them: a functional token present in 2+
# kits but absent in another is a likely parity gap.
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

# kit-wide presence of a literal token (components + theme)
has_theme() { grep -rqlF "$2" "src/kits/$1/theme" "src/kits/$1/global.css" 2>/dev/null; }
# component-context presence: the component's own dir OR the shared theme
has_comp()  { grep -rqlF "$3" "src/kits/$1/components/$2" 2>/dev/null || grep -rqlF "$3" "src/kits/$1/theme" 2>/dev/null; }

FAIL=0
report() { echo "GAP  $1"; FAIL=1; }

# ── theme / kit-wide functional + a11y concerns ──────────────────────────────
THEME_TOKENS="prefers-reduced-motion ::-webkit-scrollbar scrollbar-width"
echo "## theme-level functional/a11y parity"
for tok in $THEME_TOKENS; do
  haves=""; for k in $KITS; do has_theme "$k" "$tok" && haves="$haves $k"; done
  n=$(echo $haves | wc -w | tr -d ' ')
  [ "$n" -lt 2 ] && continue                      # not an established convention
  for k in $KITS; do
    case " $haves " in *" $k "*) ;; *)
      [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
      report "$k: missing '$tok' (present in:$haves)";;
    esac
  done
done
[ "$FAIL" = 0 ] && echo "-> clean"

# ── per-component functional selectors ───────────────────────────────────────
COMP_TOKENS=":empty text-overflow ::placeholder :focus-visible [data-highlighted] [data-disabled] [data-selected] :disabled"
echo
echo "## per-component functional-selector parity"
PFAIL=0
# components present in every kit
COMPS=$(ls "src/kits/$(echo $KITS | awk '{print $1}')/components" 2>/dev/null)
for comp in $COMPS; do
  [ -d "src/kits/$(echo $KITS | awk '{print $1}')/components/$comp" ] || continue
  inall=1; for k in $KITS; do [ -d "src/kits/$k/components/$comp" ] || inall=0; done
  [ "$inall" = 1 ] || continue
  for tok in $COMP_TOKENS; do
    haves=""; for k in $KITS; do has_comp "$k" "$comp" "$tok" && haves="$haves $k"; done
    n=$(echo $haves | wc -w | tr -d ' ')
    [ "$n" -lt 2 ] && continue
    for k in $KITS; do
      case " $haves " in *" $k "*) ;; *)
        [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
        echo "GAP  $comp — $k missing '$tok' (present in:$haves)"; PFAIL=1; FAIL=1;;
      esac
    done
  done
  # responsive @media(max-width) parity — the mobile adapt/shrink class (OTP cells,
  # Toast viewport, NavMenu scroll…). Trivial static check: a component that adapts
  # on mobile in 2+ kits but not another is a likely gap.
  rhaves=""; for k in $KITS; do grep -rqlE "@media[^{]*max-width" "src/kits/$k/components/$comp" 2>/dev/null && rhaves="$rhaves $k"; done
  rn=$(echo $rhaves | wc -w | tr -d ' ')
  if [ "$rn" -ge 2 ]; then
    for k in $KITS; do
      case " $rhaves " in *" $k "*) ;; *)
        [ -n "$ONLY" ] && [ "$ONLY" != "$k" ] && continue
        echo "GAP  $comp — $k missing responsive @media(max-width) (present in:$rhaves)"; PFAIL=1; FAIL=1;;
      esac
    done
  fi
done
[ "$PFAIL" = 0 ] && echo "-> clean"

echo
if [ "$FAIL" = 0 ]; then echo "RESULT: PASS (functional coverage at parity)"; exit 0
else echo "RESULT: GAPS FOUND — review each (fix, or document as an intentional exception)"; exit 1; fi
