#!/bin/sh
# kit-lint — mechanical token-contract checks for one kit.
# Usage: sh .claude/skills/kit-lint/check.sh <kit-id>   (any folder under src/kits/)
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

# 1. raw colors in component css (hex / rgba not var-wrapped; mask gradient stops allowed)
f=$(grep -rnE '(#[0-9a-fA-F]{3,8}\b|rgba?\([0-9])' "$C" --include='*.css' 2>/dev/null | grep -v 'var(' | grep -v 'mask' | grep -vE '#000\b')
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

# 5. raw motion — informational only (decorative one-off durations are reviewer's call)
f=$(grep -rnE '(transition|animation):[^;]*[0-9.]+m?s' "$C" --include='*.css' 2>/dev/null \
  | grep -v "var(--$KIT-dur" | grep -v "var(--$KIT-breath")
echo
echo "## raw durations in components (INFO — justify decorative one-offs, no fail)"
if [ -n "$f" ]; then echo "$f" | head -20; else echo "-> clean"; fi

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


# 10b. raw pixel sizes passed as .tsx props / inline styles (core.md: component size footprint must be a --<kit>- token)
#   .css is covered above; this catches sizes that bypass css via JSX — size={56}, maxHeight={200}, style={{ width: 120 }}, style={{ height: "48px" }}.
#   scope = size-footprint keys only (size/width/height/min-/max-), so semantic data props (value/min/max/step/length) and
#   Base UI anchor props (sideOffset/alignOffset/collisionPadding) are excluded by construction. tokens/%/dvh/vh/vw/em/clamp/calc/0 pass.
SZ='size|width|height|minWidth|maxWidth|minHeight|maxHeight|minBlockSize|maxBlockSize|minInlineSize|maxInlineSize|blockSize|inlineSize'
#   (a) numeric-literal size prop:  maxHeight={200}   size={56}   width={120}
a=$(grep -rnoE "\b($SZ)=\{-?[0-9]+(\.[0-9]+)?\}" "$ROOT" --include='*.tsx' 2>/dev/null)
#   (b) px-string size prop:  height={"48px"}   width={'120px'}
b=$(grep -rnoE "\b($SZ)=\{[\"'][0-9.]+px[\"']\}" "$ROOT" --include='*.tsx' 2>/dev/null)
#   (c) size key inside an inline style object:  style={{ maxHeight: 200 }}  { width: "120px" }  — allow 0, var(), %, dvh/vh/vw, em, clamp/calc
#   match consumes the whole value (incl. any unit) so the unit-based allowlist below can see it.
c=$(grep -rnoE "\b($SZ):[[:space:]]*[\"']?[0-9][0-9.]*(px|%|dvh|svh|lvh|vh|vw|em|rem|ch)?[\"']?" "$ROOT" --include='*.tsx' 2>/dev/null \
  | grep -vE ":[[:space:]]*[\"']?0[\"']?($|[^0-9.])" \
  | grep -vE "var\(|clamp|calc|[0-9](%|dvh|svh|lvh|vh|vw|em|rem|ch)([\"']|[[:space:]]|\}|$)")
f=$(printf '%s\n%s\n%s\n' "$a" "$b" "$c" | grep .)
run "raw pixel sizes in .tsx props / inline styles (route through a --$KIT- size token)" "$f"

# 10. repeated recipe across components (a rich filter/box-shadow/animation value in 2+ files = extract to a shared class/token)
f=$(find "$C" -name '*.css' | xargs awk '
  FNR==1 { file=FILENAME; sub(/.*\/components\//,"",file); sub(/\/[a-zA-Z0-9_.-]+$/,"",file) }
  { if (acc!="") acc=acc" "$0; else if ($0 ~ /^[[:space:]]*(filter|box-shadow|animation):/) acc=$0
    if (acc!="" && acc ~ /;/) { v=acc; sub(/;.*/,"",v); gsub(/^[[:space:]]+|[[:space:]]+$/,"",v); gsub(/[[:space:]]+/," ",v)
      if (v !~ /drop-shadow\(0 0 0 transparent\)/ && v ~ /(drop-shadow|breathe|, )/) print v "\t" file; acc="" } }'   | sort | awk -F'\t' '{ if($1==p){fs=fs", "$2;n++} else {if(n>1)print p"  ["n"x: "fs"]"; p=$1;fs=$2;n=1} } END{if(n>1)print p"  ["n"x: "fs"]"}')
run "repeated recipe across components (extract to shared class/token)" "$f"


echo
[ $FAIL -eq 0 ] && echo "RESULT: PASS (mechanical checks clean)" || echo "RESULT: FINDINGS — fix or justify each before accepting the kit"
exit $FAIL
