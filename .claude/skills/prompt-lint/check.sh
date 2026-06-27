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
echo "## layer separation — components/ ⊥ demo · app/ ⊥ library · theme/(风格) ⊥ both"
# demo artifacts (page-only): hero banner, the Suspense Loader, the brand logo.
demo='[Hh]ero|[Ll]oader|[Ll]ogo'
# Base UI control names (PascalCase, case-sensitive so 'radial'/'::selection'/'transform' don't trip).
# theme/ is the 风格 root: it skins NOTHING by name — it owns palette/type/geometry/atmosphere/motion only.
ctrl='Button|Switch|ToggleGroup|Toggle|Checkbox|Radio|Select|Combobox|Autocomplete|Slider|NumberField|TextField|Fieldset|Progress|Meter|Tabs|Accordion|Collapsible|Tooltip|Popover|PreviewCard|Menubar|NavigationMenu|NavMenu|ContextMenu|Dialog|AlertDialog|Drawer|Toast|Avatar|Badge|Toolbar|ScrollArea|Panel|Separator|徽章|进度条'
lk=0
for f in $FILES; do
  case "$f" in
    */components/*) pat="演示|app\.md|App\.|外壳|侧栏|$demo"; why='components/ must not know the demo (no hero/loader/logo/shell/sidebar)';;
    */app/*)        pat='components\.md|components/'; why='app/ knows control NAMES + 风格 only, not the components/ layer';;
    prompt/theme/*) pat="components/|app/|components\.md|app\.md|演示页|$demo|$ctrl"; why='theme/ is the 风格 root — names no control and no demo part';;
    *)              pat=''; why='';;
  esac
  [ -n "$pat" ] || continue
  bad=$(grep -nE "$pat" "$f" 2>/dev/null || true)
  if [ -n "$bad" ]; then printf '  LEAK  %s — %s:\n' "$f" "$why"; printf '%s\n' "$bad" | sed 's/^/    /'; lk=1; fail=1; fi
done
[ "$lk" = 0 ] && echo "  -> clean"

echo
echo "## kit-motif coupling — kit-agnostic docs (components.md · app.md · playbook.md) name no one kit's shape"
# Each kit's motifs live in <domain>/theme/<kit>.md. High-signal words only — NOT generic
# geometry like 切角/圆角/网格, which components.md legitimately offers and delegates to theme.
motif='符印|法阵|触手|准星|齿轮|铆钉|表盘|仪表|蒸汽|阀门|滚花|摆针|三原形|虹膜|瞳孔|符文|魔典|石板|黄铜|琥珀|霓虹|rune|reticle|gear|rivet|gauge|steam|valve|sigil|tendril|knurl|neon|nova|abyss|brass|bauhaus|prism'
mk=0
for f in $FILES; do
  case "$f" in
    prompt/components/components.md|prompt/app/app.md|prompt/playbook.md) ;;
    *) continue ;;
  esac
  # high-signal motifs, plus '眼' as a shape-noun (但 肉眼/一眼/… 是成语，滤掉)
  bad=$( { grep -nE "$motif" "$f" 2>/dev/null; grep -nE '眼' "$f" 2>/dev/null | grep -vE '肉眼|一眼|眼前|眼下|转眼|眼花|眼看|显眼|抢眼|字眼'; } | sort -t: -k1,1n -u )
  if [ -n "$bad" ]; then printf '  LEAK  %s — kit-specific motif (belongs in <domain>/theme/<kit>):\n' "$f"; printf '%s\n' "$bad" | sed 's/^/    /'; mk=1; fail=1; fi
done
[ "$mk" = 0 ] && echo "  -> clean"

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
