#!/bin/sh
# kit-lint — mechanical token-contract checks for one kit.
# Usage: sh .claude/skills/kit-lint/check.sh <kit-id>   (e.g. nova, abyss)
# Exit 0 = all mechanical checks clean; exit 1 = findings printed.

KIT="$1"
if [ -z "$KIT" ] || [ ! -d "src/kits/$KIT" ]; then
  echo "usage: check.sh <kit-id>   (must match src/kits/<kit-id>)"
  exit 2
fi
C="src/kits/$KIT/components"
T="src/kits/$KIT/theme/tokens.css"
ROOT="src/kits/$KIT"
FAIL=0

run() { # run <title> <findings>
  echo
  echo "## $1"
  if [ -n "$2" ]; then
    echo "$2" | head -60
    echo "-> $(echo "$2" | grep -c .) hit(s)"
    FAIL=1
  else
    echo "-> clean"
  fi
}

# 1. raw colors in component css (hex / rgba not var-wrapped)
f=$(grep -rnE '(#[0-9a-fA-F]{3,8}\b|rgba?\([0-9])' "$C" --include='*.css' 2>/dev/null | grep -v 'var(')
run "raw colors in components" "$f"

# 1b. raw color literals that duplicate an existing token value exactly
d=""
for lit in $(grep -rhoE 'rgba?\([0-9., ]+\)' "$C" --include='*.css' 2>/dev/null | grep -v var | sort -u | tr ' ' '_'); do
  l=$(echo "$lit" | tr '_' ' ')
  grep -qF "$l" "$T" && d="$d
  '$l' duplicates a tokens.css value"
done
run "raw colors that duplicate token values verbatim" "$(echo "$d" | grep .)"

# 2. raw type literals (px font-size / letter-spacing / line-height / numeric font-weight)
f=$(grep -rnE '(font-size|letter-spacing|line-height|font-weight):[[:space:]]*[0-9.]+(px|em)?;' "$C" --include='*.css' 2>/dev/null \
  | grep -vE 'var\(|clamp|calc|: 0;|: 1;|[0-9]em;')
run "raw type literals in components" "$f"

# 3. raw spacing off the ladder (padding/margin/gap px; values <=3px allowed)
f=$(grep -rnE '(padding|margin|gap):[^;]*[0-9]+px' "$C" --include='*.css' 2>/dev/null \
  | grep -v 'var(' \
  | awk '{ flag=0; s=$0; while (match(s, /[0-9]+px/)) { v=substr(s, RSTART, RLENGTH-2)+0; if (v>3) flag=1; s=substr(s, RSTART+RLENGTH) } if (flag) print }')
run "raw spacing in components" "$f"

# 4. raw shapes (polygon literals; radius px literals; 50% circles allowed)
f=$(grep -rnE '(polygon\(|(border-radius|frame-round):[[:space:]]*[0-9]+px)' "$C" --include='*.css' 2>/dev/null | grep -v 'var(')
run "raw shape values in components (need a named ladder)" "$f"

# 5. raw motion (durations not via dur/breath tokens; long decorative spins = reviewer's call)
f=$(grep -rnE '(transition|animation):[^;]*[0-9.]+m?s' "$C" --include='*.css' 2>/dev/null \
  | grep -v "var(--$KIT-dur" | grep -v "var(--$KIT-breath")
run "raw durations in components (decorative spins may pass review)" "$f"

# 6. raw z-index beyond local stacking
f=$(grep -rnE 'z-index:[[:space:]]*[0-9]{2,}' "$C" --include='*.css' 2>/dev/null | grep -v 'var(')
run "raw z-index in components" "$f"

# 7. dead tokens (defined, zero uses in the kit)
d=""
for t in $(grep -oE "^[[:space:]]*--$KIT-[a-z0-9-]+" "$T" | tr -d ' '); do
  grep -rq "var($t)" "$ROOT" --include='*.css' --include='*.tsx' || d="$d
  $t"
done
run "dead tokens" "$(echo "$d" | grep .)"

# 8. app-only tokens (consumed only by App/Loader, never by components/ or theme/)
d=""
for t in $(grep -oE "^[[:space:]]*--$KIT-[a-z0-9-]+" "$T" | tr -d ' '); do
  if ! grep -rq "var($t)" "$C" "$ROOT/theme" --include='*.css' 2>/dev/null; then
    grep -q "var($t)" "$ROOT/App.css" "$ROOT/App.tsx" "$ROOT/Loader.css" 2>/dev/null && d="$d
  $t"
  fi
done
run "app-only tokens (tokens serve components; inline app-only values in App.css)" "$(echo "$d" | grep .)"

# 9. alpha spread per accent family (judgment aid: alphas of one RGB should sit on few named steps)
echo
echo "## alpha spread per rgb family (components + tokens; review for clusters)"
{ grep -rhoE 'rgba\([0-9, ]+,[ 0-9.]+\)' "$C" --include='*.css' 2>/dev/null; grep -hoE 'rgba\([0-9, ]+,[ 0-9.]+\)' "$T"; } \
  | sed -E 's/rgba\(([0-9, ]+),([ 0-9.]+)\)/\1 ->\2/' | sort | awk -F' ->' '{a[$1]=a[$1]" "$2} END {for (k in a) print "  rgb("k"):"a[k]}' | sort

echo
[ $FAIL -eq 0 ] && echo "RESULT: PASS (mechanical checks clean)" || echo "RESULT: FINDINGS — fix or justify each before accepting the kit"
exit $FAIL
